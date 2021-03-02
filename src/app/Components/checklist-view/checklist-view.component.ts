import { Input, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgModule, ChangeDetectorRef }      from '@angular/core';
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
  
  constructor(private formBuilder: FormBuilder, 
    private changeDetectorRefs: ChangeDetectorRef) { }

  @Input() data: Element[] = [];
  displayedColumns: string[] = ['equipment_id', 'check_list'];
  dataSource = new MatTableDataSource(this.data);
  checkoutForm = this.formBuilder.group({
    equipment_id: 0,
    requirement: ''
  });

  ngOnInit(): void {
	  this.refresh();
  }
  
  refresh() {
    this.changeDetectorRefs.detectChanges();
	  this.dataSource = new MatTableDataSource(this.data);
    this.changeDetectorRefs.detectChanges();
  }
  
  applyFilter(event: Event) {
	  const filterValue = (event.target as HTMLInputElement).value;
	  this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isGroup(index : number, item : any): boolean {
    return item.isGroupBy;
  }

  removeRow(id: number) {
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

  add() {

  }
}
