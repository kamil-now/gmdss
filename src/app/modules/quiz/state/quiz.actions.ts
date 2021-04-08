import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Quiz } from '../models/quiz';

// TODO loading actions & list pagination

export enum QuizActionTypes {
  SelectQuiz = '[Quiz List Component] Select Quiz',
  ClearSelectedQuiz = '[Quiz Details Component] Clear Selected Quiz',
  LoadQuizList = '[Quiz List Component] Load Quiz List',
  LoadQuizListSuccess = '[Quiz Effect] Load Quiz List Success',
  LoadQuizListFailure = '[Quiz Effect] Load Quiz List Failure',
  CreateQuiz = '[Quiz Details Component] Create Quiz',
  CreateQuizSuccess = '[Quiz Effect] Create Quiz Success',
  CreateQuizFailure = '[Quiz Effect] Create Quiz Failure',
  UpdateQuiz = '[Quiz Details Component] Update Quiz',
  UpdateQuizSuccess = '[Quiz Effect] Update Quiz Success',
  UpdateQuizFailure = '[Quiz Effect] Update Quiz Failure',
  DeleteQuiz = '[Quiz Details Component] Delete Quiz',
  DeleteQuizSuccess = '[Quiz Effect] Delete Quiz Success',
  DeleteQuizFailure = '[Quiz Effect] Delete Quiz Failure'
}

export class QuizActions {
  static selectQuiz = createAction(QuizActionTypes.SelectQuiz, props<{ quiz: Quiz }>());
  static clearSelectedQuiz = createAction(QuizActionTypes.ClearSelectedQuiz);
  static loadQuizList = createAction(QuizActionTypes.LoadQuizList);
  static loadQuizListSuccess = createAction(QuizActionTypes.LoadQuizListSuccess, props<{ list: Quiz[] }>());
  static loadQuizListFailure = createAction(QuizActionTypes.LoadQuizListFailure, props<{ error: any }>());
  static createQuiz = createAction(QuizActionTypes.CreateQuiz, props<{ quiz: Quiz }>());
  static createQuizSuccess = createAction(QuizActionTypes.CreateQuizSuccess, props<{ quiz: Quiz }>());
  static createQuizFailure = createAction(QuizActionTypes.CreateQuizFailure, props<{ error: any }>());
  static updateQuiz = createAction(QuizActionTypes.UpdateQuiz, props<{ quiz: Quiz, changes: Partial<Quiz> }>());
  static updateQuizSuccess = createAction(QuizActionTypes.UpdateQuizSuccess, props<{ quiz: Update<Quiz> }>());
  static updateQuizFailure = createAction(QuizActionTypes.UpdateQuizFailure, props<{ error: any }>());
  static deleteQuiz = createAction(QuizActionTypes.DeleteQuiz, props<{ id: string }>());
  static deleteQuizSuccess = createAction(QuizActionTypes.DeleteQuizSuccess, props<{ id: string }>());
  static deleteQuizFailure = createAction(QuizActionTypes.DeleteQuizFailure, props<{ error: any }>());
}
