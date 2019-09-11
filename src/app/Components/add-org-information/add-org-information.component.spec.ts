import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgInformationComponent } from './add-org-information.component';

describe('AddOrgInformationComponent', () => {
  let component: AddOrgInformationComponent;
  let fixture: ComponentFixture<AddOrgInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrgInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrgInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
