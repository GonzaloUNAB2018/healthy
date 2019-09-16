import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnguarFireProvider } from '../../providers/anguar-fire/anguar-fire';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
//import { GoogleFitProvider } from '../../providers/google-fit/google-fit';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EditProfilePage } from '../edit-profile/edit-profile';
//import { SQLite } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  uid: any;
  userFromFB : Observable<any>;
  user = {} as User;
  usr: any;
  profilePhoto : string;
  age: any;
  userAge: string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afProvider: AnguarFireProvider,
    public afAuth: AngularFireAuth,
    public camera: Camera,
    //public sql: SQLite
    ) {
      this.uid = this.afAuth.auth.currentUser.uid
      this.userFromFB = this.afProvider.getUserInfo(this.uid).valueChanges();
      this.afProvider.getUserInfo(this.uid).valueChanges().subscribe(user=>{
        this.usr = user;
        if(!this.usr.profilePhoto){
          this.profilePhoto = './assets/imgs/blank_profile.png';
        }else{
          this.profilePhoto = this.usr.profilePhoto;
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getProfilePhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.profilePhoto = 'data:image/jpeg;base64,' + imageData;
     this.user.profilePhoto = this.profilePhoto;
    }, (err) => {

    }).then(()=>{
      this.afProvider.updateUserData(this.uid, this.user);
    })
    
  }

  toEditProfilePage(){
    this.navCtrl.push(EditProfilePage, {uid: this.uid});
  }
  
}
