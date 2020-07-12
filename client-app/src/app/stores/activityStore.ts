import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/IActivity';
import agent from '../api/agent';

import 'mobx-react-lite/batchingForReactDom'

configure({ enforceActions: 'always' });

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(a => {
                    a.date = a.date.split('.')[0];
                    this.activityRegistry.set(a.id, a);
                });
            });
        } catch (error) {
            console.log(error);
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
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
            });
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error); 
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
                    this.activity = activity;
                    this.loadingInitial = false;
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
}

export default createContext(new ActivityStore());
