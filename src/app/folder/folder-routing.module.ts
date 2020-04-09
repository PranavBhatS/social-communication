import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { ProfileComponent } from './profile/profile.component';
import { InboxComponent } from './inbox/inbox.component';
import { InviteComponent } from './invite/invite.component';

const routes: Routes = [
  {
    path: 'Profile',
    component: ProfileComponent
  },
  {
    path: 'Inbox',
    component: InboxComponent
  },
  {
    path: 'Invite',
    component: InviteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule { }
