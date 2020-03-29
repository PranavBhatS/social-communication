import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { ProfileComponent } from './profile/profile.component';
import { InboxComponent } from './inbox/inbox.component';

const routes: Routes = [
  {
    path: 'Profile',
    component: ProfileComponent
  }, {
    path: 'Inbox',
    component: InboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule { }
