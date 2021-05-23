import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { StickySectionDirective } from './directives/sticky-section.directive';

@NgModule({
  declarations: [
    WrapperComponent,
    StickySectionDirective,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    WrapperComponent,
    StickySectionDirective
  ]
})
export class SharedModule { }
