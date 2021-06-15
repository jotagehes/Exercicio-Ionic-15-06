import { TestBed } from '@angular/core/testing';

import { AlunoServiceService } from './aluno-service.service';

describe('ALunoServiceService', () => {
  let service: AlunoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
