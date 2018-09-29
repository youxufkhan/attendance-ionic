import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { UserService } from '../../app/service/user.service';
import { FormBuilder } from '@angular/forms';
import { AdminCPPage } from '../admincp/admincp';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController, public service: UserService, public toastCtrl: ToastController,
     ) {
      let logged_in_user_id = localStorage.getItem('logged_in_user_id');
       if(logged_in_user_id){
        this.service.View(logged_in_user_id).subscribe(res=>{
          if(res.type == 2){
            this.navCtrl.push(AdminCPPage)
          }
        })
      }
  }

  
}
