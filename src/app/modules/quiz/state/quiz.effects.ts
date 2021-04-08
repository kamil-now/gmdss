import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { QuizService } from '../services/quiz.service';
import { QuizActions } from './quiz.actions';

@Injectable()
export class QuizEffects {

  loadQuizList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuizActions.loadQuizList),
      mergeMap(action =>
        this._quizService.getQuizList().pipe(
          map(response => response
            ? QuizActions.loadQuizListSuccess({ list: response })
            : QuizActions.loadQuizListFailure({ error: 'response data is invalid' })
          ),
          catchError(error => of(QuizActions.createQuizFailure({ error }))
          )
        )
      )
    )
  );

  createQuiz$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuizActions.createQuiz),
      mergeMap(action =>
        this._quizService.createQuiz(action.quiz).pipe(
          map(response => response
            ? QuizActions.createQuizSuccess({ quiz: response })
            : QuizActions.createQuizFailure({ error: 'response data is invalid' })
          ),
          catchError(error => of(QuizActions.createQuizFailure({ error }))
          )
        )
      )
    )
  );

  updateQuiz$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuizActions.updateQuiz),
      mergeMap(action =>
        this._quizService.updateQuiz(action.quiz).pipe(
          map(response => response && response._id
            ? QuizActions.updateQuizSuccess({ quiz: { id: response._id, changes: response } })
            : QuizActions.updateQuizFailure({ error: 'response data is invalid' })
          ),
          catchError(error => of(QuizActions.deleteQuizFailure({ error }))
          )
        )
      )
    )
  );

  deleteQuiz$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuizActions.deleteQuiz),
      mergeMap(action =>
        this._quizService.deleteQuiz(action.id).pipe(
          map(response => response
            ? QuizActions.deleteQuizSuccess({ id: response })
            : QuizActions.deleteQuizFailure({ error: 'response data is invalid' })
          ),
          catchError(error => of(QuizActions.deleteQuizFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _quizService: QuizService
  ) {
  }
}
