import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';

@Component({
  selector: 'page-recovery-password',
  templateUrl: 'recovery-password.html',
})
export class RecoveryPasswordPage {


  user = {} as User

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoveryPasswordPage');
  }

  recoveryPssw(){
    this.afAuth.auth.sendPasswordResetEmail(this.user.email).then(()=>{
      this.navCtrl.pop();
      let toast = this.toastCtrl.create({
        message: 'Se ha enviado correo eletrónico a '+this.user.email,
        duration: 3000
      });
      toast.present();
    })
  }

}
