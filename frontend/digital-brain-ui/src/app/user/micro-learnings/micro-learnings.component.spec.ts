import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroLearningsComponent } from './micro-learnings.component';

describe('MicroLearningsComponent', () => {
  let component: MicroLearningsComponent;
  let fixture: ComponentFixture<MicroLearningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroLearningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroLearningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
