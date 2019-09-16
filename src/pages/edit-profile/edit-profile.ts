import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AnguarFireProvider } from '../../providers/anguar-fire/anguar-fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user = {} as User;
  usr : Observable<any>;
  edit: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider : AnguarFireProvider,
    private afAuth : AngularFireAuth,
    public loadingCtrl : LoadingController,
    public toastCtrl : ToastController
    ) {

      this.user.uid = this.navParams.get('uid');
      this.edit = this.navParams.get('edit');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.getUserData();
  }

  getUserData(){
    this.usr = this.afProvider.getUserInfo(this.user.uid).valueChanges();
  }

  editUserData(){
    const load = this.loadingCtrl.create({
      content : 'Editando datos...',
    });

    load.present();
    this.afProvider.updateUserData(this.user.uid, this.user);
    if(this.edit){
      this.navCtrl.setRoot(HomePage).then(()=>{
        load.dismiss().then(()=>{
          const toast = this.toastCtrl.create({
            message: 'Datos editados',
            duration: 1000
          });
          toast.present();
        })
      })
    }else{
      this.navCtrl.pop().then(()=>{
        load.dismiss().then(()=>{
          const toast = this.toastCtrl.create({
            message: 'Datos editados',
            duration: 1000
          });
          toast.present();
        })
      })
    }
    
  }



}
