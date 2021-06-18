import { Injectable } from '@angular/core';
import { Profissionais } from '../../models/profissionais';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfissionaisService {

  private SERVER_URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getProfissionais(): Observable<Profissionais[]> {
    return this.httpClient.get<Profissionais[]>(`${this.SERVER_URL}/profissionais/retornarTodos`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  postCadastro(cadastro){
    return this.httpClient.post(`${this.SERVER_URL}/profissionais/registrar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  deleteProfissional(cadastro){
    return this.httpClient.delete(`${this.SERVER_URL}/profissionais/deletar/${cadastro}`)
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
