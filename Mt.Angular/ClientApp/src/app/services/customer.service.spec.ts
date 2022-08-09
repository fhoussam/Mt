import { TestBed } from '@angular/core/testing';
import { MtAngularHttpService } from './mt-angular-http.service';

describe('CustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MtAngularHttpService = TestBed.get(MtAngularHttpService);
    expect(service).toBeTruthy();
  });
});
