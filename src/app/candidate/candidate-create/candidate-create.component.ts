import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/service/candidate.service';
import { CompetenceService } from 'src/app/service/competence.service';
import { icons } from '../../helper/icons'
import { Candidate } from '../model/candidate.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { Renderer2 } from '@angular/core';
import { CustomValidators } from 'src/app/components/validator/CustomValidators';
import { Competence } from '../model/competence.model';

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.scss']
})
export class CandidateCreateComponent implements OnInit, AfterViewInit {

  accept: string = ".pdf";
  color: ThemePalette = 'accent';
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  emailConfirmation = new FormControl('', [Validators.required, Validators.email]);
  cpf = new FormControl('', [Validators.required]);
  linkedin = new FormControl('', [Validators.required, CustomValidators.validUrl]);
  phone = new FormControl('', [Validators.required]);
  resumeControl = new FormControl('', [Validators.required]);

  resume;
  

  //competence
  @ViewChild('competenceInput') competenceInput: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allCompetences: any[] = [];
  competences: any[] = [];
  filteredCompetences = new Observable<any>;
  competenceCtrl = new FormControl('');

  selectedFile: string = 'Currículo';

  candidateModel: Candidate = new Candidate();

  @ViewChild('testete') inputCapiroto;

  icons = icons;

  constructor(
    private candidateService: CandidateService,
    private competenceService: CompetenceService,
    private renderer:Renderer2
  ) { }

  ngOnInit(): void {
    this.competenceService.findAll().subscribe(res => {
      this.allCompetences = res;

      this.filteredCompetences = this.competenceCtrl.valueChanges.pipe(
        startWith(null),
        map((competence: any | null) => (competence ? this._filter(competence) : this.allCompetences.slice())),
      );
    });

    this.resumeControl.valueChanges.subscribe((file: any) => {
      console.log(file)
      this.resume = file;
      this.selectedFile = file.name;
    })
  }

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.inputCapiroto['_elementRef'].nativeElement.children[0], 'visibility', 'hidden');
  }

  save() {
    if (!this.isFormValid()) return;

    this.buildCandidate();
    this.candidateService.create(this.candidateModel, this.resume).subscribe(response => {
      this.candidateModel = response;
      alert('Candidato salvo com sucesso')      
      console.log('Candidato salvo com sucesso.');
      console.log(response)
    }, error => {
      alert(error.error.errors[0])
      console.log(error);
    });
  }

  private buildCandidate() {
    this.candidateModel.name = this.name.value;
    this.candidateModel.email = this.email.value;
    this.candidateModel.phone = this.phone.value;
    this.candidateModel.cpf = this.cpf.value;
    this.candidateModel.linkedin = this.linkedin.value;
    this.candidateModel.competences = this.competences;
  }

  isFormValid(): boolean {

    console.log("name")
    console.log(this.name)

    console.log("email")
    console.log(this.email)

    console.log("cpf")
    console.log(this.cpf)

    console.log("linkedin")
    console.log(this.linkedin)

    console.log("phone")
    console.log(this.phone)

    console.log(`
    competences: ${this.competences.length > 0}\n
    email-confirmation: ${this.isEmailConfirmationValid()}
    `)

    return this.name.valid &&
      this.email.valid &&
      this.emailConfirmation.valid &&
      this.cpf.valid &&
      this.linkedin.valid &&
      this.phone.valid &&
      this.competences.length > 0 &&
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


  pdfInputChange(event) {
    this.renderer.setStyle(
      this.inputCapiroto['_elementRef'].nativeElement.children[0], 'innerHTML', 'teste2');
  }


  // competences


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our competence
    if (value) {
      this.competences.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.competenceCtrl.setValue(null);
  }

  remove(competence: string): void {
    const index = this.competences.indexOf(competence);

    if (index >= 0) {
      this.competences.splice(index, 1);
    }
  }

  getCompetenceByName(competenceName) {
    console.log(competenceName)
    console.log(this.allCompetences)
    return this.allCompetences.find(c => competenceName === c.name)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const comeptence = this.getCompetenceByName(event.option.viewValue);
    this.competences.push(comeptence);
    this.competenceInput.nativeElement.value = '';
    this.competenceCtrl.setValue(null);
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.allCompetences.filter(competence => competence.name.toLowerCase().includes(filterValue));
  }

}
