import { TestBed } from '@angular/core/testing';

import { InitLoadService } from './init-load.service';

describe('InitLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitLoadService = TestBed.get(InitLoadService);
    expect(service).toBeTruthy();
  });
});
