import { Component } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-agent-builder',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './agent-builder.component.html',
  styleUrls: ['./agent-builder.component.scss']
})
export class AgentBuilderComponent {
  agentName: string = '';
  agentDescription: string = '';
  agentPurpose: string = '';
  agentCapabilities: string = '';
  agentInteractions: string = '';

  matStepper!: MatStepper;

  constructor() {}


}
