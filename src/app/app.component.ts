import { Component } from '@angular/core';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from './app.store';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(store: Store<AppState>) {
    store.dispatch({ type: ROOT_EFFECTS_INIT });
  }
}
