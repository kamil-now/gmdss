import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { cast } from 'src/app/shared/utils/utils';
import { QuestionSet } from '../models/question-set';
import { Quiz } from '../models/quiz';
import { QuizActions } from './quiz.actions';

export const QUIZ_FEATURE_KEY = 'quiz';
export interface IQuizState extends EntityState<Quiz> {
  selectedQuiz?: Quiz;
  selectedSet?: QuestionSet;
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
      selectedQuiz: action.quiz,
    };
  }),
  on(QuizActions.selectQuestionSet, (state, action) => {
    return {
      ...state,
      selectedSet: action.set,
    };
  }),
  on(QuizActions.clearQuizData, (state, action) => {
    return {
      ...state,
      selectedQuiz: undefined
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
