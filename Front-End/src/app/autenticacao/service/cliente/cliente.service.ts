import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private SERVER_URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUsuario(param: string): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.SERVER_URL}/auth/retornar/${param}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getUsuarioTodos(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.SERVER_URL}/auth/retornarTodos/`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  postCadastro(cadastro){
    return this.httpClient.put(`${this.SERVER_URL}/auth/alterar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  putCliente(cadastro){
    return this.httpClient.put(`${this.SERVER_URL}/auth/alterar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError));
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
