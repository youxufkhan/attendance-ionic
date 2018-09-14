import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { UserService } from '../../app/service/user.service';
import { UserModel } from '../../app/model/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  form :FormGroup;
  user = new UserModel();

  constructor(public navCtrl: NavController, public service: UserService, public toastCtrl: ToastController, private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  initializeForm(){
    this.form = this.formBuilder.group({
      username: [this.user.username,Validators.required],
      password: [this.user.password,Validators.required]
    })
  }

  login(){
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'top'
    });
    this.service.login(this.user).subscribe(response=>{
      console.log(response)
      // toast.setMessage(response)
      toast.present()
    }),(error=>{
      console.log('here')
      toast.setMessage(error)
      toast.present()
    })
  }
  
  register(){
    this.navCtrl.push(RegisterPage);
  }
}
