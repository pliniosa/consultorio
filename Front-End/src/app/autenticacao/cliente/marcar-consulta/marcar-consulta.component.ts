import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../service/agenda/agenda.service';
import { ProfissionaisService } from '../../service/profissionais/profissionais.service';
import { Profissionais } from '../../models/profissionais';
import { HorarioService } from '../../service/horario/horario.service';
import { Horario } from '../../models/horario';
import { FormControl, Validators } from '@angular/forms';
import { GerenciadorCookieService } from '../../service/cookies/gerenciador.cookie.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-marcar-consulta',
  templateUrl: './marcar-consulta.component.html',
  styleUrls: ['./marcar-consulta.component.css']
})
export class MarcarConsultaComponent implements OnInit {

  agendamento = {
    nome: this.cookie.getNome(),
    email: this.cookie.getEmail(),
    profissional: '',
    data: '',
    hora: '',
  }
  submitted = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  minDate = new Date();
  maxDate = new Date(2021, 12, 31);

  profissionalGet = {} as Profissionais;
  profissionais: Profissionais[];

  horarioGet = {} as Horario;
  hora: Horario[];

  constructor(
    private consultaService: AgendaService,
    private profissionaisService: ProfissionaisService,
    private horarioService: HorarioService,
    private cookie: GerenciadorCookieService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getProfissionais();//API profissional
    this.getHorario();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Email invalido' : '';
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
            this.openDialog();
          },
          error => {
            console.log(error);
            this.openDialogError();
          }
        );
    }
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

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  openDialogError() {
    this.dialog.open(DialogElementsDialog);
  }
  openDialogError2() {
    this.dialog.open(DialogElementsDialog2);
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
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {
  constructor(
    private router: Router,
  ) { }
  toHome() {
    this.router.navigate(['verConsulta']);
    setTimeout(function () { location.reload(); }, 8)
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