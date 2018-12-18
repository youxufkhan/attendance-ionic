import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { UserService } from '../../app/service/user.service';
// import { FormBuilder } from '@angular/forms';
import { AdminCPPage } from '../admincp/admincp';
import { UserPanelPage } from '../userpanel/userpanel';


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
          }else{
            if(res.approved){
            this.navCtrl.push(UserPanelPage)
            }else{
              let toast = this.toastCtrl.create({
                duration: 2000,
                position: 'top'
              });
              toast.setMessage('You are not approved, Contact Administrator')
              toast.present()
            }
          }
        })
      }
  }

  
}
