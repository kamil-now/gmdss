import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizService } from './services/quiz.service';

const routes: Routes = [
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];
@NgModule({
  declarations: [
    HomeComponent,
    QuizDetailsComponent,
    QuizListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressBarModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        QuizService
      ]
    };
  }
}
