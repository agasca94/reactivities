import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile, IPhoto } from "../models/IProfile";
import agent from "../api/agent";

export default class ProfileStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile = false;
    @observable loadingPhoto = false;

    @computed get isCurrentUser() {
        const user = this.rootStore.userStore.user;
        if (user && this.profile) {
            return user.username === this.profile.username;
        }
        return false;
    }

    @action loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
            });
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => {
                this.loadingProfile = false;
            });
        }
    }

    @action uploadPhoto = async (file: Blob) => {
        this.loadingPhoto = true;
        try {
            const photo = await agent.Profiles.uploadPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile?.photos.concat(photo);

                    if (this.rootStore.userStore.user && photo.isMain) {
                        this.rootStore.userStore.user.image = photo.url;
                        this.profile.image = photo.url;
                    }
                }

            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loadingPhoto = false;
            });
        }
    }

    @action setMainPhoto = async (photo: IPhoto) => {
        this.loadingPhoto = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.image = photo.url;
                    this.profile.photos = this.profile.photos.map(p => 
                        p.id === photo.id 
                        ? {...p, isMain: true}
                        : {...p, isMain: false}
                    );

                    if (this.rootStore.userStore.user) {
                        this.rootStore.userStore.user.image = photo.url;
                    }
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loadingPhoto = false;
            });
        }
    }

    @action deletePhoto = async (photo: IPhoto) => {
        this.loadingPhoto = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos.filter(
                        p => p.id !== photo.id
                    );
                }
            });
        } catch (error) {
            
        } runInAction(() => {
            this.loadingPhoto = false;
        });
    }
}
