import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

const BASE_URL = 'http://localhost:8081/v1/vacancies';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(
    private http: HttpClient,
  ) {}

  findFeatured(): any {
    return this.http.get(BASE_URL + "/featured");
  }

  findPage(event: PageEvent): any {
    const size = event.pageSize;
    const page = event.pageIndex;
    const completeUrl = `${BASE_URL}?size=${size}&page=${page}&sort=company.paymentTier.priority,desc&sort=name`;
    return this.http.get(completeUrl);
  }

  findFirstPage(): any {
    const completeUrl = `${BASE_URL}?size=8&page=0&sort=company.paymentTier.priority,desc&sort=name`;
    return this.http.get(completeUrl);
  }

}