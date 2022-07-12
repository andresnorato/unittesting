import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //life
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should the name be "andres"', ()=>{
    component.person = new Person('andres', 'gomez', 47, 10, 45);
    expect(component.person.name).toEqual('andres');
  })


  it('should have <p> with "Mi altura es {person.height}(@input)"', ()=>{
    //Arrange
    component.person = new Person('andres', 'gomez', 47, 10, 45);
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Assert
    fixture.detectChanges();
    //Act
    expect(pElement?.textContent).toContain(component.person.heigth);
  });


  it('should have <h3> with "Hola, {person.name}(@Input) "',()=> {
    //Arrange
    component.person = new Person('andres', 'gomez', 47, 10, 45);
    const expectMessage = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement; //Tego el debug de forma no nativa
    const  h3Debug: DebugElement = personDebug.query(By.css('h3')); //LLego al elemento que quiero probar o acceder pero no en un estado nativo si no de debug
    const h3Element: HTMLElement = h3Debug.nativeElement; // Aquí si saco el elemento nativo pero del componente del debug
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3Element?.textContent).toEqual(expectMessage); // Hacemos
  });

  it('should display a text with IMC when call calcIMC', ()=> {
      //Arrange
      const expectMgs = 'overweigth level 3';
      component.person = new Person('Julian', 'Gutierrez', 30, 120, 1.65);
      const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
      //Act
      component.calcINM();
      fixture.detectChanges();
      //Assert
      expect(button?.textContent).toContain(expectMgs);
  });


  it('should display a text with IMC when do click', ()=> {
    //Arrange
    const expectMgs = 'overweigth level 3';
    component.person = new Person('Julian', 'Gutierrez', 30, 120, 1.65);
    const buttonDe = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = buttonDe.nativeElement;
    //Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(buttonElement?.textContent).toContain(expectMgs);
});


});
