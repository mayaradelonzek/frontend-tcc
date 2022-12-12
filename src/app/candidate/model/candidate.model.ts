import { Competence } from "./competence.model";

export class Candidate {
    id: number;
    name: string;
    cpf: string;
    email: string;
    linkedin: string;
    phone: string;
    competences: Competence[];
}