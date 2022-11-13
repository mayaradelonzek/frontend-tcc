import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateViewComponent } from './candidate-view/candidate-view.component';
import { CandidateCreateComponent } from './candidate-create/candidate-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CandidateViewComponent,
    CandidateCreateComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule
  ]
})
export class CandidateModule { }
