import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  ok: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    ) {

      
  }

  ionViewDidLoad() {
    var ok;
    if(ok){
      console.log('Funciona correctamente');
    }else{
      console.log('Error');
    }
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(this.user.email&&this.user.password){
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(user=>{
        if(user){
          loader.dismiss();
          this.navCtrl.setRoot(HomePage);
        }
      }).catch(error=>{
        console.log(error)
      })
    }
  }
  
}
