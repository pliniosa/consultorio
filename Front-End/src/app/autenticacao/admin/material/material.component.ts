import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { MateriaisService } from 'src/app/autenticacao/service/materiais/materiais.service';
import { Material } from '../../models/material';
import html2canvas from 'html2canvas'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Servicos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  controle = 1;
  controleContador = 0;
  material = {
    nome: '',
    precoUnitario: 0,
    quantidade: 0,
    total: 0
  }
  id
  valorPG = 0
  displayedColumns: string[] = ['index', 'nome'/*, 'preco', 'quantidade', 'total',*/, 'data', 'editar', 'visualizar', 'deletar'];
  dataSource;
  length;

  mesEscolhido: String;
  datas: Servicos[] = [
    {value: '01', viewValue: 'Janeiro'},
    {value: '02', viewValue: 'Fevereiro'},
    {value: '03', viewValue: 'Março'},
    {value: '04', viewValue: 'Abril'},
    {value: '05', viewValue: 'Maio'},
    {value: '06', viewValue: 'Junho'},
    {value: '07', viewValue: 'Julho'},
    {value: '08', viewValue: 'Agosto'},
    {value: '09', viewValue: 'Setembro'},
    {value: '10', viewValue: 'Outubro'},
    {value: '11', viewValue: 'Novembro'},
    {value: '12', viewValue: 'Dezembro'},

  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private materialService: MateriaisService
  ) { }

  ngOnInit(): void {
    this.getConsultas();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  gerarPDF(tabela) {

    const html_source = document.getElementById(tabela); // O id do elemento que contém o Html que quer imprimir.
    const filename = 'Material.pdf';

    html2canvas(html_source).then(function (canvas) {
      /*
      [210,297] Sao os números (largura e altura do papel a4) que eu encontrei para trabalhar com eles.
      Se você puder encontrar números oficiais do jsPDF, usa.
       */
      let imgData = canvas.toDataURL(tabela);
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

  ativarCadastro() {
    this.controle = 0;
    this.material.nome = '';
    this.material.precoUnitario = 0;
    this.material.quantidade = 0;
    this.material.total = 0;
  }
  listar() {
    this.controle = 1;
  }

  mostrarTabela() {
    this.getConsultas();
    this.controle = 2
  }

  getConsultas() {
    this.materialService.getMaterial().subscribe((material: Material[]) => {
      this.length = material.length;
      this.dataSource = new MatTableDataSource<Material>(material);
      this.setValor(material, material.length)
    })
  }

  setValor(objeto, max) {
    const mes = (new Date()).getMonth();
    let aux = objeto[0].createAt[5] + objeto[0].createAt[6];
    for (var i = 0; i < max; i++) {
      //if ((mes + 1) == aux) {
        this.valorPG += objeto[i].total
      //}
    }
  }

  registrarMaterial(form) {

    const calc = this.material.precoUnitario * this.material.quantidade
    const data = {
      nome: this.material.nome,
      precoUnitario: this.material.precoUnitario,
      quantidade: this.material.quantidade,
      total: calc
    };

    this.materialService.postCadastro(data)
      .subscribe(
        response => {
          console.log(response);
          setTimeout(function () { location.reload(); }, 8)
        },
        error => {
          console.log(error);
        }
      );
  }

  getConsultaUm(element) {
    this.controle = 2;
    this.id = element;
    let editar = {
      id: element,
    }
    this.materialService.getMaterialUm(editar).subscribe((material: Material[]) => {
      this.setValor2(material);
    })
  };

  setValor2(valor) {
    this.material.nome = valor.nome;
    this.material.precoUnitario = valor.precoUnitario;
    this.material.quantidade = valor.quantidade;
    this.material.total = valor.total;
  }
  visualizarUm(element){
    this.controle = 3;
    this.id = element;
    let editar = {
      id: element,
    }
    this.materialService.getMaterialUm(editar).subscribe((material: Material[]) => {
      this.setValor2(material);
    })
  }


  editarConsulta(form) {
    const calc = this.material.precoUnitario * this.material.quantidade
    const data = {
      _id: this.id,
      nome: this.material.nome,
      precoUnitario: this.material.precoUnitario,
      quantidade: this.material.quantidade,
      total: calc,
    };

    this.materialService.putMaterial(data)
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
    this.materialService.deleteMaterial(deletar)
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

  getContador() {
    this.controleContador = 1;
    this.valorPG = 0;
    this.materialService.getMaterial().subscribe((material: Material[]) => {
      let data = material.map(material => material.createAt);
      let total = material.map(material => material.total);
      console.log(data)

      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let mes = dataAux[5]+dataAux[6]
        if (mes==this.mesEscolhido) {
          this.valorPG = this.valorPG + total[i]
        }
      }
    });
  }

}
