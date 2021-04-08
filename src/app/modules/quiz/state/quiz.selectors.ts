import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IQuizState, quizSelectors, QUIZ_FEATURE_KEY } from './quiz.reducer';

export class QuizSelectors {

  static state = createFeatureSelector<IQuizState>(QUIZ_FEATURE_KEY);

  static selectAllQuizes = createSelector(
    QuizSelectors.state,
    quizSelectors.selectAll
  );

  static listSelected = createSelector(
    QuizSelectors.state,
    state => state.selected
  );
}
