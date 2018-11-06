/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompraService } from './compra.service';

describe('CompraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompraService]
    });
  });

  it('should ...', inject([CompraService], (service: CompraService) => {
    expect(service).toBeTruthy();
  }));
});
