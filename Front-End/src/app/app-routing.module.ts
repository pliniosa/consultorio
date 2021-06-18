import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarProfissionalComponent } from './autenticacao/admin/cadastrar-profissional/cadastrar-profissional.component';
import { VerAgendaComponent } from './autenticacao/admin/ver-agenda/ver-agenda.component';
import { VerOpinioesComponent } from './autenticacao/admin/ver-opinioes/ver-opinioes.component';
import { MarcarConsultaComponent } from './autenticacao/cliente/marcar-consulta/marcar-consulta.component';
import { VerConsultaComponent } from './autenticacao/cliente/ver-consulta/ver-consulta.component';
import { HomeComponent } from './estatico/home/home.component';
import { ProfissionaisComponent } from './estatico/profissionais/profissionais.component';
import { ServicosPrestadoComponent } from './estatico/servicos-prestado/servicos-prestado.component';
import { CadastroComponent } from './formularios/cadastro/cadastro.component';
import { ObservacoesComponent } from './formularios/observacoes/observacoes.component';
import { AuthGuard } from '../app/autenticacao/helpers/guards/auth.guard'
import { AltConsultaComponent } from './autenticacao/cliente/alt-consulta/alt-consulta.component';
import { PerfilComponent } from './autenticacao/cliente/perfil/perfil.component';
import { EstatisticaComponent } from './autenticacao/admin/estatistica/estatistica.component';
import { GerarConsultaComponent } from './autenticacao/admin/gerar-consulta/gerar-consulta.component';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { MaterialComponent } from './autenticacao/admin/material/material.component';
import { ConsultaService } from './autenticacao/service/consulta/consulta.service';
import { ConsultasComponent } from './autenticacao/cliente/consultas/consultas.component';


const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'servicos', component: ServicosPrestadoComponent },
  {path: 'corpo_clinico', component: ProfissionaisComponent },
  {path: 'contate_nos', component: ObservacoesComponent},
  {path: 'cadastro', component: CadastroComponent },
  {path: 'agendar', component: MarcarConsultaComponent, canActivate: [AuthGuard]},
  {path: 'consulta', component: ConsultasComponent, canActivate: [AuthGuard]},
  {path: 'verOpn', component: VerOpinioesComponent, canActivate: [AuthGuard]},
  {path: 'verAgenda', component: VerAgendaComponent, canActivate: [AuthGuard]},
  {path: 'profissionais', component: CadastrarProfissionalComponent, canActivate: [AuthGuard]},
  {path: 'verConsulta', component: VerConsultaComponent, canActivate: [AuthGuard]},
  {path: 'altConsulta', component: AltConsultaComponent ,canActivate: [AuthGuard]},
  {path: 'meuPerfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'estatistica', component: EstatisticaComponent, canActivate: [AuthGuard]},
  {path: 'gerarConsulta', component: GerarConsultaComponent, canActivate: [AuthGuard]},
  {path: 'material', component: MaterialComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
