import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeationComponent } from './ideation.component';

describe('IdeationComponent', () => {
  let component: IdeationComponent;
  let fixture: ComponentFixture<IdeationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
