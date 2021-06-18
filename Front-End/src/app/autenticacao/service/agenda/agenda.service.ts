import { Injectable } from '@angular/core';
import { Agenda } from '../../models/agenda';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private SERVER_URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // tslint:disable-next-line:typedef
  postAgendamento(cadastro){
    return this.httpClient.post(`${this.SERVER_URL}/agenda/registrar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  putAgendamento(cadastro){
    return this.httpClient.put(`${this.SERVER_URL}/agenda/alterar`, cadastro)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  deleteAgendamento(params){
    return this.httpClient.delete(`${this.SERVER_URL}/agenda/deletar`+ '/' + params.email + '/' + params.data,  this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
  // Usado pelo ADM para ver todos os paciente agendado
  getAgendaTodos(): Observable<Agenda[]> {
    return this.httpClient.get<Agenda[]>(`${this.SERVER_URL}/agenda/retornarTodos/`)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
//teste
  getContador(): Promise<Agenda[]> {
  return this.httpClient.get<Agenda[]>(`${this.SERVER_URL}/agenda/retornarTodos/`)
    .toPromise();
}

  // Usado pelo cliente para ver seus agendamentos
  getAgendaCliente(param: string): Observable<Agenda[]> {

    return this.httpClient.get<Agenda[]>(`${this.SERVER_URL}/agenda/retornarProCliente/${param}`)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  getAgendaData(param: string): Observable<Agenda[]> {

    return this.httpClient.get<Agenda[]>(`${this.SERVER_URL}/agenda/retornarProCliente/${param}`)
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
