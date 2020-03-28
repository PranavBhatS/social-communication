import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
   
  }
  // {
  //   path: '/profile',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
  //   canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
