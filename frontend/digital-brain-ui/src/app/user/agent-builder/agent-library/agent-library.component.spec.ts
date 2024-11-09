import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLibraryComponent } from './agent-library.component';

describe('AgentLibraryComponent', () => {
  let component: AgentLibraryComponent;
  let fixture: ComponentFixture<AgentLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
