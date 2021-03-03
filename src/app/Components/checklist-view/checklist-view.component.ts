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

export interface SelectElement {
  id: number;
  name: string;
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
  @Input() dataSelect: SelectElement[] = [];
  displayedColumns: string[] = ['equipment_id', 'check_list'];
  dataSource = new MatTableDataSource(this.data);
  checkoutForm = this.formBuilder.group({
    equipment_id: undefined,
    requirement: ''
  });
  ngOnInit(): void {
	  this.refresh();
    //this.checkoutForm.value.equipment_id = this.dataSelect[0].id;
    console.log(this);
  }
  
  refresh() {
	  this.dataSource = new MatTableDataSource(this.data);
    this.changeDetectorRefs.detectChanges();
    console.log(this);
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
    
    console.log(this);

    if(this.checkoutForm.value.equipment_id == undefined) { 
      console.log("Id оборудования не выбран");
      return;
     } ;

    // --- поиск идекса оборудования в массиве data ---
    let equipment_index = -1;
    let equipment_id = -1;
    for(let i = 0; i < this.data.length; i++) {
      if(this.checkoutForm.value.equipment_id == this.data[i]['equipment_id']) {
        equipment_index = i;
      }
      equipment_id = this.data[i]['equipment_id'] + 1;
    }

    // --- поиск оборудования в массиве оборудования ---
    let equipmentExist = false;
    for(let i = 0; i < this.dataSelect.length; i++) {
      if(this.checkoutForm.value.equipment_id == this.dataSelect[i]['id']) {
        equipmentExist = true;
      }
    }

    // --- наибольший индекс задачи ---
    let check_id = -1;
    for(let i = 0; i < this.data.length; i++) {
      for(let j = 0; j < this.data[i]['check_list'].length; j++) {
        if(this.data[i]['check_list'][j]['id'] >= check_id) {
          check_id = this.data[i]['check_list'][j]['id'] + 1;
        }
      }
    }

    if(equipment_index == -1) {
      if(!equipmentExist) return;

      this.data.push({
        equipment_id: this.checkoutForm.value.equipment_id,
        check_list: [{
          id: check_id,
          requirement: this.checkoutForm.value.requirement
        }]
      });
    } else {
      this.data[equipment_index]['check_list'].push(
        {
          id: check_id,
          requirement: this.checkoutForm.value.requirement
        }
      );
    }
      
    this.refresh();
  }
}
