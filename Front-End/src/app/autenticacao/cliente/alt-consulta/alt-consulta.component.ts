import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Horario } from '../../models/horario';
import { Profissionais } from '../../models/profissionais';
import { AgendaService } from '../../service/agenda/agenda.service';
import { GerenciadorCookieService } from '../../service/cookies/gerenciador.cookie.service';
import { HorarioService } from '../../service/horario/horario.service';
import { ProfissionaisService } from '../../service/profissionais/profissionais.service';

@Component({
  selector: 'app-alt-consulta',
  templateUrl: './alt-consulta.component.html',
  styleUrls: ['./alt-consulta.component.css']
})
export class AltConsultaComponent implements OnInit {

  agendamento = {
    nome: this.cookie.getNome(),
    email: this.cookie.getEmail(),
    profissional: '',
    data: '',
    hora: '',
  }
  submitted = false;

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

  ngOnInit(): void {
    this.getProfissionais();//API profissional
    this.getHorario();//API profissional
  }

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

  registrarAgenda(form) {
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
          this.openDialog();
        },
        error => {
          console.log(error);
          this.openDialogError();
        }
      );
  }

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

}

@Component({
  selector: 'dialog-elements-dialog',
  templateUrl: 'dialog-elements-dialog.html',
})
export class DialogElementsDialog {
}
