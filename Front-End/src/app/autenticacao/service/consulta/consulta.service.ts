import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Consulta } from 'src/app/autenticacao/models/consulta'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private SERVER_URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  postCadastro(cadastro){
    return this.httpClient.post(`${this.SERVER_URL}/consulta/registrar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  deleteConsulta(params){
    return this.httpClient.delete(`${this.SERVER_URL}/consulta/deletar` + '/' + params.id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  getConsultaUm(params){
    return this.httpClient.get(`${this.SERVER_URL}/consulta/retornar` + '/' + params.id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  putConsulta(cadastro){
    return this.httpClient.put(`${this.SERVER_URL}/consulta/alterar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  getConsulta(): Observable<Consulta[]> {
    return this.httpClient.get<Consulta[]>(`${this.SERVER_URL}/consulta/retornarTodos`)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getContador(): Promise<Consulta[]> {
    return this.httpClient.get<Consulta[]>(`${this.SERVER_URL}/agenda/retornarTodos/`)
      .toPromise();
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
