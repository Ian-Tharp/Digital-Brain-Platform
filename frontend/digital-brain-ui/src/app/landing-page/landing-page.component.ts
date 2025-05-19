import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { WelcomeService } from '../services/landing-page/welcome.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  welcomeMessage: string = '';

  constructor(private welcomeService: WelcomeService) {}

  ngOnInit() {
    this.welcomeService.getWelcomeMessage().subscribe((message: string) => this.welcomeMessage = message);
  }
}
