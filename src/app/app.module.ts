import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './app.store';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule.forRoot(),
    CoreModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
