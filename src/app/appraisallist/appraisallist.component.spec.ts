import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisallistComponent } from './appraisallist.component';

describe('AppraisallistComponent', () => {
  let component: AppraisallistComponent;
  let fixture: ComponentFixture<AppraisallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
