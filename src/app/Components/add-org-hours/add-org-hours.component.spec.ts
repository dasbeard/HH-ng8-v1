import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgHoursComponent } from './add-org-hours.component';

describe('AddOrgHoursComponent', () => {
  let component: AddOrgHoursComponent;
  let fixture: ComponentFixture<AddOrgHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrgHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrgHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
