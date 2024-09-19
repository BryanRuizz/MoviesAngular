import { RouterModule, Routes } from '@angular/router';

import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { NgModule } from '@angular/core';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';

export const routes: Routes = [
  { path: 'create', component: CreateMovieComponent },
  { path: 'update', component: UpdateMovieComponent },
  { path: '', redirectTo: '/create', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/create' } // Ruta para manejar rutas no encontradas
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
