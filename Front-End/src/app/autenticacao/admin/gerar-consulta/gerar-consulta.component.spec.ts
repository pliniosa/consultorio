import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarConsultaComponent } from './gerar-consulta.component';

describe('GerarConsultaComponent', () => {
  let component: GerarConsultaComponent;
  let fixture: ComponentFixture<GerarConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerarConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
