import { Component, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/formularios/servicos/servicos.service';
import { GerenciadorCookieService } from '../../autenticacao/service/cookies/gerenciador.cookie.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  conta = {
    nome: '',
    rua:'',
    numero:'',
    cidade:'',
    telefone:'',
    email: '',
    senha: '',
    adm: false
  };
  submitted=false;

  constructor(
    private  cadastroService: ServicosService,
    private cookie : GerenciadorCookieService,
    private router: Router,
  ) { }
 
  //Controle da forma de preencher o e-mail
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Email invalido' : '';
  }

  ngOnInit(): void {
  }

  // Fazer a confirmacao do login aq e trancicao para outra tela
  login(){
  }

  //POST
  registrarUsuario(form){
    const data = {
      nome: this.conta.nome,
      rua: this.conta.rua,
      numero: this.conta.numero,
      cidade: this.conta.cidade,
      telefone: this.conta.telefone,
      email: this.conta.email,
      senha: this.conta.senha,
      adm: this.conta.adm
    };

    this.cadastroService.postCadastro(data)
      .subscribe(
        response=>{
          console.log(response);
          this.submitted=true;
          this.cookie.setCookie(data);
          this.router.navigate(['home']);
          setTimeout(function(){ location.reload(); }, 8)
        },
        error =>{
          console.log(error);
        }
      );
  }
}