import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table'; 
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CookieService } from 'ngx-cookie-service';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './estatico/header/header.component';
import { FooterComponent } from './estatico/footer/footer.component';
import { InformacaoComponent } from './estatico/informacao/informacao.component';
import { HomeComponent } from './estatico/home/home.component';
import { ServicosPrestadoComponent } from './estatico/servicos-prestado/servicos-prestado.component';
import { ProfissionaisComponent } from './estatico/profissionais/profissionais.component';
import { ObservacoesComponent } from './formularios/observacoes/observacoes.component';
import { CadastroComponent } from './formularios/cadastro/cadastro.component';
import { LogarComponent } from './formularios/logar/logar.component';
import { MarcarConsultaComponent } from './autenticacao/cliente/marcar-consulta/marcar-consulta.component';
import { VerAgendaComponent } from './autenticacao/admin/ver-agenda/ver-agenda.component';
import { VerOpinioesComponent } from './autenticacao/admin/ver-opinioes/ver-opinioes.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import { VerConsultaComponent } from './autenticacao/cliente/ver-consulta/ver-consulta.component';
import { CadastrarProfissionalComponent } from './autenticacao/admin/cadastrar-profissional/cadastrar-profissional.component';
import { AltConsultaComponent } from './autenticacao/cliente/alt-consulta/alt-consulta.component';
import { PerfilComponent } from './autenticacao/cliente/perfil/perfil.component';
import { EstatisticaComponent } from './autenticacao/admin/estatistica/estatistica.component';
import { GerarConsultaComponent } from './autenticacao/admin/gerar-consulta/gerar-consulta.component';
import { MaterialComponent } from './autenticacao/admin/material/material.component';
import { ConsultasComponent } from './autenticacao/cliente/consultas/consultas.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InformacaoComponent,
    HomeComponent,
    ServicosPrestadoComponent,
    ProfissionaisComponent,
    ObservacoesComponent,
    CadastroComponent,
    LogarComponent,
    MarcarConsultaComponent,
    VerAgendaComponent,
    VerOpinioesComponent,
    VerConsultaComponent,
    CadastrarProfissionalComponent,
    AltConsultaComponent,
    PerfilComponent,
    EstatisticaComponent,
    GerarConsultaComponent,
    MaterialComponent,
    ConsultasComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    FlexLayoutModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SocialLoginModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDialogModule,
    ChartsModule,
    MatTabsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('519240808062-nhrhd5evksp3q3mbje2tg191s18pj2mh.apps.googleusercontent.com'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('2767152876883358'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
