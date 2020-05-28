import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitGuildComponent } from './visit-guild.component';

describe('VisitGuildComponent', () => {
  let component: VisitGuildComponent;
  let fixture: ComponentFixture<VisitGuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitGuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
