import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

interface KnowledgeFile {
  id: number;
  name: string;
  type: string;
  url: string;
  tags: string[];
}

@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss']
})
export class KnowledgeBaseComponent {
  selectedTab: number = 0;
  personalFiles: KnowledgeFile[] = [];
  selectedFile: KnowledgeFile | null = null;
  newTag: string = '';

  constructor(private snackBar: MatSnackBar) {}

  onTabChange(event: any): void {
    this.selectedTab = event.index;
  }

  addFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const newFile: KnowledgeFile = {
          id: Date.now(),
          name: file.name,
          type: file.type,
          url: reader.result as string,
          tags: []
        };
        this.personalFiles.push(newFile);
        this.snackBar.open(`${file.name} added successfully`, 'Close', { duration: 3000 });
      };
      reader.readAsDataURL(file);
    }
  }

  selectFile(file: KnowledgeFile): void {
    this.selectedFile = file;
  }

  addTag(): void {
    if (this.selectedFile && this.newTag.trim()) {
      this.selectedFile.tags.push(this.newTag.trim());
      this.newTag = '';
      this.snackBar.open('Tag added successfully', 'Close', { duration: 2000 });
    }
  }
}
