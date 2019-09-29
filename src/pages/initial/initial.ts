import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { RecoveryPasswordPage } from '../recovery-password/recovery-password';

@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialPage');
  }

  toLoginPage(){
    this.navCtrl.push(LoginPage)
  }

  toRegisterPage(){
    this.navCtrl.push(RegisterPage)
  }

  toRecoveryPasswordPage(){
    this.navCtrl.push(RecoveryPasswordPage)
  }

}
