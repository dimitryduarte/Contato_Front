import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from './contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  endPoint: string = "api/contatos";
  lista: Contato[] = []

  constructor() { }

  getContato(): Contato[]{
    return this.lista;
  }

  saveContato(contato: Contato){
    this.lista.push(contato)
  }

  deleteContato(contato: Contato){
    this.lista.splice(this.lista.indexOf(contato),1)
  }

  editContato(contatoSelecionado: Contato,contatoAlterado: Contato){
    let index = this.lista.indexOf(contatoSelecionado);
    this.lista[index] = contatoAlterado;
  }
}
