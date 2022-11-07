import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateViewComponent } from './candidate-view/candidate-view.component';
import { CandidateCreateComponent } from './candidate-create/candidate-create.component';



@NgModule({
  declarations: [
    CandidateViewComponent,
    CandidateCreateComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule
  ]
})
export class CandidateModule { }
