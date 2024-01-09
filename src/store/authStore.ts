import { create } from "zustand";

type InitialState = {
    isAuth: Boolean;
    user: any;
    tokens: any;
};

type Actions = {
    toggleAuth: (isAuth: Boolean) => void;
    setUser: (user: any) => void;
};

const initialState: InitialState = {
    isAuth: false,
    user: {},
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