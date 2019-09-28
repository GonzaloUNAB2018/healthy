import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { AnguarFireProvider } from '../../providers/anguar-fire/anguar-fire'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  changePage: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    public afProvider: AnguarFireProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ionViewCanLeave(): boolean{
    if(this.changePage === true){
       return true;
     } else if(this.changePage === false) {
       return false;
     }
   }

  registre(){
    if(this.user.email != null){
      if(this.user.password != null){
        if(this.user.confirm_password != null){
          if(this.user.name&&this.user.surname&&this.user.dateBirth&&this.user.sex&&this.user.phone){
            if(this.user.password === this.user.confirm_password){
              this.changePage = false;
              const loader = this.loadingCtrl.create({
                content: "Registrando Usuario...",
              });
              loader.present();
              this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(user=>{
                if(user){
                  this.user.uid = this.afAuth.auth.currentUser.uid;
                  this.afProvider.updateUserData(this.user.uid, this.user);
                  this.afAuth.auth.signOut().then(()=>{
                    this.changePage = true;
                    this.navCtrl.pop();
                  })
                }
              })
            }else{
              alert('Contraseñas ingresadas no coinciden. Intente nuevamente')
            }
          }else{
            alert('Faltan datos')
          }
        }else{
          alert('Ingrese de nuevo la contraseña')
        }
      }else{
        alert('Ingrese una contraseña')
      }
    }else{
      alert('Ingrese email')
    }
    
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }


}
