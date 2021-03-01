import { Input, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgModule }      from '@angular/core';
import { FormBuilder } from '@angular/forms';

export interface Element {
	id: number;
	name: string;
}

@Component({
  selector: 'app-equipments-view',
  templateUrl: './equipments-view.component.html',
  styleUrls: ['./equipments-view.component.css']
})
export class EquipmentsViewComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  
  @Input() data: Element[] = [];
  displayedColumns: string[] = ['id', 'name', 'UR'];
  dataSource = new MatTableDataSource(this.data);
  checkoutForm = this.formBuilder.group({
    name: ''
  });
  
  ngOnInit(): void {
	  this.refresh();
  }
  
  applyFilter(event: Event) {
	  const filterValue = (event.target as HTMLInputElement).value;
	  this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  remove(id:number) {
	  for(var i = 0; i < this.data.length; i++) {
		  if(id == this.data[i]['id']) {
			this.data.splice(i, 1);
			this.refresh();
			break;
		  }		  
	  }
  }
  
  refresh() {
	  this.dataSource = new MatTableDataSource(this.data);
	  console.log(this.data);
  }

  add() {
    if(this.data.length > 0) {		
		let id : number = this.data[this.data.length - 1]["id"] + 1;
		this.data.push({'id': id, 'name': this.checkoutForm.value.name});
	} else {
		this.data.push({'id': 1, 'name': this.checkoutForm.value.name});
	}
	this.refresh();
  }
}
