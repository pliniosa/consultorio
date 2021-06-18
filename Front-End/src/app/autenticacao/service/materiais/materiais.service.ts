import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Material } from 'src/app/autenticacao/models/material'

@Injectable({
  providedIn: 'root'
})
export class MateriaisService {

  private SERVER_URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  postCadastro(cadastro){
    return this.httpClient.post(`${this.SERVER_URL}/materiais/registrar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  deleteMaterial(params){
    return this.httpClient.delete(`${this.SERVER_URL}/materiais/deletar` + '/' + params.id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  getMaterialUm(params){
    return this.httpClient.get(`${this.SERVER_URL}/materiais/retornar` + '/' + params.id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  putMaterial(cadastro){
    return this.httpClient.put(`${this.SERVER_URL}/materiais/alterar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  getMaterial(): Observable<Material[]> {
    return this.httpClient.get<Material[]>(`${this.SERVER_URL}/materiais/retornarTodos`)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  getContador(): Promise<Material[]> {
    return this.httpClient.get<Material[]>(`${this.SERVER_URL}/agenda/retornarTodos/`)
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
