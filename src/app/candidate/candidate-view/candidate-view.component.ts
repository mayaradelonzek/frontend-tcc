import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/service/candidate.service';
import { Candidate } from '../model/candidate.model';

@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.scss']
})
export class CandidateViewComponent implements OnInit {

  candidate: Candidate = new Candidate();

  constructor(
    private candidateService: CandidateService,

  ) { }

  ngOnInit(): void {
  }

  findCandidates() {    
    const params = {      
      params: {        
        name: this.candidate.name,
        id: this.candidate.id,
        cpf: this.candidate.cpf
      }
    };

    this.candidateService.findAll(params).subscribe((response: any) => {      
      this.candidate = response.data[0];      
    }, (error: any) => {      
      console.log(error);
    });
  }

}
