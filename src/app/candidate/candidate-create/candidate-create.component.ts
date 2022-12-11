import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { CustomValidators } from 'src/app/components/validator/CustomValidators';
import { CandidateService } from 'src/app/service/candidate.service';
import { CompetenceService } from 'src/app/service/competence.service';
import { icons } from '../../helper/icons'
import { Candidate } from '../model/candidate.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';



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
  linkedin = new FormControl('', [Validators.required, CustomValidators.validUrl]);
  phone = new FormControl('', [Validators.required]);

  //competence
  competenceInputCtrl = new FormControl('', [Validators.required]);
  competencesCtrl = new FormControl([], [Validators.required]);
  @ViewChild('competenceInput') competenceInput: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  comps;

  candidateModel: Candidate = new Candidate();

  icons = icons;

  constructor(
    private candidateService: CandidateService,
    private competenceService: CompetenceService
  ) { }

  ngOnInit(): void {
    this.competenceService.findAll().subscribe(res => {
      this.comps = res;
    });
  }

  save() {
    if (!this.isFormValid()) return;

    this.buildCandidate();
    this.candidateService.create(this.candidateModel).subscribe(response => {
      this.candidateModel = response;      
      console.log('Candidato salvo com sucesso.');
      console.log(response)
    }, error => {
      console.log(error);
    });
  }

  private buildCandidate() {
    this.candidateModel.cpf = this.cpf.value;
    this.candidateModel.name = this.name.value;
    this.candidateModel.phone = this.phone.value;
    this.candidateModel.email = this.email.value;
    this.emailConfirmation === this.email ? this.email : '';
    this.candidateModel.linkedin = this.linkedin.value;
  }

  isFormValid(): boolean {
    return this.name.valid &&
      this.email.valid &&
      this.emailConfirmation.valid &&
      this.cpf.valid &&
      this.linkedin.valid &&
      this.phone.valid &&
      // this.competences.valid &&
      this.isEmailConfirmationValid();
  }

  isEmailConfirmationValid() {
    return this.emailConfirmation.value === this.email.value
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






  // competences


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.insertSelectedFruit(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.competenceInputCtrl.setValue(null);
  }

  insertSelectedFruit(value) {
    const selectedCompetences = this.competencesCtrl.value ? this.competencesCtrl.value : [];
      selectedCompetences.push(value);
      this.competencesCtrl.setValue(selectedCompetences);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.insertSelectedFruit(event.option.viewValue);
    this.competenceInput.nativeElement.value = '';
    this.competenceInputCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.comps.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }



}
