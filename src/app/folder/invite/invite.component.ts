import { Component, OnInit } from '@angular/core';
import { FolderDbService } from '../folder-db.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/common/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {
  inviteForm: FormGroup;
  isFormSubmit = false;
  constructor(private folderDbService: FolderDbService, private fb: FormBuilder,
    private toaster: ToasterService, private router: Router) { }

  ngOnInit() {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ionViewWillEnter() {
    this.isFormSubmit = false;

  }
  get f() {
    return this.inviteForm.controls
  }
  onSubmit() {
    this.isFormSubmit = true;
    if (this.inviteForm.invalid) {
      return
    }
    
  }
}
