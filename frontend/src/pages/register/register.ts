import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../app/model/user.model';




@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user= new UserModel();

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  register(){
    
    var url = "http://localhost/basic/web/index.php?r=user/create"
    this.http.post(url,this.user)
      .subscribe(res => {
        console.log(res)
      }, (err) => {
        console.log(err);
      });
  }
}
