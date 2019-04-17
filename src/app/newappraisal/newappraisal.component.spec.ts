import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewappraisalComponent } from './newappraisal.component';

describe('NewappraisalComponent', () => {
  let component: NewappraisalComponent;
  let fixture: ComponentFixture<NewappraisalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewappraisalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewappraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
