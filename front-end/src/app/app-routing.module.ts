import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { Component } from './name/name.component'; to import component

const routes: Routes = [
  /**{path: 'quiz', component: QuizComponent} To create route to this component*/ 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
