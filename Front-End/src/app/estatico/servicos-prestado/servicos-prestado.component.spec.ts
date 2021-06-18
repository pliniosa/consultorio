import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosPrestadoComponent } from './servicos-prestado.component';

describe('ServicosPrestadoComponent', () => {
  let component: ServicosPrestadoComponent;
  let fixture: ComponentFixture<ServicosPrestadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosPrestadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosPrestadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
