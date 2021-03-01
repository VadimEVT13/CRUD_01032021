import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import CheckList from '../data/checklists.json';
import Equipments from '../data/equipments.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  checklist = CheckList;
  equipments = Equipments;
  
  
  ngOnInit(): void { 
  } 
  
  onClick() {
	  console.log(this.equipments);
  }
}
