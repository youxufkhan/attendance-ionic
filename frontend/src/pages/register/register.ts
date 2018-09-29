import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserModel } from '../../app/model/user.model';
import { UserService } from '../../app/service/user.service';




@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user= new UserModel();

  constructor(public navCtrl: NavController, public service: UserService, public toastCtrl: ToastController) {

  }

  register(){
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'top'
    });
    this.service.createUser(this.user).subscribe(response=>{
      console.log(response)
      toast.present()
    },(error)=>{
      console.log(error)
      toast.setMessage('error')
      toast.present()

    })
  }
    
}
