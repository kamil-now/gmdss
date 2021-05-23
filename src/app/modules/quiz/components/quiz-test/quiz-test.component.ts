import { Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/internal/Subscription';
import { first } from 'rxjs/operators';
import { AppState } from 'src/app/app.store';
import { Question } from '../../models/question';
import { QuizActions } from '../../state/quiz.actions';
import { QuizSelectors } from '../../state/quiz.selectors';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.scss']
})
export class QuizTestComponent implements OnDestroy {

  @ViewChildren(MatRadioButton) radioButtons?: QueryList<MatRadioButton>;

  get selectedQuizQuestions$(): Observable<Question[]> {
    return this._store.pipe(select(QuizSelectors.quizTestQuestions), map(questions => questions ? questions : []));
  }

  displayedQuestions: Question[] = [];
  showAnswers = false;
  correctAnswers = 0;
  allQuestionsNumber = 0;

  private readonly _pageSize = 20;

  private _sub: Subscription = new Subscription();
  constructor(
    private readonly _store: Store<AppState>
  ) {
    this._sub.add(
      this._store.pipe(select(QuizSelectors.quizSelected))
        .subscribe(selectedQuiz => {
          if (selectedQuiz) {
            this._store.dispatch(
              QuizActions.loadQuizTestQuestions({
                questions: selectedQuiz
                  ? selectedQuiz.reduce((allQuestions, quiz) => [...allQuestions, ...quiz.questions], [] as Question[])
                  : []
              })
            );
          }
        })
    );
    this._sub.add(
      this._store.pipe(select(QuizSelectors.quizTestQuestions))
        .subscribe(questions => {
          this.allQuestionsNumber = questions ? questions.length : 0;
          this.displayedQuestions = questions ? questions.slice(0, this._pageSize) : [];
        }
        )
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  displayNextQuestions(): void {
    const sum = this.displayedQuestions.length;
    this.selectedQuizQuestions$.pipe(
      map(x => x.slice(sum, sum + this._pageSize)),
      first()
    ).subscribe(questions => {
      questions.forEach(question =>
        this.displayedQuestions.push(question)
      );
    });
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
