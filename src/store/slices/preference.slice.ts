import { createSlice } from "@reduxjs/toolkit";

interface PreferenceState {
    lang: "vi" | "en";
}

const initialState: PreferenceState = {
    lang: "vi",
};

const preferenceSlice = createSlice({
    name: "preference",
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload;
        },
    },
});

export const preferenceActions = preferenceSlice.actions;
export default preferenceSlice.reducer;
