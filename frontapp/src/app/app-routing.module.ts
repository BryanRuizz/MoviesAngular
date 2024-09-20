import { RouterModule, Routes } from '@angular/router';

import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { NgModule } from '@angular/core';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'create', component: CreateMovieComponent },
  { path: 'update', component: UpdateMovieComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/create', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/create' } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
