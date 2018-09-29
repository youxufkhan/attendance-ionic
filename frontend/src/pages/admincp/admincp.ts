import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserModel } from '../../app/model/user.model';
import { UserService } from '../../app/service/user.service';




@Component({
  selector: 'page-admincp',
  templateUrl: 'admincp.html'
})
export class AdminCPPage {

  user= new UserModel();
  users : any

  toast = this.toastCtrl.create({
    message: '',
    duration: 3000,
    position: 'top'
  });

  constructor(public navCtrl: NavController, public service: UserService, public toastCtrl: ToastController) {
    this.loadData();
  }

  loadData(){
    this.service.List().subscribe(response=>{
      this.users = response;
      this.users = this.users.slice()
  })
  }

  approveUser(user_id){
    
    this.service.approve(user_id).subscribe(response=>{
      this.toast.setMessage('user Approved')
      this.toast.present()
      this.loadData()
    },(error)=>{
      console.log(error)
      this.toast.setMessage('error')
      this.toast.present()
    })
  }

  disapproveUser(user_id){
    
    this.service.disapprove(user_id).subscribe(response=>{
      this.toast.setMessage('user Terminated')
      this.toast.present()
      this.loadData()
    },(error)=>{
      console.log(error)
      this.toast.setMessage('error')
      this.toast.present()
    })
  }
    
}
