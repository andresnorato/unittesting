import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
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


  it('should have <p> with "Soy un parrafo"', ()=>{
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    expect(pElement?.textContent).toEqual('Soy un parrafo');
  });


  it('should have <h3> with "Hola PersonCompoenet"',()=> {
    const personDebug: DebugElement = fixture.debugElement; //Tego el debug de forma no nativa
    const  h3Debug: DebugElement = personDebug.query(By.css('h3')); //LLego al elemento que quiero probar o acceder pero no en un estado nativo si no de debug
    const h3Element: HTMLElement = h3Debug.nativeElement; // Aquí si saco el elemento nativo pero del componente del debug
    expect(h3Element?.textContent).toEqual('Hola PersonCompoenet'); // Hacemos
  });
});
