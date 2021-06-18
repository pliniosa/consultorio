import { Component, OnInit } from '@angular/core';
import { ProfissionaisService } from 'src/app/autenticacao/service/profissionais/profissionais.service';
import { Profissionais } from '../../models/profissionais';


@Component({
  selector: 'app-cadastrar-profissional',
  templateUrl: './cadastrar-profissional.component.html',
  styleUrls: ['./cadastrar-profissional.component.css']
})
export class CadastrarProfissionalComponent implements OnInit {

  profissional = {
    nome:'',
    cro:''
  }
  controle = 0;
  submitted=false;

  profissionalGet = {} as Profissionais;
  profissionais: Profissionais[];

  constructor( 
    private  cadastroService: ProfissionaisService,
  ) { }

  ngOnInit(): void {
    this.getProfissionais();
  }
  ativarCadastro(){
    this.controle = 1;
    
  }
  ativarDelete(){
    this.controle = 2;
  }

  listar(){
    this.controle = 3;
  }

  registrarProfissional(form){
    const data = {
      nome: this.profissional.nome,
      cro: this.profissional.cro,
    };

    this.cadastroService.postCadastro(data)
      .subscribe(
        response=>{
          console.log(response);
          this.submitted=true;
          setTimeout(function () { location.reload(); }, 8)
        },
        error =>{
          console.log(error);
        }
      );
  }

  deletarProfissional(element) {
    let cro = this.profissional.cro
    this.cadastroService.deleteProfissional(cro)
      .subscribe(
        response => {
          console.log(response);
          setTimeout(function () { location.reload(); }, 8)
        },
        error => {
          console.log(error);
          setTimeout(function () { location.reload(); }, 8)
        }
      );
  }

  getProfissionais() {
    this.cadastroService.getProfissionais().subscribe((profissionais: Profissionais[]) => {
      this.profissionais = profissionais;
    });
  }
}
