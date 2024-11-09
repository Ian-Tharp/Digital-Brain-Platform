import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { CommandPanelComponent } from "./shared/command-panel/command-panel.component";
import { trigger } from '@angular/animations';
import { animate, style, state, transition } from '@angular/animations';
import { FooterComponent } from './common/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommandPanelComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'Digital Brain Platform';
  isExpanded = true;

}
