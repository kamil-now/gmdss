import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { cast } from 'src/app/shared/utils/utils';
import { Quiz } from '../models/quiz';
import { QuizActions } from './quiz.actions';

export const QUIZ_FEATURE_KEY = 'quiz';
export interface IQuizState extends EntityState<Quiz> {
  selected?: Quiz;
  error: any;
}

export const adapter: EntityAdapter<Quiz> = createEntityAdapter<Quiz>({
  selectId: (model: Quiz) => cast<string>(model._id)
});

export const initialState: IQuizState = adapter.getInitialState({
  error: null,
});

export const quizReducer = createReducer(
  initialState,
  on(QuizActions.selectQuiz, (state, action) => {
    return {
      ...state,
      selected: action.quiz,
    };
  }),
  on(QuizActions.clearSelectedQuiz, (state, action) => {
    return {
      ...state,
      selected: undefined
    };
  }),

  on(QuizActions.loadQuizListSuccess, (state, action) => adapter.setAll(action.list, state)),
  on(QuizActions.createQuizSuccess, (state, action) => adapter.addOne(action.quiz, state)),
  on(QuizActions.updateQuizSuccess, (state, action) => adapter.updateOne(action.quiz, state)),
  on(QuizActions.deleteQuizSuccess, (state, action) => adapter.removeOne(action.id, state)),
  on(
    QuizActions.createQuizFailure,
    QuizActions.updateQuizFailure,
    QuizActions.deleteQuizFailure,
    QuizActions.loadQuizListFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);

export const quizSelectors = adapter.getSelectors();
