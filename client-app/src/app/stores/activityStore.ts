import { observable, action, computed, runInAction } from 'mobx';
import { IActivity } from '../models/IActivity';
import agent from '../api/agent';

import 'mobx-react-lite/batchingForReactDom'
import { RootStore } from './rootStore';
import { setActivityProps, createAttendee } from '../common/utils';
import { toast } from 'react-toastify';

export default class ActivityStore {
    rootStore: RootStore;
    constructor (rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate(){
        return this.groupActivityesByDate(Array.from(this.activityRegistry.values()));
    }

    groupActivityesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        );
        
        return Object.entries(sortedActivities.reduce(
            (activities, activity) => {
                const date = activity.date.toISOString().split('T')[0];

                activities[date] = activities[date] ? 
                    [...activities[date], activity] :
                    [activity]

                return activities;
            }, 
            {} as {[key: string]: IActivity[]}
        ));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    setActivityProps(activity, this.rootStore.userStore.user);
                    this.activityRegistry.set(activity.id, activity);
                });
            });
        } catch (error) {
            return error;
        } finally{
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    @action selectActivity = (id: string | null) => {
        this.activity = this.activityRegistry.get(id) || null;
    }

    @action createActivity = async (activity: IActivity) => {
        const user = this.rootStore.userStore.user;
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            const attendee = createAttendee(user!);
            attendee.isHost = true;
            activity.isHost = true;
            activity.attendees = [attendee];
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
            });
        } catch (error) {
            return error;
        } finally {
            runInAction(() => {
                this.submitting = false;
            });
        }
    }
    
    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
            });
        } catch (error) {
            console.log(error.response);
            return error;
        } finally {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    @action deleteActivity = async (id: string) => {
        this.target = id;
        this.submitting = true;

        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if (id === this.activity?.id) {
                    this.activity = null;
                }
            });
        } catch (error) {
            console.log(error.response);
            return error;
        } finally {
            runInAction(() => {
                this.target = '';
                this.submitting = false;
            });
        }
    }

    @action loadActivity = async (id: string) => {
        let activity = this.activityRegistry.get(id);
        if (activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    setActivityProps(activity, this.rootStore.userStore.user);
                    this.activityRegistry.set(activity.id, activity);
                    this.activity = activity;
                })
            } catch (error) {
                console.log(error.response);
                return error;
            } finally {
                runInAction(() => {
                    this.loadingInitial = false;
                });
            }
        }
    }

    @action attendActivity = async () => {
        const user = this.rootStore.userStore.user;
        
        if (!user || !this.activity) return;
        
        const attendee = createAttendee(user);
        this.submitting = true;
        try {
            await agent.Activities.attend(this.activity.id);

            runInAction(() => {        
                if (!this.activity) return;
                
                this.activity.attendees = this.activity.attendees.concat(attendee);
                this.activity.isGoing = true;
                this.activityRegistry.set(this.activity.id, this.activity);
            })
        } catch (error) {
            toast.error('Problem signing up to activity');
        } finally {
            runInAction(() => {
                this.submitting = false;
            });
        }
    }

    @action cancelAttendance = async () => {
        const user = this.rootStore.userStore.user;
        
        if (!user || !this.activity) return;

        this.submitting = true;
        try {
            await agent.Activities.unattend(this.activity.id);
            runInAction(() => {
                if (!this.activity) return;
                    
                this.activity.attendees = this.activity.attendees.filter(
                    attendee => attendee.username !== user.username
                );
                this.activity.isGoing = false;
                this.activityRegistry.set(this.activity.id, this.activity);
            })
        } catch (error) {
            toast.error('Problem cancelling attendance')
        } finally {
            runInAction(() => {
                this.submitting = false;
            });
        }
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
}
