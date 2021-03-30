import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { cast } from 'src/app/shared/utils/utils';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent {

  @Output() quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();
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
    this.quizSelected.emit(quiz);
  }

  deleteQuiz(quiz: Quiz): void {
    this._quizService.deleteQuiz(cast<string>(quiz._id))
      .subscribe({
        next: () => this.refresh()
      });
  }
}
