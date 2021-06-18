import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contato } from '../../models/contato';
import { ContatoService } from '../../service/contato/contato.service';

@Component({
  selector: 'app-ver-opinioes',
  templateUrl: './ver-opinioes.component.html',
  styleUrls: ['./ver-opinioes.component.css']
})
export class VerOpinioesComponent implements OnInit {

  displayedColumns: string[] = ['index', 'nome', 'telefone', 'opiniao', 'data'];
  dataSource;
  length;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contatoService: ContatoService) { }
  
  getContato(){
    this.contatoService.getContato().subscribe((contato: any) => {
      this.length = contato.length;
      this.dataSource = new MatTableDataSource<Contato>(contato);
    });
  }

  ngOnInit(): void {
    this.getContato();
    this.dataSource.paginator = this.paginator;
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
