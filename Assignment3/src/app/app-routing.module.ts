import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscussionDetailsComponent } from './discussion-details/discussion-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PopularDiscussionsComponent } from './popular-discussions/popular-discussions.component';

// order of routes matters (place wildcard at the end)
const routes: Routes = [
  {
    path: '',
    component: PopularDiscussionsComponent
  },
  {
    path: 'details',
    component: DiscussionDetailsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
