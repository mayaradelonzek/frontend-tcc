import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateCreateComponent } from './candidate-create/candidate-create.component';
import { CandidateViewComponent } from './candidate-view/candidate-view.component';
import { CandidateComponent } from './candidate.component';

const routes: Routes = [
  {
    path: '', component: CandidateComponent, children: [
      { path: 'view', component: CandidateViewComponent },
      { path: 'create', component: CandidateCreateComponent },
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CandidateRoutingModule { }
