import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgServicesComponent } from './add-org-services.component';

describe('AddOrgServicesComponent', () => {
  let component: AddOrgServicesComponent;
  let fixture: ComponentFixture<AddOrgServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrgServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrgServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
