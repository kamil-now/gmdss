import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { StickySectionDirective } from './directives/sticky-section.directive';

@NgModule({
  declarations: [
    WrapperComponent,
    StickySectionDirective
  ],
  imports: [
    CommonModule,
    MatDividerModule
  ],
  exports: [
    WrapperComponent,
    StickySectionDirective
  ]
})
export class SharedModule { }
