import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Agenda } from '../../models/agenda';
import { AgendaService } from '../../service/agenda/agenda.service';
import { GerenciadorCookieService } from '../../service/cookies/gerenciador.cookie.service'
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-ver-consulta',
  templateUrl: './ver-consulta.component.html',
  styleUrls: ['./ver-consulta.component.css']
})
export class VerConsultaComponent implements OnInit {

  displayedColumns: string[] = ['index', 'paciente', 'profissional', 'data', 'hora', 'star'];
  email = this.cookie.getEmail();
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
  dataSource;
  length;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private agendaService: AgendaService,
    private cookie: GerenciadorCookieService
  ) { }

  ngOnInit(): void {
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
    this.agendaService.getAgendaCliente(this.email).subscribe((agenda: Agenda[]) => {
      this.length = agenda.length;
      this.dataSource = new MatTableDataSource<Agenda>(agenda);
    });
  }

  /*  deletar */
  deleteAgenda(element) {
    let deletar = {
      email: this.email,
      data: element,
    }
    this.agendaService.deleteAgendamento(deletar)
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

}