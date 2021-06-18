import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GerenciadorCookieService {

  usuario: {
    nome: '',
    email: '',
    adm: '',
    token:''
  }

  constructor( private cookieService: CookieService ) { 
    
    //this.cookieService.set( 'email', '' );
    //this.cookieValue = this.cookieService.get('Test');
  }

  setCookie(data){
    this.cookieService.set('usuario', JSON.stringify(data));
    this.usuario = data;
  }

  getCookie(){
    let cookie = this.cookieService.get('usuario');
    if(cookie == null || cookie == ''){
      return this.usuario;
    }
    this.usuario = JSON.parse(cookie);
    return this.usuario;
  }

  deleteCookie(){
    this.cookieService.delete('usuario');
  }

  getEmail(){
    if (this.usuario == null)
    {
      this.usuario = this.getCookie();
    }
    return this.usuario.email;
  }
  
  getNome(){
    if (this.usuario == null)
    {
      this.usuario = this.getCookie();
    }
    return this.usuario.nome;
  }

  isLogin(){
    return this.cookieService.get('usuario') !=null && this.cookieService.get('usuario') != '' ;
  }

  isAdm(){
    if (this.usuario == null)
    {
      this.usuario = this.getCookie();
    }
    if (this.usuario == null)
    {
      return false;
    }
    return this.usuario.adm;
  }
}
