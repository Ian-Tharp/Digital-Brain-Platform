import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-command-panel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './command-panel.component.html',
  styleUrl: './command-panel.component.scss'
})
export class CommandPanelComponent {

}
