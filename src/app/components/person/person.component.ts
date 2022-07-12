import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: Person = new Person('','', 0, 0, 0);
  imc = '';

  constructor() { }

  ngOnInit(): void {
  }

  calcINM(){
    this.imc = this.person.calcIMC()
  }
}
