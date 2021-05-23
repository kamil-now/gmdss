import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { cast } from 'src/app/shared/utils/utils';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';
import { QuizActions } from './quiz.actions';

export const QUIZ_FEATURE_KEY = 'quiz';
export interface IQuizState extends EntityState<Quiz> {
  quizListSelected?: Quiz[];
  editingQuiz?: Quiz;
  quizTestQuestions?: Question[];
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
      quizListSelected: state.quizListSelected ? [...state.quizListSelected, action.quiz] : [action.quiz]
    };
  }),
  on(QuizActions.unselectQuiz, (state, action) => {
    return {
      ...state,
      quizListSelected: state.quizListSelected ? [...state.quizListSelected.filter(x => x !== action.quiz)] : [],
    };
  }),
  on(QuizActions.editQuiz, (state, action) => {
    return {
      ...state,
      editingQuiz: action.quiz
    };
  }),
  on(QuizActions.clearQuizData, (state, action) => {
    return {
      ...state,
      quizListSelected: undefined
    };
  }),
  on(QuizActions.loadQuizTestQuestions, (state, action) => {
    return {
      ...state,
      quizTestQuestions: action.questions
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
