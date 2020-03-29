import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from './register.service';
import { ToasterService } from '../common/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private regSer: RegisterService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.initFormBuilder()
  }
  ionViewWillEnter() {
    this.isSubmitted = false;
  }
  initFormBuilder(): void {
    
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])),
    }, {
      validators: this.password.bind(this)
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  isSubmitted = false;
  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    let user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.regSer.signup(user).then(res => {
      this.registerForm.reset();
      this.toasterService.normalToast(`${res.user.email} is created successfully`, 'success');
      this.router.navigate(['/login'])
    })
      .catch(err => {
        this.toasterService.normalToast(err.message, 'danger')
      })
  }
}