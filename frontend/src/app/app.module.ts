import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterPage } from '../pages/register/register';
import { UserService } from './service/user.service';
import { BaseService } from './service/base.service';
import { AdminCPPage } from '../pages/admincp/admincp';
import { LoginPage } from '../pages/login/login';
import { UserPanelPage } from '../pages/userpanel/userpanel';
import { AttendanceService } from './service/attendance.service';
import { ViewattendancePage } from '../pages/viewattendance/viewattendance';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    AdminCPPage,
    LoginPage,UserPanelPage,ViewattendancePage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    AdminCPPage,
    LoginPage,UserPanelPage,ViewattendancePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BaseService,UserService,AttendanceService
  ]
})
export class AppModule {}
