import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarConsultaComponent } from './marcar-consulta.component';

describe('MarcarConsultaComponent', () => {
  let component: MarcarConsultaComponent;
  let fixture: ComponentFixture<MarcarConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcarConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
