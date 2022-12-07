import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/service/candidate.service';
import { icons } from '../../helper/icons'
import { Candidate } from '../model/candidate.model';


@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.scss']
})
export class CandidateCreateComponent implements OnInit {

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  emailConfirmation = new FormControl('', [Validators.required, Validators.email]);
  cpf = new FormControl('', [Validators.required]);
  linkedin = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  candidateModel: Candidate = new Candidate();

  icons = icons;

  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit(): void {
  }

  save() {
    // if (!this.isValid()) return;

    this.buildCandidate();
    this.candidateService.create(this.candidateModel).subscribe(response => {
      this.candidateModel = response;      
      console.log('Candidato salvo com sucesso.');
      console.log(response)
    }, error => {
      console.log(error);
    });
  }

  private isValid(): boolean {
    if (this.getNameErrorMessage() ||
      this.getEmailErrorMessage() ||
      this.getEmailConfirmationErrorMessage() ||
      this.getCpfErrorMessage() ||
      this.getLinkedinErrorMessage()) {
        return false;
      }

      return true;
  }

  private buildCandidate() {
    this.candidateModel.cpf = this.cpf.value;
    this.candidateModel.name = this.name.value;
    this.candidateModel.phone = this.phone.value;
    this.candidateModel.email = this.email.value;
    this.emailConfirmation === this.email ? this.email : '';
    this.candidateModel.linkedin = this.linkedin.value;
  }

  getNameErrorMessage(): string {
    return this.name.hasError('required') ? 'É obrigatório informar um nome' : "";
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'O e-mail é obrigatório';
    }

    return this.email.hasError('email') ? 'E-mail inválido' : '';
  }

  getEmailConfirmationErrorMessage(): string {
    if (this.emailConfirmation.hasError('required')) {
      return 'A confirmação do e-mail é obrigatória';
    }

    return this.emailConfirmation !== this.email ? 'Os e-mails devem ser iguais' : '';
  }

  getCpfErrorMessage(): string {
    if (this.cpf.hasError('required')) {
      return 'O CPF é obrigatório';
    }

    return this.cpf.hasError('required') ? 'CPF inválido' : '';
  }

  getLinkedinErrorMessage(): string {

    return this.linkedin.hasError('required') ? 'É obrigatório informar o LinkedIn' : "";
  }

}
