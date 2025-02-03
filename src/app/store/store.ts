import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { eventSlice } from '../features/events/eventSlice'
import { authSlice } from '../features/auth/authSlice';
import  modalReducer  from '../modals/modalSlice';
import  userReducer from '../features/users/UserSlice';

export const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
    auth: authSlice.reducer,
    modals: modalReducer,
    profiles: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()