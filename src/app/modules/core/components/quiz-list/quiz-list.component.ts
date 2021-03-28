import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent {

  quizList$!: Observable<Quiz[] | null>;

  constructor(
    private readonly _quizService: QuizService
  ) {
    this.refresh();
  }

  refresh(): void {
    this.quizList$ = this._quizService.getQuizList().pipe(startWith(null));
  }

  editQuiz(quiz: Quiz): void {
    // TODO
  }
}
