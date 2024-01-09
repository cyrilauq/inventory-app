import { User } from "@/module/user";
import { create } from "zustand";

type InitialState = {
    isAuth: Boolean;
    user: User;
    tokens: any;
};

type Actions = {
    toggleAuth: (isAuth: Boolean) => void;
    setUser: (user: User) => void;
};

const initialState: InitialState = {
    isAuth: false,
    user: new User({ username: "", name: "", firstname: "", email: "", accessToken: "", refreshToken: "", token: "" }),
    tokens: {}
}

export const useStoreAuth = create<InitialState & Actions>((set) => ({
    ...initialState,
    toggleAuth(isAuth: Boolean) {
        set((state) => {
            return {
                isAuth
            }
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