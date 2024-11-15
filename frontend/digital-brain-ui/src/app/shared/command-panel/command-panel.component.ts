import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-command-panel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './command-panel.component.html',
  styleUrl: './command-panel.component.scss'
})
export class CommandPanelComponent {
  public commandInput: string = '';

  public sendCommand(): void {
    if (this.commandInput.trim()) {
      console.log('Command sent:', this.commandInput);
      this.commandInput = '';
    }
  }

  // TODO: Add a separate shared component for the chat window to be injected into other components
  //       This would be similar to the chat window for the Interactive Journal, but the chat window should be created for new chats
  //       and so each separate component that has the chat window will have its own chat history.
  //       The user would still be able to reference all of the chat history from the Chat History page, and optionally in the chats
  //       of each component, the user could reference the overall chat history as well if they wanted to, but not by default.
}
