import { IUser } from "@/module/user";
import { create } from "zustand";

type InitialState = {
    isAuth: Boolean;
    user: IUser | undefined;
    tokens: any;
};

type Actions = {
    toggleAuth: (isAuth: Boolean) => void;
    setUser: (user: IUser | undefined) => void;
};

const initialState: InitialState = {
    isAuth: false,
    user: { username: "", name: "", firstname: "", email: "", accessToken: "", refreshToken: "", token: "", isAdmin: false },
    tokens: {}
}

export const useStoreAuth = create<InitialState & Actions>((set) => ({
    ...initialState,
    toggleAuth(isAuth: Boolean) {
        set((state) => {
            state.isAuth = isAuth;
            if(!isAuth) {
                state.setUser(undefined);
            }
            return {
                isAuth
            };
        });
    },
    setUser(user) {
        set((state) => {
            const newState = state;
            state.user = user;
            return newState;
        });
    },
}));