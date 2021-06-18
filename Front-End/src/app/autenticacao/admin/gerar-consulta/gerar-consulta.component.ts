import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsultaService } from 'src/app/autenticacao/service/consulta/consulta.service';
import { Consulta} from 'src/app/autenticacao/models/consulta';
import { HorarioService } from '../../service/horario/horario.service';
import { Horario } from '../../models/horario';
import { MatTableDataSource } from '@angular/material/table';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../../service/cliente/cliente.service';
import { Cliente } from '../../models/cliente';

interface Servicos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gerar-consulta',
  templateUrl: './gerar-consulta.component.html',
  styleUrls: ['./gerar-consulta.component.css']
})
export class GerarConsultaComponent implements OnInit {

  controle = 0;
  outro = 0;
  consulta = {
    nome:'',
    horario:'',
    servicoPrestado:'',
    compareceu:'',
    finalTratamento:''
  }
  id;
  hora: Horario[];
  clientes: Cliente[];

  displayedColumns: string[] = ['index', 'nome', 'horario', 'servicoPrestado', 'data', 'compareceu', 'editar', 'visualizar', 'deletar'];
  dataSource;
  length;

  datas: Servicos[] = [
    {value: 'Limpeza', viewValue: 'Limpeza'},
    {value: 'Ortodontia', viewValue: 'Ortodontia'},
    {value: 'Canal', viewValue: 'Canal'},
    {value: 'Protese', viewValue: 'Protese'},
    {value: 'Restauração', viewValue: 'Restauração'},
    {value: 'Cirurgia', viewValue: 'Cirurgia'}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private consultaService: ConsultaService,
    private horarioService: HorarioService,
    private usuarioService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.getHorario();
    this.getClientes();
    this.getConsultas();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  gerarPDF() {

    const html_source = document.getElementById('divChart'); // O id do elemento que contém o Html que quer imprimir.
    const filename = 'Test.pdf';
  
  
    html2canvas(html_source).then(function(canvas) {
      /*
      [210,297] Sao os números (largura e altura do papel a4) que eu encontrei para trabalhar com eles.
      Se você puder encontrar números oficiais do jsPDF, usa.
       */
      let imgData = canvas.toDataURL('image/png');
      let imgWidth = 210; // Largura em mm de um a4
      let pageHeight = 297; // Altura em mm de um a4
  
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      let pdf = new jsPDF('p', 'mm');
      let fix_imgWidth = 15; // Vai subindo e descendo esses valores ate ficar como queres
      let fix_imgHeight = 15; // Vai subindo e descendo esses valores ate ficar como queres
  
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth + fix_imgWidth, imgHeight + fix_imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save(filename);
    })
  }

  ativarCadastro(){
    const reset = {
      nome: '',
      horario: '',
      servicoPrestado: '',
      compareceu: '',
      finalTratamento: ''
    }
    this.setValor(reset);
    this.controle = 1;
  }

  listar(){
    this.controle = 0;
  }

  getHorario() {
    this.horarioService.getHorarios().subscribe((horas: Horario[]) => {
      this.hora = horas;
    });
  }

  getClientes(){
    this.usuarioService.getUsuarioTodos().subscribe((clientes: Cliente[])=>{
        this.clientes = clientes;
    })
  }

  getConsultas(){
    this.consultaService.getConsulta().subscribe((consultas: Consulta[])=>{
      this.length = consultas.length;
      this.dataSource = new MatTableDataSource<Consulta>(consultas);
    })
  }

  registrarConsulta(form){

    const data = {
      nome: this.consulta.nome,
      horario: this.consulta.horario,
      servicoPrestado: this.consulta.servicoPrestado,
      compareceu: this.consulta.compareceu,
      finalTratamento: this.consulta.finalTratamento,
    };

    this.consultaService.postCadastro(data)
      .subscribe(
        response=>{
          console.log(response);
          setTimeout(function () { location.reload(); }, 8)
        },
        error =>{
          console.log(error);
        }
      );
  }

  getConsultaUm(element){
    this.controle = 2;
    this.id = element;
    let editar = {
      id: element,
    }

    this.consultaService.getConsultaUm(editar).subscribe((consultas: Consulta[])=>{
      this.setValor(consultas);
    })
  };
  visualizar(element){
    this.controle = 3;
    this.id = element;
    let editar = {
      id: element,
    }

    this.consultaService.getConsultaUm(editar).subscribe((consultas: Consulta[])=>{
      this.setValor(consultas);
    })
  };
  setValor(valor){
    this.consulta.nome = valor.nome;
    this.consulta.horario = valor.horario;
    this.consulta.compareceu = valor.compareceu;
    this.consulta.servicoPrestado = valor.servicoPrestado;
    this.consulta.finalTratamento = valor.finalTratamento;
  }

  editarConsulta(form){
    const data = {
      _id: this.id,
      nome: this.consulta.nome,
      horario: this.consulta.horario,
      servicoPrestado: this.consulta.servicoPrestado,
      compareceu: this.consulta.compareceu,
      finalTratamento: this.consulta.finalTratamento
    };

    this.consultaService.putConsulta(data)
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

  deleteConsulta(element) {
    let deletar = {
      id: element,
    }
    this.consultaService.deleteConsulta(deletar)
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
