import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveJournalComponent } from './interactive-journal.component';

describe('InteractiveJournalComponent', () => {
  let component: InteractiveJournalComponent;
  let fixture: ComponentFixture<InteractiveJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveJournalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
