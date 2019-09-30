import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import { AnguarFireProvider } from '../../providers/anguar-fire/anguar-fire';
import { validate } from 'rut.js';

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

  registre(){
    if(this.user.email != null){
      if(this.user.password != null){
        if(this.user.confirm_password != null){
          if(this.user.name&&this.user.surname&&this.user.dateBirth&&this.user.sex&&this.user.phone&&this.user.weight&&this.user.height){
            if(this.user.phone.toString().length >= 9){
              if(this.user.run){
                if(validate(this.user.run)){
                  if(this.user.password === this.user.confirm_password){
                    this.changePage = false;
                    const loader = this.loadingCtrl.create({
                      content: "Registrando Usuario...",
                    });
                    loader.present();
                    this.user.phoneNumber = '+56'+this.user.phone;
                    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(user=>{
                      this.afAuth.auth.currentUser.updateProfile({
                        displayName: this.user.name
                      });
                      if(user){
                        this.user.uid = this.afAuth.auth.currentUser.uid;
                        this.afProvider.updateUserData(this.user.uid, this.user);
                        this.afAuth.auth.signOut().then(()=>{
                          loader.dismiss();
                          this.changePage = true;
                          this.navCtrl.pop();
                        }).catch(e=>{
                          loader.dismiss();
                          this.changePage = true;
                          this.navCtrl.pop();
                          alert(e);
                        })
                      }
                    })
                  }else{
                    alert('Contraseñas ingresadas no coinciden. Intente nuevamente');
                  }
                }else{
                  alert('RUN no validado')
                }
              }else{
                alert('Agregar RUN')
              }
            }else{
              alert('Número de teléfono debe contar con 9 dígitos');
            }
          }else{
            alert('Faltan datos');
          }
        }else{
          alert('Ingrese de nuevo la contraseña');
        }
      }else{
        alert('Ingrese una contraseña');
      }
    }else{
      alert('Ingrese email');
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
