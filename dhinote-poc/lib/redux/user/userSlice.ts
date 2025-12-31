import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
}

interface UserDataState {
    profile: UserProfile | null;
    notes: any[];
}

const initialState: UserDataState = {
    profile: null,
    notes: [],
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<UserProfile | null>) {
            state.profile = action.payload;
        },
        setNotes(state, action: PayloadAction<any[]>) {
            state.notes = action.payload;
        },
    },
});

export const { setProfile, setNotes } = userDataSlice.actions;
export default userDataSlice.reducer;