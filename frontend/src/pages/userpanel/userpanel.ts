import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AttendanceService } from '../../app/service/attendance.service';

/**
 * Generated class for the UserpanelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-userpanel',
  templateUrl: 'userpanel.html',
})
export class UserPanelPage {

  timed_in = false;
  user_id;
  userAttendance;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: AttendanceService, private toastCtrl: ToastController) {
    this.user_id = localStorage.getItem('logged_in_user_id');
    this.loadData()
    
  }

  getUsername(){
    return localStorage.getItem('logged_in_username')
  }

  logOut(){
    localStorage.clear();
    this.navCtrl.pop()
  }

  loadData(){
    this.service.viewAttendance(this.user_id).subscribe(res=>{
      this.userAttendance = res;
      let recent = this.userAttendance[this.userAttendance.length-1]
      if(!recent.time_out){
         this.timed_in = true;
      }else{
        this.timed_in = false;

      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserpanelPage');
  }

  timeIn(){
    let toast = this.toastCtrl.create({
      duration: 2000,
      position: 'top'
    });
    this.service.timeIn(this.user_id).subscribe(res=>{
      console.log(res)

      if(res.time_in){
        toast.setMessage('Timed In')
        toast.present()
      }
      this.loadData()
    })
  }

  timeOut(){

    this.service.timeOut(this.user_id).subscribe(res=>{
      let toast = this.toastCtrl.create({
        duration: 2000,
        position: 'top'
      });
      console.log(res)

      if(res.time_out){
        toast.setMessage('Timed Out')
        toast.present()
        
      }
      this.loadData()
    })
  }

  
  //This function calculates duration between time in and time out: stackOverflow
  duration(time_out,time_in){

    var times = {
      year: 31557600,
      month: 2629746,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
  }

    let dur = time_out-time_in

    let time_string: string = '';
    let plural: string = '';
    for(var key in times){
        if(Math.floor(dur / times[key]) > 0){
            if(Math.floor(dur / times[key]) >1 ){
                plural = 's';
            }
            else{
                plural = '';
            }

            time_string += Math.floor(dur / times[key]).toString() + ' ' + key.toString() + plural + ' ';
            dur = dur - times[key] * Math.floor(dur /times[key]);

        }
    }
    return time_string;
  }



}
