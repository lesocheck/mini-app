import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnimalItemComponent, AnimalsListComponent, MainComponent} from "./components";


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'animals', component: AnimalsListComponent },
  { path: 'animal/:id', component: AnimalItemComponent },
  { path: 'animalAdd/:add', component: AnimalItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
