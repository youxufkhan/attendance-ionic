import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { UserService } from '../../app/service/user.service';
import { UserModel } from '../../app/model/user.model';
import { AdminCPPage } from '../admincp/admincp';
import { UserPanelPage } from '../userpanel/userpanel';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  
  form :FormGroup;
  user = new UserModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: UserService, public toastCtrl: ToastController, private formBuilder: FormBuilder) {
    this.initializeForm()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
      toast.setMessage("Successfully Logged In")
      localStorage.setItem('logged_in_username',response.username)
      localStorage.setItem('logged_in_user_id',response.id)
    if(response.type == 2){
      setTimeout(()=>{
        this.navCtrl.push(AdminCPPage);
      },500)
    }else{
      setTimeout(()=>{
        this.navCtrl.push(UserPanelPage);
      },500)
    }
    toast.present()
      
       
    },(error)=>{
      toast.setMessage(error.error.message)
      toast.present()
    })
  }
  
  register(){
    this.navCtrl.push(RegisterPage);
  }

}
