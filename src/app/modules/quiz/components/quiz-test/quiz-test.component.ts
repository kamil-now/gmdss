import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { AppState } from 'src/app/app.store';
import { Question } from '../../models/question';
import { QuestionSet } from '../../models/question-set';
import { QuizActions } from '../../state/quiz.actions';
import { QuizSelectors } from '../../state/quiz.selectors';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.scss']
})
export class QuizTestComponent implements OnInit {

  public get questionSets$(): Observable<QuestionSet[]> {
    return this._store.pipe(select(QuizSelectors.quizSelected), map(quiz => quiz ? quiz.sets : []));
  }

  public get selectedSetQuestions$(): Observable<Question[]> {
    return this._store.pipe(select(QuizSelectors.setSelected), map(set => set ? set.questions : []));
  }

  constructor(
    private readonly _store: Store<AppState>
  ) {
    this._store.dispatch(QuizActions.loadQuizList()); // TODO remove
  }

  ngOnInit(): void {
    this._store.pipe(select(QuizSelectors.selectAllQuizes))
      .subscribe(list => this._store.dispatch(QuizActions.selectQuiz({ quiz: list[0] }))); // TODO remove
  }

  selectSet(set: QuestionSet): void {
    // TODO clone set
    this._store.dispatch(QuizActions.selectQuestionSet({ set }));
  }

  // TODO handle answers
}
