import { create } from "zustand";

type InitialState = {
    isAuth: Boolean;
};

type Actions = {
    toggleAuth: (isAuth: Boolean) => void;
};

const initialState: InitialState = {
    isAuth: false,
}

export const useStoreAuth = create<InitialState & Actions>((set) => ({
    ...initialState,
    toggleAuth(isAuth: Boolean) {
        set((state) => {
            return {
                isAuth
            }
        });
    }
}));