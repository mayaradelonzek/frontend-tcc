import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VacancyService } from '../service/vacancy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  featuredVacancies: any[] = [];

  constructor(
    private router: Router,
    private vacancyService: VacancyService
  ) {
    vacancyService.findFeatured().subscribe(v => {
      this.featuredVacancies = v;
    })
  }

  create() {
    this.router.navigate(['/candidates/create']);
  }

  viewVacancies() {
    this.router.navigate(['/vacancies']);
  }

}
