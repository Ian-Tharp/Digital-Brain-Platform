import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

interface ChatMessage {
    sender: string;
    text: string;
}

interface JournalEntry {
    id: number;
    date: Date;
    title: string;
    text: string;
    summary: string;
    rating: number;
}

@Component({
  selector: 'app-interactive-journal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSelectModule
  ],
  templateUrl: './interactive-journal.component.html',
  styleUrls: ['./interactive-journal.component.scss']
})
export class InteractiveJournalComponent {
    selectedDate: Date = new Date();
    journalEntries: JournalEntry[] = [];
    currentEntry: JournalEntry = {
        id: 0,
        date: new Date(),
        title: '',
        text: '',
        summary: '',
        rating: 3
    };
    chatInput: string = '';
    chatMessages: ChatMessage[] = [
        { sender: 'Chatbot', text: 'Hello! How can I assist you today?' }
    ];

    get entriesForSelectedDate(): JournalEntry[] {
        return this.journalEntries.filter(entry => this.isSameDate(entry.date, this.selectedDate));
    }

    saveEntry(): void {
        if (!this.currentEntry.title.trim()) {
            alert('Please enter a title for your journal entry.');
            return;
        }
        if (this.currentEntry.text.trim()) {
            this.currentEntry.date = this.selectedDate;
            this.currentEntry.id = this.journalEntries.length + 1;
            this.currentEntry.summary = this.currentEntry.text.substring(0, 50) + '...';
            this.journalEntries.push({ ...this.currentEntry });
            console.log('Journal Entry Saved:', this.currentEntry);
            this.resetCurrentEntry();
        } else {
            alert('Please write something in your journal entry.');
        }
    }

    selectEntry(entry: JournalEntry): void {
        this.currentEntry = { ...entry };
    }

    resetCurrentEntry(): void {
        this.currentEntry = {
            id: 0,
            date: this.selectedDate,
            title: '',
            text: '',
            summary: '',
            rating: 3
        };
    }

    sendMessage(): void {
        if (this.chatInput.trim()) {
            this.chatMessages.push({ sender: 'You', text: this.chatInput });
            // Placeholder for chatbot response
            this.chatMessages.push({ sender: 'Chatbot', text: 'This is a response to your message.' });
            this.chatInput = '';
        }
    }

    private isSameDate(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }
}
