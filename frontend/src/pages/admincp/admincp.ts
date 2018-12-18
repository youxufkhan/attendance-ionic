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

  

  constructor(public navCtrl: NavController, public service: UserService, public toastCtrl: ToastController) {
    this.loadData();
  }

  loadData(){
    this.service.List().subscribe(response=>{
      this.users = response;
  })
  }

  approveUser(user_id){
    let toast = this.toastCtrl.create({
      message: '',
      duration: 3000,
      position: 'top'
    });
    this.service.approve(user_id).subscribe(response=>{
      toast.setMessage('user Approved')
      toast.present()
      this.loadData()
    },(error)=>{
      console.log(error)
      toast.setMessage('error')
      toast.present()
    })
  }

  disapproveUser(user_id){
    let toast = this.toastCtrl.create({
      message: '',
      duration: 3000,
      position: 'top'
    });
    this.service.disapprove(user_id).subscribe(response=>{
      toast.setMessage('user Terminated')
      toast.present()
      this.loadData()
    },(error)=>{
      console.log(error)
      toast.setMessage('error')
      toast.present()
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
