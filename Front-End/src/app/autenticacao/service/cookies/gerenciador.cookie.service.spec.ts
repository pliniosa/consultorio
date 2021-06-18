import { TestBed } from '@angular/core/testing';

import { GerenciadorCookieService } from './gerenciador.cookie.service';

describe('CookieService', () => {
  let service: GerenciadorCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciadorCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
