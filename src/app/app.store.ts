import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { authReducer, AUTH_FEATURE_KEY, IAuthState } from './modules/auth/store/reducers/auth.reducer';
import { IQuizState, quizReducer, QUIZ_FEATURE_KEY } from './modules/quiz/state/quiz.reducer';
import { cast } from './shared/utils/utils';

export type AppState = {
  [AUTH_FEATURE_KEY]: IAuthState,
  [QUIZ_FEATURE_KEY]: IQuizState
}

export const reducers: ActionReducerMap<AppState> = {
  [AUTH_FEATURE_KEY]: cast<ActionReducer<IAuthState>>(authReducer),
  [QUIZ_FEATURE_KEY]: cast<ActionReducer<IQuizState>>(quizReducer)
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [debug]
  : [];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}