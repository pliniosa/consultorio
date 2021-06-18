import { TestBed } from '@angular/core/testing';

import { ProfissionaisService } from './profissionais.service';

describe('HorarioService', () => {
  let service: ProfissionaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfissionaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
