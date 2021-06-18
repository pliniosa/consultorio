import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Agenda } from '../../models/agenda'
import { AgendaService } from '../../service/agenda/agenda.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { ConsultaService } from '../../service/consulta/consulta.service';
import { Consulta } from 'src/app/autenticacao/models/consulta';
import { MateriaisService } from '../../service/materiais/materiais.service';
import { Material } from '../../models/material';
@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.component.html',
  styleUrls: ['./estatistica.component.css']
})
export class EstatisticaComponent implements OnInit {

  agendaGet = {} as Agenda;
  agenda: Agenda[];

  jan = 0; jan1 = 0; jan2 = 0; jan3 = 0; jan4 = 0;
  fev = 0; fev1 = 0; fev2 = 0; fev3 = 0; fev4 = 0;
  mar = 0; mar1 = 0; mar2 = 0; mar3 = 0; mar4 = 0;
  abr = 0; abr1 = 0; abr2 = 0; abr3 = 0; abr4 = 0;
  mai = 0; mai1 = 0; mai2 = 0; mai3 = 0; mai4 = 0;
  jun = 0; jun1 = 0; jun2 = 0; jun3 = 0; jun4 = 0;
  jul = 0; jul1 = 0; jul2 = 0; jul3 = 0; jul4 = 0;
  ago = 0; ago1 = 0; ago2 = 0; ago3 = 0; ago4 = 0;
  set = 0; set1 = 0; set2 = 0; set3 = 0; set4 = 0;
  out = 0; out1 = 0; out2 = 0; out3 = 0; out4 = 0;
  nov = 0; nov1 = 0; nov2 = 0; nov3 = 0; nov4 = 0;
  dez = 0; dez1 = 0; dez2 = 0; dez3 = 0; dez4 = 0;
  limpeza = 0; ortondotia = 0; canal = 0; protese = 0; restauração = 0; cirurgia = 0

  constructor(
    private agendaService: AgendaService,
    private consultaService: ConsultaService,
    private materialService: MateriaisService
  ) { }

  @ViewChild('divChart') content: ElementRef;


  gerarPDF() {

    const html_source = document.getElementById('divChart'); // O id do elemento que contém o Html que quer imprimir.
    const filename = 'Relatorio.pdf';


    html2canvas(html_source).then(function (canvas) {
      /*
      [210,297] Sao os números (largura e altura do papel a4) que eu encontrei para trabalhar com eles.
      Se você puder encontrar números oficiais do jsPDF, usa.
       */
      let imgData = canvas.toDataURL('divChart');
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

  async ngOnInit() {
    await this.getServicosFeitos();
    await this.getGastosMateriais();
    await this.getFinalizado();
    await this.getDesistente();
    await this.getAtendimento();
    await this.getContador();
    var onLine = new Chart("On-Line", {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
          label: 'Consultas Registradas On-Line',
          data: [this.jan, this.fev, this.mar, this.abr, this.mai, this.jun, this.jul, this.ago, this.set, this.out, this.nov, this.dez],
          backgroundColor: [
            'rgba(13,99,255,0.2)',
            'rgba(233,99,233,0.2)',
            'rgba(57,99,211,0.2)',
            'rgba(189,99,189,0.2)',
            'rgba(101,99,167,0.2)',
            'rgba(145,99,145,0.2)',
            'rgba(101,99,123,0.2)',
            'rgba(123,99,101,0.2)',
            'rgba(79,99,79,0.2)',
            'rgba(211,99,57,0.2)',
            'rgba(35,99,35,0.2)',
            'rgba(255,99,13,0.2)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    })

    var atendimento = new Chart("AtendimentoConcluido", {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
          label: 'Tratamentos realizados mensal',
          data: [this.jan1, this.fev1, this.mar1, this.abr1, this.mai1, this.jun1, this.jul1, this.ago1, this.set1, this.out1, this.nov1, this.dez1],
          backgroundColor: [
            'rgba(13,99,255,0.2)',
            'rgba(233,99,233,0.2)',
            'rgba(57,99,211,0.2)',
            'rgba(189,99,189,0.2)',
            'rgba(101,99,167,0.2)',
            'rgba(145,99,145,0.2)',
            'rgba(101,99,123,0.2)',
            'rgba(123,99,101,0.2)',
            'rgba(79,99,79,0.2)',
            'rgba(211,99,57,0.2)',
            'rgba(35,99,35,0.2)',
            'rgba(255,99,13,0.2)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    var desistente = new Chart("Desistentes", {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
          label: 'Pacientes que nao compareceram',
          data: [this.jan2, this.fev2, this.mar2, this.abr2, this.mai2, this.jun2, this.jul2, this.ago2, this.set2, this.out2, this.nov2, this.dez2],
          backgroundColor: [
            'rgba(13,99,255,0.2)',
            'rgba(233,99,233,0.2)',
            'rgba(57,99,211,0.2)',
            'rgba(189,99,189,0.2)',
            'rgba(101,99,167,0.2)',
            'rgba(145,99,145,0.2)',
            'rgba(101,99,123,0.2)',
            'rgba(123,99,101,0.2)',
            'rgba(79,99,79,0.2)',
            'rgba(211,99,57,0.2)',
            'rgba(35,99,35,0.2)',
            'rgba(255,99,13,0.2)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    var finalizado = new Chart("Finalizados", {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
          label: 'Tratamento finalizado',
          data: [this.jan3, this.fev3, this.mar3, this.abr3, this.mai3, this.jun3, this.jul3, this.ago3, this.set3, this.out3, this.nov3, this.dez3],
          backgroundColor: [
            'rgba(13,99,255,0.2)',
            'rgba(233,99,233,0.2)',
            'rgba(57,99,211,0.2)',
            'rgba(189,99,189,0.2)',
            'rgba(101,99,167,0.2)',
            'rgba(145,99,145,0.2)',
            'rgba(101,99,123,0.2)',
            'rgba(123,99,101,0.2)',
            'rgba(79,99,79,0.2)',
            'rgba(211,99,57,0.2)',
            'rgba(35,99,35,0.2)',
            'rgba(255,99,13,0.2)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    var material = new Chart("Materiais", {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
          label: 'Gastos Mensais',
          data: [this.jan4, this.fev4, this.mar4, this.abr4, this.mai4, this.jun4, this.jul4, this.ago4, this.set4, this.out4, this.nov4, this.dez4],
          backgroundColor: [
            'rgba(13,99,255,0.2)',
            'rgba(233,99,233,0.2)',
            'rgba(57,99,211,0.2)',
            'rgba(189,99,189,0.2)',
            'rgba(101,99,167,0.2)',
            'rgba(145,99,145,0.2)',
            'rgba(101,99,123,0.2)',
            'rgba(123,99,101,0.2)',
            'rgba(79,99,79,0.2)',
            'rgba(211,99,57,0.2)',
            'rgba(35,99,35,0.2)',
            'rgba(255,99,13,0.2)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    var servico = new Chart("Servico", {
      type: 'bar',
      data: {
        labels: ['Limpeza', 'Ortondotia', 'Canal', 'Protese', 'Restauração', 'Cirurgia'],
        datasets: [{
          label: 'Quantidade por servicos realizado',
          data: [this.limpeza, this.ortondotia, this.canal, this.protese, this.restauração, this.cirurgia],
          backgroundColor: [
            'rgba(13,99,255,0.2)',
            'rgba(233,99,233,0.2)',
            'rgba(57,99,211,0.2)',
            'rgba(189,99,189,0.2)',
            'rgba(101,99,167,0.2)',
            'rgba(145,99,145,0.2)',
            'rgba(101,99,123,0.2)',
            'rgba(123,99,101,0.2)',
            'rgba(79,99,79,0.2)',
            'rgba(211,99,57,0.2)',
            'rgba(35,99,35,0.2)',
            'rgba(255,99,13,0.2)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

  //Grafico de consultas registradas on line
  async getContador() {
    await this.agendaService.getContador().then((agenda: Agenda[]) => {

      let data = agenda.map(agenda => agenda.data);
      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 0 && aux[6] == 1) {
          this.jan++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 0 && aux[6] == 2) {
          this.fev++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 0 && aux[6] == 3) {
          this.mar++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 0 && aux[6] == 4) {
          this.abr++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 0 && aux[6] == 5) {
          this.mai++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 0 && aux[6] == 6) {
          this.jun++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 0 && aux[6] == 7) {
          this.jul++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 0 && aux[6] == 8) {
          this.ago++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 0 && aux[6] == 9) {
          this.set++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 1 && aux[6] == 0) {
          this.out++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 1 && aux[6] == 1) {
          this.nov++;
        }
      }

      for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux[5] == 1 && aux[6] == 2) {
          this.dez++;
        }
      }
    });
  }
  //Grafico de atendimentos realizados 
  async getAtendimento() {
    await this.consultaService.getConsulta().subscribe((consulta: Consulta[]) => {
      let data = consulta.map(consulta => consulta.createAt);
      var comp = consulta.map(consulta => consulta.compareceu);

      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 1) {
          if (compAux == "sim") {
            this.jan1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 2) {
          if (compAux == "sim") {
            this.fev1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 3) {
          if (compAux == "sim") {
            this.mar1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 4) {
          if (compAux == "sim") {
            this.abr1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 5) {
          if (compAux == "sim") {
            this.mai1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 6) {
          if (compAux == "sim") {
            this.jun1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 7) {
          if (compAux == "sim") {
            this.jul1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 8) {
          if (compAux == "sim") {
            this.ago1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 9) {
          if (compAux == "sim") {
            this.set1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 10) {
          if (compAux == "sim") {
            this.out1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 11) {
          if (compAux == "sim") {
            this.nov1++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 12) {
          if (compAux == "sim") {
            this.dez1++;
          }
        }
      }
    });
  }
  //Grafico de pacientes que nao compareceu  
  async getDesistente() {
    await this.consultaService.getConsulta().subscribe((consulta: Consulta[]) => {
      let data = consulta.map(consulta => consulta.createAt);
      var comp = consulta.map(consulta => consulta.compareceu);

      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];

        if (dataAux[5] == 0 && dataAux[6] == 1) {
          if (compAux == "nao") {
            this.jan2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 2) {
          if (compAux == "nao") {
            this.fev2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 3) {
          if (compAux == "nao") {
            this.mar2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 4) {
          if (compAux == "nao") {
            this.abr2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 5) {
          if (compAux == "nao") {
            this.mai2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 6) {
          if (compAux == "nao") {
            this.jun2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 7) {
          if (compAux == "nao") {
            this.jul2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 8) {
          if (compAux == "nao") {
            this.ago2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 9) {
          if (compAux == "nao") {
            this.set2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 10) {
          if (compAux == "nao") {
            this.out2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 11) {
          if (compAux == "nao") {
            this.nov2++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 12) {
          if (compAux == "nao") {
            this.dez2++;
          }
        }
      }
    });
  }
  //Grafico de tratamento finalizado
  async getFinalizado() {
    await this.consultaService.getConsulta().subscribe((consulta: Consulta[]) => {
      let data = consulta.map(consulta => consulta.createAt);
      var comp = consulta.map(consulta => consulta.finalTratamento);

      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];

        if (dataAux[5] == 0 && dataAux[6] == 1) {
          if (compAux == "sim") {
            this.jan3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 2) {
          if (compAux == "sim") {
            this.fev3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 3) {
          if (compAux == "sim") {
            this.mar3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 4) {
          if (compAux == "sim") {
            this.abr3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 5) {
          if (compAux == "sim") {
            this.mai3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 6) {
          if (compAux == "sim") {
            this.jun3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 7) {
          if (compAux == "sim") {
            this.jul3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 8) {
          if (compAux == "sim") {
            this.ago3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 9) {
          if (compAux == "sim") {
            this.set3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 10) {
          if (compAux == "sim") {
            this.out3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 11) {
          if (compAux == "sim") {
            this.nov3++;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let compAux = comp[i];
        if (dataAux[5] == 0 && dataAux[6] == 12) {
          if (compAux == "sim") {
            this.dez3++;
          }
        }
      }
    });
  }
  //Grafico de gastos com material
  async getGastosMateriais() {
    await this.materialService.getMaterial().subscribe((material: Material[]) => {
      let data = material.map(material => material.createAt);
      let total = material.map(material => material.total);
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 1) {
          this.jan4 = totalAux+this.jan4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 2) {
          this.fev4 = totalAux+this.fev4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 3) {
          this.mar4 = totalAux+this.mar4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 4) {
          this.abr4 = totalAux+this.abr4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 5) {
          this.mai4 = totalAux+this.mai4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 6) {
          this.jun4 = totalAux+this.jun4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 7) {
          this.jul4 = totalAux+this.jul4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 8) {
          this.ago4 = totalAux+this.ago4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 9) {
          this.set4 = totalAux+this.set4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 10) {
          this.out4 = totalAux+this.out4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 11) {
          this.nov4 = totalAux+this.nov4;
        }
      }
      for (let i = 0; i < data.length; i++) {
        let dataAux = data[i];
        let totalAux = total[i];
        if (dataAux[5] == 0 && dataAux[6] == 12) {
          this.dez4 = totalAux+this.dez4;
        }
      }
    });
  }

  async getServicosFeitos() {
    await this.consultaService.getConsulta().subscribe((consulta: Consulta[]) => {
      let dados = consulta.map(material => material.servicoPrestado);
      for (let i = 0; i < dados.length; i++) {
        let servAux = dados[i];
        if (servAux == "Limpeza") {
          this.limpeza ++;
        }
        if (servAux == "Ortondotia") {
          this.ortondotia ++;
        }
        if (servAux == "Canal") {
          this.canal ++;
        }
        if (servAux == "Protese") {
          this.protese ++;
        }
        if (servAux == "Restauração") {
          this.restauração ++;
        }
        if (servAux == "Cirurgia") {
          this.cirurgia ++
        }
      }
    });
  }

}