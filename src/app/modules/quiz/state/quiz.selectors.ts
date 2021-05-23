import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IQuizState, quizSelectors, QUIZ_FEATURE_KEY } from './quiz.reducer';

export class QuizSelectors {

  static state = createFeatureSelector<IQuizState>(QUIZ_FEATURE_KEY);

  static selectAllQuizes = createSelector(
    QuizSelectors.state,
    quizSelectors.selectAll
  );

  static quizSelected = createSelector(
    QuizSelectors.state,
    state => state.quizListSelected
  );

  static quizTestQuestions = createSelector(
    QuizSelectors.state,
    state => state.quizTestQuestions
  );

  static quizEditing = createSelector(
    QuizSelectors.state,
    state => state.editingQuiz
  );
}
