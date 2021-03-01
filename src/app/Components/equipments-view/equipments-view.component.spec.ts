import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsViewComponent } from './equipments-view.component';

describe('EquipmentsViewComponent', () => {
  let component: EquipmentsViewComponent;
  let fixture: ComponentFixture<EquipmentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
