import {TestBed} from '@angular/core/testing';


import { ValueService } from './value.service';

fdescribe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  })


  it('should be create', () => {
    expect(service).toBeTruthy();
  });


  describe('Tests for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });


  describe('Tests for setValue', () => {
    it('should change the value"', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });



  describe('Tests for getPromiseValue', () => {
    it('should return "promiseValue from promise with then"', (doneFn) => {
      service.getPromiseValue()
        .then((value) => {
          expect(value).toBe('Promise value')
          doneFn();
        });
    });



    it('should return "promiseValue from promise using async', async () => {
      const rta = await service.getPromiseValue()
      expect(rta).toBe('Promise value');
    });
  });

  /// Resolve
  describe('Tests for getObservable', () => {
    it('should return "Observable value" from observable', (doneFn) => {
      service.getObservableValue()
        .subscribe(rta => {
          expect(rta).toBe('Observable value');
          doneFn();
        })
    })
  });

});
