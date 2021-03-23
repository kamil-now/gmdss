import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { WrapperComponent } from './components/wrapper/wrapper.component';

@NgModule({
  declarations: [
    WrapperComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule
  ],
  exports: [
    WrapperComponent
  ]
})
export class SharedModule { }
