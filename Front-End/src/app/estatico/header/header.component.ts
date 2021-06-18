import { Component, OnInit, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { GerenciadorCookieService } from '../../autenticacao/service/cookies/gerenciador.cookie.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public innerWidth: any;
  /*CONTORLE RETIRAR DEPOIS*/
  auth = this.cookie.isLogin();
  adm = this.cookie.isAdm();

  constructor(private router: Router,
    private cookie: GerenciadorCookieService
    ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;  
  }
  
  toHome() {
    this.router.navigate(['home']);
  }
  toServico(){
    this.router.navigate(['servicos']);
  }
  toCorpoClinico() {
    this.router.navigate(['corpo_clinico']);
  }
  toContateNos() {
    this.router.navigate(['contate_nos']);
  }
  toCadastrar(){
    this.router.navigate(['cadastro']);
  }
  toVerAgenda() {
    this.router.navigate(['verAgenda']);
  }
  toProfissionais() {
    this.router.navigate(['profissionais']);
  }
  toVerOpn() {
    this.router.navigate(['verOpn']);
  }
  toAgendar() {
    this.router.navigate(['consulta']);
  }
  toPerfil(){
    this.router.navigate(['meuPerfil']);
  }
  toVerConsulta() {
    this.router.navigate(['verConsulta']);
  }
  toAltConsulta() {
    this.router.navigate(['altConsulta']);
  }
  toEstatisticas(){
    this.router.navigate(['estatistica']);
  }
  toGerarConsulta(){
    this.router.navigate(['gerarConsulta']);
  }
  toMaterial(){
    this.router.navigate(['material']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  deslogar(){
    this.cookie.deleteCookie();
    location.reload();
  }
}
