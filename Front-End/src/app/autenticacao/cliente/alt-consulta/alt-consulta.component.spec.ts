import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltConsultaComponent } from './alt-consulta.component';

describe('AltConsultaComponent', () => {
  let component: AltConsultaComponent;
  let fixture: ComponentFixture<AltConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
