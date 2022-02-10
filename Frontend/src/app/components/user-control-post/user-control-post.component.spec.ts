import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControlPostComponent } from './user-control-post.component';

describe('UserControlPostComponent', () => {
  let component: UserControlPostComponent;
  let fixture: ComponentFixture<UserControlPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserControlPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControlPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
