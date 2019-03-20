import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contato } from '../contato';
import { ContatoService } from '../contato.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formContato: FormGroup;
  
  @Input()
  contatoSelecionado: Contato;

  constructor(private fb: FormBuilder, private contatoService: ContatoService) { 
    this.formContato = fb.group({
      nome: ['',[Validators.required, Validators.minLength(16)]],
      cpf: ['',[Validators.required,
                Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/),
                Validators.minLength(14),
                Validators.maxLength(14)]],
      email: ['',[Validators.required, Validators.email]],
      telefone: ['',[Validators.required, Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      endereco: [],
      cidade: ['',[Validators.required, Validators.maxLength(16)]],
      estado: ['',[Validators.required]],
      cep: [] 
    });
   }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes["contatoSelecionado"]){
      if(this.contatoSelecionado){
        this.formContato.setValue(this.contatoSelecionado);
      }
    }
  }

  ngOnInit() {}

  onSave(){
    if(this.formContato.invalid){      
      Swal.fire(
        'Oops!',
        'O Formulário está inválido! Verifique',
        'error'
      );
      return;    
    }
    if(this.contatoSelecionado){
      const contatoAlterado: Contato = <Contato>this.formContato.value;
      this.contatoService.editContato(this.contatoSelecionado,contatoAlterado);
      this.formContato.reset();
    }else{
      const contato: Contato = <Contato>this.formContato.value;
      this.contatoService.saveContato(contato);
      this.formContato.reset();
    }
    Swal.fire(
      'Yeees!',
      'Seu contato foi salvo com sucesso!',
      'success'
    );
  }
}
