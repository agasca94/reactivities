import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/IUser";
import agent from "../api/agent";
import { RootStore } from "./rootStore";

export default class UserStore {
    rootStore: RootStore;
    constructor (rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user;
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    @action register = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    @action logout = () => {
        this.rootStore.commonStore.removeToken();
        this.user = null;
    }

    @action getUser = async () => {
        try {
            const user = await agent.User.currentUser();
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.log(error);
        }
    }
}
