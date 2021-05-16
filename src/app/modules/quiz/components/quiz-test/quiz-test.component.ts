import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/internal/Subscription';
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
export class QuizTestComponent implements OnInit, OnDestroy {

  @ViewChildren(MatRadioButton) radioButtons?: QueryList<MatRadioButton>;

  get questionSets$(): Observable<QuestionSet[]> {
    return this._store.pipe(select(QuizSelectors.quizSelected), map(quiz => quiz ? quiz.sets : []));
  }

  get allQuestionsNumber(): number {
    return this._allQuestions.length;
  }

  displayedQuestions: Question[] = [];
  showAnswers = false;
  correctAnswers = 0;

  private readonly _pageSize = 20;
  private _allQuestions: Question[] = [];

  private _sub: Subscription = new Subscription();
  constructor(
    private readonly _store: Store<AppState>
  ) {
    this._store.dispatch(QuizActions.loadQuizList()); // TODO remove
    this._sub.add(
      this._store.pipe(select(QuizSelectors.setSelected))
        .subscribe(selectedSets => {
          if (selectedSets) {
            this._allQuestions = selectedSets.reduce((allQuestions, set) => [...allQuestions, ...set.questions], [] as Question[]);
            this.displayedQuestions = [];
            this.displayNextQuestions();
          } else {
            this._allQuestions = [];
          }
        })
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  ngOnInit(): void {
    this._store.pipe(select(QuizSelectors.selectAllQuizes))
      .subscribe(list => this._store.dispatch(QuizActions.selectQuiz({ quiz: list[0] }))); // TODO remove
  }

  selectSet(set: QuestionSet, selected: boolean): void {
    this._store.dispatch(selected ? QuizActions.selectQuestionSet({ set }) : QuizActions.unselectQuestionSet({ set }));
  }

  displayNextQuestions(): void {
    const sum = this.displayedQuestions.length;
    this.displayedQuestions.push(...this._allQuestions.slice(sum, sum + this._pageSize));
  }

  checkAnswers(): void {
    this.showAnswers = !this.showAnswers;
    this.correctAnswers = this.radioButtons ? this.radioButtons?.filter(btn => btn.checked && btn.value.isCorrect).length : 0;
  }

  clear(): void {
    this.showAnswers = false;
    this.radioButtons?.forEach(btn => btn.checked = false);
  }

  scrollToElement($element: Element): void {
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  randomize(): void {
    this.displayedQuestions.sort(() => Math.random() - 0.5);
  }

  answerChecked(): void {
    if (this.showAnswers) {
      this.correctAnswers = this.radioButtons ? this.radioButtons?.filter(btn => btn.checked && btn.value.isCorrect).length : 0;
    }
  }

}
