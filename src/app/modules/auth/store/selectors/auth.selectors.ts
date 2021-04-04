import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { cast } from 'src/app/shared/utils/utils';
import { IAuthState } from '../reducers/auth.reducer';

export const selectAuthState = (state: AppState) => cast<{ auth: IAuthState }>(state).auth;

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);

export const currentAuthToken = createSelector(
  selectAuthState,
  auth => auth.token
);

export const isUserLoaded = createSelector(
  selectAuthState,
  auth => auth.isUserLoaded
);

export const currentUser = createSelector(
  selectAuthState,
  auth => auth.user
);
