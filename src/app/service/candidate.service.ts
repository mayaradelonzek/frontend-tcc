import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Candidate } from "../candidate/model/candidate.model";

const BASE_URL = 'http://localhost:8081/v1/candidates';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private http: HttpClient,
  ) {}

  findAll(): any {
    return this.http.get(BASE_URL);
  }

  create(candidate: Candidate, resume): any {
    const formData = new FormData();
    formData.append("candidate", new Blob([JSON.stringify( candidate )], {type: "application/json"}));
    formData.append("resume", resume)

    return this.http.post(BASE_URL, formData);
  }  

}