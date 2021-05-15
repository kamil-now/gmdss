import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { cast, isDefined } from 'src/app/shared/utils/utils';
import { QuestionSet } from '../../models/question-set';
import { Quiz } from '../../models/quiz';
import { QuizActions } from '../../state/quiz.actions';
import { QuizSelectors } from '../../state/quiz.selectors';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnDestroy {

  get setsFormArray(): FormArray {
    return cast<FormArray>(this.quizForm.get('sets'));
  }

  quizForm: FormGroup = this.createQuizFormGroup();

  invalid!: boolean;
  error!: string;

  quizId?: string;

  private _sub: Subscription = new Subscription();
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<AppState>
  ) {
    this._sub.add(
      this._store.pipe(select(QuizSelectors.quizSelected))
        .subscribe(selected => {
          if (selected) {
            this.initializeWith(selected);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  clear(): void {
    this.quizId = undefined;
    this.quizForm = this.createQuizFormGroup('');
    this._store.dispatch(QuizActions.clearQuizData());
  }

  initializeWith(quiz: Quiz): void {
    this.quizId = quiz._id;
    this.quizForm = this.createQuizFormGroup(
      quiz.title,
      quiz.sets.map(set =>
        this.createSetFormGroup(
          set.title,
          set.questions.map(question =>
            this.createQuestionFormGroup(
              question.text,
              question.answers.map(answer =>
                this.createAnswerFormGroup(
                  answer.text,
                  answer.isCorrect
                )
              )
            )
          )
        )
      )
    );
  }

  getSetQuestions(index: number): FormArray {
    return cast<FormArray>(this.setsFormArray.at(index).get('questions'));
  }
  getQuestionAnswers(setIndex: number, questionIndex: number): FormArray {
    return cast<FormArray>(this.getSetQuestions(setIndex).at(questionIndex).get('answers'));
  }

  createQuizFormGroup(title = 'NEW QUIZ', sets: FormGroup[] = []): FormGroup {
    return this._fb.group({
      title,
      sets: this._fb.array(sets)
    });
  }

  createSetFormGroup(title = 'NEW SET', questions: FormGroup[] = []): FormGroup {
    return this._fb.group({ title, questions: this._fb.array(questions) });
  }

  createQuestionFormGroup(text = '', answers: FormGroup[] = []): FormGroup {
    return this._fb.group({ text, answers: this._fb.array(answers) });
  }

  createAnswerFormGroup(text = '', isCorrect = false): FormGroup {
    return this._fb.group({ text, isCorrect });
  }

  addSet(): void {
    this.setsFormArray.push(this.createSetFormGroup());
  }

  addQuestion(index: number): void {
    this.getSetQuestions(index).push(this.createQuestionFormGroup());
  }

  addAnswer(setIndex: number, questionIndex: number): void {
    this.getQuestionAnswers(setIndex, questionIndex).push(this.createAnswerFormGroup());
  }

  removeSet(index: number): void {
    this.setsFormArray.removeAt(index);
  }

  removeQuestion(setIndex: number, questionIndex: number): void {
    this.getSetQuestions(setIndex).removeAt(questionIndex);
  }

  removeAnswer(setIndex: number, questionIndex: number, answerIndex: number): void {
    this.getQuestionAnswers(setIndex, questionIndex).removeAt(answerIndex);
  }

  onSubmit(): void {
    this.invalid = false;
    if (this.quizForm.valid) {
      try {
        const quiz: Quiz = {
          _id: this.quizId,
          title: cast<string>(this.quizForm.get('title')?.value).trim(),
          sets: cast<QuestionSet[]>(this.quizForm.get('sets')?.value)
        };
        isDefined(quiz._id)
          ? this._store.dispatch(QuizActions.updateQuiz({ quiz, changes: quiz })) // TODO update only changed properties
          : this._store.dispatch(QuizActions.createQuiz({ quiz }));

      } catch (err) {
        this.error = err;
        this.invalid = true;
      }
    }
  }
}
