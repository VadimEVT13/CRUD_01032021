import { Input, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgModule }      from '@angular/core';
import { FormBuilder } from '@angular/forms';

export interface Element_check_list {
	id: number;
	requirement: string;
}

export interface Element {
	equipment_id: number;
	check_list: Element_check_list[];
}

@Component({
  selector: 'app-checklist-view',
  templateUrl: './checklist-view.component.html',
  styleUrls: ['./checklist-view.component.css']
})
export class ChecklistViewComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder) { }

  @Input() data: Element[] = [];
  transformData: any[] = [];
  displayedColumns: string[] = ['id', 'requirement', 'UR'];
  dataSource = new MatTableDataSource(this.data);
  
  ngOnInit(): void {
	  this.refresh();
    this.transformData = this.transform();
    this.dataSource = new MatTableDataSource(this.transformData);
  }
  
  refresh() {
	  this.dataSource = new MatTableDataSource(this.transform());
  }
  
  applyFilter(event: Event) {
	  const filterValue = (event.target as HTMLInputElement).value;
	  this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  transform(): any[] {
    var newData = [];
    for(let i = 0; i < this.data.length; i++) {
      newData.push({equipment_id: this.data[i]['equipment_id'], isGroupBy: true});
      for(let j = 0; j < this.data[i]['check_list'].length; j++) {
        newData.push({
          id: this.data[i]['check_list'][j]['id'],
          requirement: this.data[i]['check_list'][j]['requirement']
        });
      }
    }
    return newData;
  }

  isGroup(index : number, item : any): boolean {
    return item.isGroupBy;
  }

  removeRow(id: number) {
    console.log(id);
    for(var i = 0; i < this.data.length; i++) {
		  for(var j = 0; j < this.data[i]['check_list'].length; j++) {
        if(id == this.data[i]['check_list'][j]['id']) {
          this.data[i]['check_list'].splice(j, 1);
          this.refresh();
          break;
        }		  
      }
	  }
  }

  removeGroup(id: number) {
    for(var i = 0; i < this.data.length; i++) {
		  if(id == this.data[i]['equipment_id']) {
			this.data.splice(i, 1);
			this.refresh();
			break;
		  }		  
	  }
  }
}
