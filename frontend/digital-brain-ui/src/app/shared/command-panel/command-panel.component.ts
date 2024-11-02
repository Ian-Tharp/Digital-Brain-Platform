import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-command-panel',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './command-panel.component.html',
  styleUrl: './command-panel.component.scss'
})
export class CommandPanelComponent {
  private destroy$ = new Subject<void>();
  
  closeCommandPanel(event: MouseEvent): void {
    event.stopPropagation();
    // Logic to close the command panel
    // Destroy the component
    this.destroy$.next();
    this.destroy$.complete();
  }
}
