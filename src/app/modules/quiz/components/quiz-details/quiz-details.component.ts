import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { cast, isDefined } from 'src/app/shared/utils/utils';
import { Question } from '../../models/question';
import { Quiz } from '../../models/quiz';
import { QuizActions } from '../../state/quiz.actions';
import { QuizSelectors } from '../../state/quiz.selectors';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnDestroy {

  get questionsFormArray(): FormArray {
    return cast<FormArray>(this.quizForm.get('questions'));
  }

  quizForm: FormGroup = this.createQuizFormGroup();

  invalid!: boolean;
  error!: string;

  quizId?: string;

  private _sub: Subscription = new Subscription();
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<AppState>,
    private readonly _dialogRef: MatDialogRef<QuizDetailsComponent>
  ) {
    this._sub.add(
      this._store.pipe(select(QuizSelectors.quizEditing))
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
      quiz.questions.map(question =>
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
    );
  }

  getQuestionAnswers(questionIndex: number): FormArray {
    return cast<FormArray>(this.questionsFormArray.at(questionIndex).get('answers'));
  }

  createQuizFormGroup(title = 'NEW QUIZ', questions: FormGroup[] = []): FormGroup {
    return this._fb.group({
      title,
      questions: this._fb.array(questions)
    });
  }

  createQuestionFormGroup(text = '', answers: FormGroup[] = []): FormGroup {
    return this._fb.group({ text, answers: this._fb.array(answers) });
  }

  createAnswerFormGroup(text = '', isCorrect = false): FormGroup {
    return this._fb.group({ text, isCorrect });
  }

  addQuestion(): void {
    this.questionsFormArray.push(this.createQuestionFormGroup());
  }

  addAnswer(questionIndex: number): void {
    this.getQuestionAnswers(questionIndex).push(this.createAnswerFormGroup());
  }

  removeQuestion(questionIndex: number): void {
    this.questionsFormArray.removeAt(questionIndex);
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.getQuestionAnswers(questionIndex).removeAt(answerIndex);
  }

  onSubmit(): void {
    this.invalid = false;
    if (this.quizForm.valid) {
      try {
        const quiz: Quiz = {
          _id: this.quizId,
          title: cast<string>(this.quizForm.get('title')?.value).trim(),
          isEditable: true,
          questions: cast<Question[]>(this.quizForm.get('questions')?.value)
        };
        isDefined(quiz._id)
          ? this._store.dispatch(QuizActions.updateQuiz({ quiz, changes: quiz })) // TODO update only changed properties
          : this._store.dispatch(QuizActions.createQuiz({ quiz }));
        this.close();
      } catch (err) {
        this.error = err;
        this.invalid = true;
      }
    }
  }

  close(): void {
    this._store.dispatch(QuizActions.finishQuizEditing());
    this._dialogRef.close();
  }
}
