import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { Quiz } from '../../models/quiz';
import { QuizActions } from '../../state/quiz.actions';
import { QuizSelectors } from '../../state/quiz.selectors';
@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent {

  quizList$ = this._store.pipe(select(QuizSelectors.selectAllQuizes));

  constructor(
    private readonly _store: Store<AppState>
  ) {
    this._store.dispatch(QuizActions.loadQuizList());
  }

  selectQuiz(quiz: Quiz, selected: boolean): void {
    this._store.dispatch(selected ? QuizActions.selectQuiz({ quiz }) : QuizActions.unselectQuiz({ quiz }));
  }

  editQuiz(quiz: Quiz): void {
    this._store.dispatch(QuizActions.editQuiz({ quiz }));
  }

  deleteQuiz(quiz: Quiz): void {
    if (quiz._id) {
      this._store.dispatch(QuizActions.deleteQuiz({ id: quiz._id }));
    }
  }
}
