import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserModel } from '../../app/model/user.model';
import { UserService } from '../../app/service/user.service';
import { ViewattendancePage } from '../viewattendance/viewattendance';




@Component({
  selector: 'page-admincp',
  templateUrl: 'admincp.html'
})
export class AdminCPPage {

  user= new UserModel();
  users : any
  is_loaded =false;

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
    
  logOut(){
    localStorage.removeItem('logged_in_user_id')
    localStorage.removeItem('logged_in_username')
    this.navCtrl.pop()

  }

  viewAttendance(user_id){
    this.navCtrl.push(ViewattendancePage,{userID:user_id})
  }

}
