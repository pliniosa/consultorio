import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServicosService} from 'src/app/formularios/servicos/servicos.service';
@Component({
  selector: 'app-observacoes',
  templateUrl: './observacoes.component.html',
  styleUrls: ['./observacoes.component.css']
})
export class ObservacoesComponent implements OnInit {
  
  contato= {
    nome: '',
    telefone: '',
    opiniao: ''
  }
  submitted=false;


  constructor(
    private cadastroService: ServicosService,
    public dialog: MatDialog,
   
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
 
  //Post
  registrarOpiniao(form) {
    const data = {
      nome: this.contato.nome,
      telefone: this.contato.telefone,
      opiniao: this.contato.opiniao
    };

    this.cadastroService.postOpiniao(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted=true;
          this.openDialog();
        },
        error => {
          console.log(error);
        }
      );
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {
  constructor(
    private router: Router,
  ){}
  toHome(){
    this.router.navigate(['home']);
    setTimeout(function(){ location.reload(); }, 8)
  }
}