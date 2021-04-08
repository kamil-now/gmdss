import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Quiz } from '../models/quiz';

@Injectable()
export class QuizService extends ApiService {

  constructor(http: HttpClient) {
    super(http, '/quiz');
  }

  public getQuizList(): Observable<Quiz[]> {
    return this.get<Quiz[]>('/list');
  }

  public createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.post<Quiz>('/create', JSON.stringify(quiz));
  }

  public updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.put<Quiz>('/update', JSON.stringify(quiz));
  }

  public deleteQuiz(id: string): Observable<string> {
    return this.delete(`/delete/${id}`);
  }
}
