import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesMeterComponent } from './votes-meter.component';

describe('VotesMeterComponent', () => {
  let component: VotesMeterComponent;
  let fixture: ComponentFixture<VotesMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotesMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
