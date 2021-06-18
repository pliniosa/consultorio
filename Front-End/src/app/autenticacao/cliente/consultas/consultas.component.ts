import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Agenda } from '../../models/agenda';
import { Horario } from '../../models/horario';
import { Profissionais } from '../../models/profissionais';
import { AgendaService } from '../../service/agenda/agenda.service';
import { GerenciadorCookieService } from '../../service/cookies/gerenciador.cookie.service';
import { HorarioService } from '../../service/horario/horario.service';
import { ProfissionaisService } from '../../service/profissionais/profissionais.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  controle = 1;

  agendamento = {
    nome: this.cookie.getNome(),
    email: this.cookie.getEmail(),
    profissional: '',
    data: '',
    hora: '',
  }
  submitted = false;

  displayedColumns: string[] = ['index', 'paciente', 'profissional', 'data', 'hora', 'editar', 'deletar'];
  dataSource;
  length;
  id;
  emailAtual = this.cookie.getEmail();
  dataDia = new Date().getUTCDate();
  dataMes = new Date().getMonth();
  dataAno = new Date().getFullYear();
  comp = "T03:00:00.000Z"
  fullDay;

  consData() {
    let mes;
    let dia;
    if (this.dataMes < 9) {
      mes = "0" + (this.dataMes + 1);
    } else {
      mes = (this.dataMes + 1);
    }
    if (this.dataDia < 9) {
      dia = "0" + this.dataDia;
    } else {
      dia = this.dataDia;
    }
    this.fullDay = this.dataAno + "-" + mes + "-" + dia + "-" + this.comp;
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  minDate = new Date();
  maxDate = new Date(2021, 12, 31);

  profissionalGet = {} as Profissionais;
  profissionais: Profissionais[];

  horarioGet = {} as Horario;
  hora: Horario[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private consultaService: AgendaService,
    private profissionaisService: ProfissionaisService,
    private horarioService: HorarioService,
    private cookie: GerenciadorCookieService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getProfissionais();//API profissional
    this.getHorario();
    this.getAgendaCliente();
    this.consData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Retornar a agenda do cliente
  getAgendaCliente() {
    this.consultaService.getAgendaCliente(this.emailAtual).subscribe((agenda: Agenda[]) => {
      this.length = agenda.length;
      this.dataSource = new MatTableDataSource<Agenda>(agenda);
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Email invalido' : '';
  }

  toRegistrar(){
    this.agendamento.nome = this.cookie.getNome(),
    this.agendamento.email = this.cookie.getEmail(),
    this.agendamento.profissional = '',
    this.agendamento.data = '',
    this.agendamento.hora = '',
    this.controle = 0;
  }

  toListar(){
    this.controle = 1;
  }

  registrarAgenda(form) {
    const agenda = {
      nome: this.cookie.getNome(),
      email: this.cookie.getEmail(),
      profissional: this.agendamento.profissional,
      data: this.agendamento.data,
      hora: this.agendamento.hora
    };
    if (agenda.data == '') {
      this.openDialogError2();
    } else {
      this.consultaService.postAgendamento(agenda)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            setTimeout(function () { location.reload(); }, 8)
          },
          error => {
            console.log(error);
            this.openDialogError();
          }
        );
    }
  }
  openDialogError() {
    this.dialog.open(DialogElementsDialog);
  }
  openDialogError2() {
    this.dialog.open(DialogElementsDialog2);
  }

  deleteAgenda(element) {
    let deletar = {
      email: this.emailAtual,
      data: element,
    }
    this.consultaService.deleteAgendamento(deletar)
      .subscribe(
        response => {
          console.log(response);
          setTimeout(function () { location.reload(); }, 8)
        },
        error => {
          console.log(error);
          setTimeout(function () { location.reload(); }, 8)
        }
      );
  }

  visualizar(element){
      this.controle = 3;
      this.agendamento.profissional= element.profissional,
      this.agendamento.data = element.data,
      this.agendamento.hora = element.hora
  };

  editAgenda(form) {
    const agenda = {
      nome:  this.cookie.getNome(),
      email: this.cookie.getEmail(),
      profissional: this.agendamento.profissional,
      data: this.agendamento.data,
      hora: this.agendamento.hora
    };

    this.consultaService.putAgendamento(agenda)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          setTimeout(function () { location.reload(); }, 8)
        },
        error => {
          console.log(error);
        }
      );
  }

  // Recebe os profissionais
  getProfissionais() {
    this.profissionaisService.getProfissionais().subscribe((profissionais: Profissionais[]) => {
      this.profissionais = profissionais;
    });
  }
  // Recebe o horario
  getHorario() {
    this.horarioService.getHorarios().subscribe((horas: Horario[]) => {
      this.hora = horas;
    });
  }

  /*------ Calendario------*/
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const dia = (d || new Date()).getDate();
    const mes = (d || new Date()).getMonth();

    switch (mes) {
      case 0: { // Cadastro do ano novo
        return day !== 0 && day !== 6 && dia !== 1;
      }
      case 1: { // carnaval 2021
        return day !== 0 && day !== 6 && dia !== 15 && dia !== 16 && dia !== 17;
      }
      case 2: { // Cadastro do feriado municipal, Aniversario da cidade
        return day !== 0 && day !== 6 && dia !== 1;
      }
      case 3: {// Sexta-feira da paixao / Tiradentes
        return day !== 0 && day !== 6 && dia !== 2 && dia !== 21;
      }
      case 4: { // Dia do trabalhador /
        return day !== 0 && day !== 6 && dia !== 1;
      }
      case 5: {// Corpus Christi / Feriado Municipal, dia de Sao Joao
        return day !== 0 && day !== 6 && dia !== 3 && dia !== 24;
      }
      case 8: {// Independencia 
        return day !== 0 && day !== 6 && dia !== 7;
      }
      case 9: {// Nossa senhora da aparecida
        return day !== 0 && day !== 6 && dia !== 12;
      }
      case 10: {// Finados / Proclamacao da republica
        return day !== 0 && day !== 6 && dia !== 2 && dia !== 15;
      }
      case 11: {// Natal
        return day !== 0 && day !== 6 && dia !== 25;
      }
      default: {//Apenas Sabados e Domingos
        return day !== 0 && day !== 6;
      }
    }
  }
}

@Component({
  selector: 'dialog-elements-dialog',
  templateUrl: 'dialog-elements-dialog.html',
})
export class DialogElementsDialog {
}


@Component({
  selector: 'dialog-elements-dialog',
  templateUrl: 'dialog-elements-dialog2.html',
})
export class DialogElementsDialog2 {
}