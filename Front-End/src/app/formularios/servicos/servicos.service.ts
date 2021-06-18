import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  
  private SERVER_URL = environment.api;

  constructor(private http: HttpClient) { }
  
  /*Cadastra o Cliente*/
  postCadastro(cadastro){
    return this.http.post(`${this.SERVER_URL}/auth/registrar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }


  /*Cadastra as opinioes de usuarios nao logados*/
  postOpiniao(cadastro){
    return this.http.post(`${this.SERVER_URL}/contato/registrar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
