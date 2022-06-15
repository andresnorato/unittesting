
import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { ValueFakeService } from './value-fake.service';

fdescribe('MasterService', () => {

  // beforeEach(() => {
  //   service = new MasterService();
  // })

  it('should return "my value" from the real service', () => {
    let valueServices = new ValueService();
     let masterServices = new MasterService(valueServices);
     expect(masterServices.getValue()).toBe('my value');
  });

//FAKE SERVICES
  it('should return "other value" from the fake service', () => {
    let fakeValueServices = new ValueFakeService();
     let masterServices = new MasterService(fakeValueServices as unknown as ValueService);
     expect(masterServices.getValue()).toBe('fake value');
  });

//OBJECT
  it('should return "other value" from the fake object', () => {
    const fake = { getValue: () => 'fake from obj' }
     let masterServices = new MasterService(fake as unknown as ValueService);
     expect(masterServices.getValue()).toBe('fake from obj');
  });


});
