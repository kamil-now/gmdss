import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
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
    private readonly _dialog: MatDialog,
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
      const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'DELETE QUIZ',
          message: `Are you sure you want to delete ${quiz.title}?`
        }
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult === true && quiz._id) {
          this._store.dispatch(QuizActions.deleteQuiz({ id: quiz._id }));
        }
      });
    } else {
      // TODO
    }
  }
}
