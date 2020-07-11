import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/IActivity';
import agent from '../api/agent';

import 'mobx-react-lite/batchingForReactDom'

configure({ enforceActions: 'always' });

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable selectedActivity: IActivity | null = null;
    @observable editMode = false;
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
        this.selectedActivity = this.activityRegistry.get(id) || null;
        this.editMode = false;
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
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
                this.selectedActivity = activity;
                this.editMode = false;
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
                if (id === this.selectedActivity?.id) {
                    this.selectedActivity = null;
                    this.editMode = false;
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

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = null;
    }
    
    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action closeEditForm = () => {
        this.editMode = false;
    }
}

export default createContext(new ActivityStore());
