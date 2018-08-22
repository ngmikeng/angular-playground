import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MergeMapComponent } from './merge-map/merge-map.component';
import { ConcatMapComponent } from './concat-map/concat-map.component';
import { ForkJoinComponent } from './fork-join/fork-join.component';

const routes: Routes = [
  { path: '', redirectTo: '/mergeMap', pathMatch: 'full' },
  { path: 'mergeMap', component: MergeMapComponent },
  { path: 'concatMap', component: ConcatMapComponent },
  { path: 'forkJoin', component: ForkJoinComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
