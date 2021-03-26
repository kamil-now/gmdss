import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { cast } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {

  get setsFormArray(): FormArray {
    return cast<FormArray>(this.quizForm.get('sets'));
  }

  quizForm: FormGroup = this._fb.group({
    quizTitle: '',
    sets: this._fb.array([])
  });

  constructor(
    private readonly _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createSetFormGroup();
    this.createQuestionFormGroup();
  }

  changeIsAnswerCorrect(setIndex: number, questionIndex: number, answerIndex: number, event: MatCheckboxChange): void {
    this.getQuestionAnswers(setIndex, questionIndex).at(answerIndex).get('isCorrect')?.setValue(event.checked);
  }

  getSetQuestions(index: number): FormArray {
    return cast<FormArray>(this.setsFormArray.at(index).get('questions'));
  }
  getQuestionAnswers(setIndex: number, questionIndex: number): FormArray {
    return cast<FormArray>(this.getSetQuestions(setIndex).at(questionIndex).get('answers'));
  }

  createSetFormGroup(): FormGroup {
    return this._fb.group({
      setTitle: '',
      questions: this._fb.array([])
    });
  }

  createQuestionFormGroup(): FormGroup {
    return this._fb.group({
      questionText: '',
      answers: this._fb.array([])
    });
  }

  createAnswerFormGroup(): FormGroup {
    return this._fb.group({
      answerText: '',
      isCorrect: false
    });
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

  public onSubmit(): void {
    // TODO
  }
}
