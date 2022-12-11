import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const BASE_URL = 'http://localhost:8081/v1/competences';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(
    private http: HttpClient,
  ) {}

  findAll(): any {
    return this.http.get(BASE_URL);
  }

}