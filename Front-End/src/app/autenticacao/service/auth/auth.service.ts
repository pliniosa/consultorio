import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../../models/cliente'
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private SERVER_URL = environment.api;
  private currentUserSubject: BehaviorSubject<Cliente>;
  public currentUser: Observable<Cliente>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Cliente>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): Cliente {
    return this.currentUserSubject.value;
  }

  login(email: string, senha: string) {
    return this.httpClient.post<any>(`${this.SERVER_URL}/auth/autenticar`, { email, senha })
      .pipe(map(cliente => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(cliente));
        this.currentUserSubject.next(cliente);
        return cliente;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
