import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ProfileComponent } from './profile/profile.component';
import { InboxComponent } from './inbox/inbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
  ],
    declarations: [FolderPage,ProfileComponent,InboxComponent]
})
export class FolderPageModule {}
