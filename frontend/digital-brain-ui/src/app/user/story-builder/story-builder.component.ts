import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AloryithService } from '../../services/aloryith.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserQuery } from '../../models/UserQuery';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-story-builder',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './story-builder.component.html',
  styleUrls: ['./story-builder.component.scss']
})
export class StoryBuilderComponent {
  userInput: string = '';
  locationResult: string = '';
  sanitizedResult: SafeHtml = '';
  previousQueries: string[] = [];

  constructor(
    private aloryithService: AloryithService,
    private sanitizer: DomSanitizer
  ) {}

  generateLocation() {
    const payload: UserQuery = {
      id: '1',
      content: this.userInput,
      type: "user",
      user_id: '1',
      created_at: new Date(),
      updated_at: new Date()
    };
    this.aloryithService.generateLocation(payload).subscribe((result) => {
      this.locationResult = result;
      this.sanitizeMarkdown(result).then(sanitized => {
        this.sanitizedResult = sanitized;
        this.previousQueries.push(this.userInput);
        this.userInput = '';
      });
    });
  }

  private async sanitizeMarkdown(markdown: string): Promise<SafeHtml> {
    const html = await marked.parse(markdown);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
