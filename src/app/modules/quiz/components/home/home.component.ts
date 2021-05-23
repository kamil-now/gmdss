import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { QuizSelectors } from '../../state/quiz.selectors';
import { QuizDetailsComponent } from '../quiz-details/quiz-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private _dialog: MatDialog,
    private readonly _store: Store<AppState>) {
    this._store.pipe(select(QuizSelectors.quizEditing))
      .subscribe(selected => {
        if (selected) {
          this._openQuizDetailsDialog();
        }
      });
  }

  newQuiz(): void {
    this._openQuizDetailsDialog();
  }

  private _openQuizDetailsDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minHeight = '75vh';
    dialogConfig.minWidth = '75vw';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this._dialog.open(QuizDetailsComponent, dialogConfig);
  }
}
