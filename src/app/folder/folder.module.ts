import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ProfileComponent } from './profile/profile.component';
import { InboxComponent } from './inbox/inbox.component';
import { InviteComponent } from './invite/invite.component';
import { RelativeTime } from '../common/reative-time';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ReactiveFormsModule
  ],
    declarations: [FolderPage,ProfileComponent,InboxComponent,InviteComponent,RelativeTime]
})
export class FolderPageModule {}
