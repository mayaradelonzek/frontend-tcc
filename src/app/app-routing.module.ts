import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'candidates', loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule)},
  {path: 'vacancies', loadChildren: () => import('./vacancy/vacancy.module').then(m => m.VacancyModule)},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    })
  ]
})
export class AppRoutingModule { }
