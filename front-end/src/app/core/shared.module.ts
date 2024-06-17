import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudBackgroundComponent } from './components/cloud-background/cloud-background.component';

@NgModule({
  declarations: [
    CloudBackgroundComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CloudBackgroundComponent,
  ]
})
export class SharedModule { }