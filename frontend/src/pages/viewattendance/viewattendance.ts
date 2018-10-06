import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AttendanceService } from '../../app/service/attendance.service';

/**
 * Generated class for the ViewattendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-viewattendance',
  templateUrl: 'viewattendance.html',
})
export class ViewattendancePage {
    user_id;
    userAttendance
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: AttendanceService) {
    this.user_id = this.navParams.get('userID')
    this.loadData();
  }

  loadData(){
    this.service.viewAttendance(this.user_id).subscribe(res=>{
      this.userAttendance = res;
      let recent = this.userAttendance[this.userAttendance.length-1]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewattendancePage');
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
