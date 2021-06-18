import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOpinioesComponent } from './ver-opinioes.component';

describe('VerOpinioesComponent', () => {
  let component: VerOpinioesComponent;
  let fixture: ComponentFixture<VerOpinioesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerOpinioesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerOpinioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
