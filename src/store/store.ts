import { configureStore, combineReducers } from '@reduxjs/toolkit';
import preferenceSlice from '@/store/slices/preference.slice';

const appReducer = combineReducers({
    preference: preferenceSlice,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'RESET') {
        state = undefined;
    }
    return appReducer(state, action);
};

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];