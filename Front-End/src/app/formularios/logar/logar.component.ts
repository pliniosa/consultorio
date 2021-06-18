import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { first } from 'rxjs/operators';
import { AuthService } from '../../autenticacao/service/auth/auth.service';
import { GerenciadorCookieService } from '../../autenticacao/service/cookies/gerenciador.cookie.service'

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.css']
})
export class LogarComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;

  usuario = {
    nome: '',
    email: '',
    token:'',
    adm: false
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private cookie : GerenciadorCookieService,
    private authService: SocialAuthService,//
    public dialog: MatDialog,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);//
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    }),
    this.authService.authState.subscribe(user => {
      this.user = user;//
    })
  }
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.usuario.nome = this.user.name,
    this.usuario.email = this.user.email,
    this.usuario.token = this.user.authToken,
    this.cookie.setCookie(this.usuario),
    this.reload();
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID),
    this.usuario.nome = this.user.name,
    this.usuario.email = this.user.email,
    this.usuario.token = this.user.authToken,
    this.cookie.setCookie(this.usuario),
    this.reload();
  }
  openDialogError() {
    this.dialog.open(DialogElementsDialog);
  }

  reload(): void{
    this.router.navigate(['home']);
    setTimeout(function(){ location.reload(); }, 8)
  }

  signOut(): void {
    this.authService.signOut();
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.openDialogError();
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.senha.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
          // get return url from route parameters or default to '/'
          //const returnUrl = this.route.snapshot.queryParams['home'] || '/';
          this.cookie.setCookie(data);
          this.router.navigate(['home']);
          setTimeout(function(){ location.reload(); }, 8)
        },
        error: error => {
          this.error = error;
          this.loading = false;
          this.openDialogError();
        }
      });
  }
}

@Component({
  selector: 'dialog-elements-dialog',
  templateUrl: 'dialog-elements-dialog.html',
})
export class DialogElementsDialog {
    
}