import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IdeationService } from '../../services/ideation/ideation-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface ChatMessage {
  sender: string;
  text: string;
}

@Component({
  selector: 'app-ideation',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './ideation.component.html',
  styleUrls: ['./ideation.component.scss']
})
export class IdeationComponent {
  public chatInput: string = '';
  public chatMessages: ChatMessage[] = [];

  constructor(private ideationService: IdeationService) {}

  public sendMessage(): void {
    // Only act if an input is entered.
    if (this.chatInput.trim()) {
      // Add the user's message to the list
      this.chatMessages.push({ sender: 'User', text: this.chatInput });
      
      // Call the backend and subscribe to the response.
      this.ideationService.getIdeationResponse(this.chatInput).subscribe({
        next: (response: string) => {
          // Append the catalyst response from the backend.
          this.chatMessages.push({ sender: 'Catalyst', text: response });
        },
        error: (error) => {
          console.error('Error fetching ideation response:', error);
          this.chatMessages.push({ sender: 'System', text: 'There was an error processing your query.' });
        }
      });
      
      // Clear the input field after sending.
      this.chatInput = '';
    }
  }
}
