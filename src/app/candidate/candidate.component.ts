import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { icons } from '../helper/icons';
import { CandidateService } from '../service/candidate.service';
import { Candidate } from './model/candidate.model';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  candidate: Candidate = new Candidate();
  icons = icons;

  constructor(
    private router: Router,
    private candidateService: CandidateService
  ) { }

  ngOnInit(): void {
    this.findCandidates();
  }

  findCandidates() {
    this.candidateService.findAll().subscribe((response: any) => {      
      this.candidate = response
      console.log(this.candidate)      
    }, (error: any) => {      
      console.log(error);
    });
  }

  getCandidates() {
    return this.candidate;
  }  
}
