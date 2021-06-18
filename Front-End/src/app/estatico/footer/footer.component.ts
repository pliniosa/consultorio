import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  public innerWidth: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;  
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  toHome() {
    this.router.navigate(['home']);
  }
  toServico(){
    this.router.navigate(['servicos']);
  }
  toCorpoClinico() {
    this.router.navigate(['corpo_clinico']);
  }

}
