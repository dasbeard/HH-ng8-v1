import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleOrgComponent } from './simple-org.component';

describe('SimpleOrgComponent', () => {
  let component: SimpleOrgComponent;
  let fixture: ComponentFixture<SimpleOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
