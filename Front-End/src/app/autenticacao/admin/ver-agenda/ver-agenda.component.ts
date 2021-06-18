import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Agenda } from '../../models/agenda';
import { AgendaService } from '../../service/agenda/agenda.service';

@Component({
  selector: 'app-ver-agenda',
  templateUrl: './ver-agenda.component.html',
  styleUrls: ['./ver-agenda.component.css']
})
export class VerAgendaComponent implements OnInit {

  displayedColumns: string[] = ['index', 'nome', 'profissional', 'data', 'hora'];
  dataSource;
  length;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private agendaService: AgendaService
  ) { }

  ngOnInit(): void {
    this.getAgendaTodos();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAgendaTodos(){
    this.agendaService.getAgendaTodos().subscribe((agenda: Agenda[]) => {
      this.length = agenda.length;
      this.dataSource = new MatTableDataSource<Agenda>(agenda);
    });
  }

/****Filtro de Pesquisa****/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


/****Filtro do calendario****/
  myFilter = date =>{
    const day = date.getDay();
     return day !== 0 && day !== 6;
  }
}
