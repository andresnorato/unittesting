import {Person} from './person.model'

fdescribe('Test for person', ()=>{
  let person: Person;

  beforeEach(()=>{
    person = new Person('Andres', 'Gomez', 21, 40, 1.50);
  })

  it('attrs', ()=>{
    expect(person.name).toEqual('Andres');
    expect(person.lastname).toEqual('Gomez');
  });



  describe('tests for calcIMC',()=>{
    it('sould return a string done',()=>{
      //Arrage
      person.weigth = 40;
      person.heigth = 1.75;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('down')
    });
  });



    it('sould return a string normal',()=>{
      //Arrage
      person.weigth = 65;
      person.heigth = 1.65;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('normal');
    });



});
