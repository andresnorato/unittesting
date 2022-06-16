
import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { TestBed } from '@angular/core/testing';


describe('MasterService', () => {
  let masterService: MasterService
  let valueServiceSpy:  jasmine.SpyObj<ValueService>
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [MasterService,
        { provide: ValueService, useValue: spy }
      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>
  });

  it('should be create', () => {
    expect(masterService).toBeTruthy();
  })


  // it('should return "my value" from the real service', () => {
  //    expect(masterService.getValue()).toBe('my value');
  // });

//FAKE SERVICES
  // it('should return "other value" from the fake service', () => {
  //   let fakeValueServices = new ValueFakeService();
  //    let masterServices = new MasterService(fakeValueServices as unknown as ValueService);
  //    expect(masterServices.getValue()).toBe('fake value');
  // });

//OBJECT
  // it('should return "other value" from the fake object', () => {
  //   const fake = { getValue: () => 'fake from obj' }
  //    let masterServices = new MasterService(fake as unknown as ValueService);
  //    expect(masterServices.getValue()).toBe('fake from obj');
  // });
 //SPIES
  it('should call to "getValue" from ValueService ', () => {
     valueServiceSpy.getValue.and.returnValue('fake value of spy');
     expect(masterService.getValue()).toBe('fake value of spy');
     expect(valueServiceSpy.getValue).toHaveBeenCalled();
     expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
