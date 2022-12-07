import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/service/candidate.service';
import { Candidate } from '../model/candidate.model';

@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.scss']
})
export class CandidateViewComponent implements OnInit {

  constructor(
    private candidateService: CandidateService,

  ) { }

  ngOnInit(): void { }
 

}
