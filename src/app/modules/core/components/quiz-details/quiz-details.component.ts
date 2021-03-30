import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { cast, isDefined } from 'src/app/shared/utils/utils';
import { QuestionSet } from '../../models/question-set';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent {

  @Output() quizCreated: EventEmitter<void> = new EventEmitter<void>();

  get setsFormArray(): FormArray {
    return cast<FormArray>(this.quizForm.get('sets'));
  }

  quizForm: FormGroup = this.createQuizFormGroup();

  invalid!: boolean;
  error!: string;

  quizId?: string;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _quizService: QuizService
  ) {
  }

  clear(): void {
    this.quizId = undefined;
    this.quizForm = this.createQuizFormGroup('');
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
        (isDefined(quiz._id)
          ? this._quizService.updateQuiz(quiz)
          : this._quizService.createQuiz(quiz)
        ).subscribe({
          next: (success: boolean) => {
            if (success) {
              this.quizCreated.emit();
            } else {
              this.invalid = true;
            }
          }
        });
      } catch (err) {
        this.error = err;
        this.invalid = true;
      }
    }
  }
}
