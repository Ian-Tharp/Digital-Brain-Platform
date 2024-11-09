import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { DashboardComponent } from './user/dashboard/dashboard.component';
import { KnowledgeBaseComponent } from './user/knowledge-base/knowledge-base.component';
import { AgentBuilderComponent } from './user/agent-builder/agent-builder.component';
import { MicroLearningsComponent } from './user/micro-learnings/micro-learnings.component';
import { InsightsAnalyticsComponent } from './user/insights-analytics/insights-analytics.component';
import { BoardsComponent } from './user/boards/boards.component';
import { AgentLibraryComponent } from './user/agent-builder/agent-library/agent-library.component';


export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'knowledge-base',
    component: KnowledgeBaseComponent
  },
  {
    path: 'boards',
    component: BoardsComponent
  },
  {
    path: 'agent-builder',
    component: AgentBuilderComponent
  },
  {
    path: 'agent-library',
    component: AgentLibraryComponent
  },
  {
    path: 'micro-learnings',
    component: MicroLearningsComponent
  },
  {
    path: 'insights-analytics',
    component: InsightsAnalyticsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
