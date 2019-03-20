import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor(private contatoService: ContatoService) { }

  @Output()
  contatoSelecionadoEvento: EventEmitter<any> = new EventEmitter();
  
  listaContato: Contato[] = [];
  ngOnInit() {
    this.listaContato = this.contatoService.getContato();
  }

  onSelecionado(contato: Contato){
    this.contatoSelecionadoEvento.emit(contato);
    console.log("Selecionei o contato" + contato.nome);
  }

  onRemover(contato: Contato){
    this.contatoService.deleteContato(contato)
  }  

}
