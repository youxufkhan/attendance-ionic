import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { UserService } from '../../app/service/user.service';
import { UserModel } from '../../app/model/user.model';
import { AdminCPPage } from '../admincp/admincp';

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
      duration: 2000,
      position: 'top'
    });
    this.service.login(this.user).subscribe(response=>{
    if(response.type == 2){
      toast.setMessage("Successfully Logged In")
      console.log(response.type)
      setTimeout(()=>{
        this.navCtrl.push(AdminCPPage);
      },1000)
      toast.present()
    }else{
      toast.setMessage("Sorry")
      toast.present()
    }
      
      
      
    },(error)=>{
      toast.setMessage(error.error.message)
      toast.present()
    })
  }
  
  register(){
    this.navCtrl.push(RegisterPage);
  }
}
