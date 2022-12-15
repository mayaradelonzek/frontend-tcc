import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { VacancyService } from '../service/vacancy.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent {

  pageEvent: PageEvent;
  vacancies: any[] = [];
  pageIndex:number;
  pageSize:number;
  length:number;

  constructor(
    private vacancyService: VacancyService
  ) {
    vacancyService.findFirstPage().subscribe(p => {
      this.vacancies = p.content;
      this.pageIndex = p.number;
      this.pageSize = p.size;
      this.length = p.totalElements;
    })
  }

  getVacancyPage(event?:PageEvent) {
    this.vacancyService.findPage(event).subscribe(p => {
      this.vacancies = p.content;
      this.pageIndex = p.number;
      this.pageSize = p.size;
      this.length = p.totalElements;
    })
  }
}
