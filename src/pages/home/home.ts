import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController, NavParams, Platform } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { InitialPage } from '../initial/initial';
import { ConfigurationPage } from '../configuration/configuration';
import { TasksService } from '../../providers/tasks-service/tasks-service';
import { SQLite } from '@ionic-native/sqlite';
import { StepsDbProvider } from '../../providers/steps-db/steps-db';
import { CaminataPage } from '../caminata/caminata';
import { SaltosPage } from '../saltos/saltos';
import { JumpDbProvider } from '../../providers/jump-db/jump-db';
import { LoadDatabasePage } from '../load-database/load-database';
import { AbdominalesPage } from '../abdominales/abdominales';
import { User } from '../../models/user';
import { AnguarFireProvider } from '../../providers/anguar-fire/anguar-fire';
import { ProfilePage } from '../profile/profile';
import { HealthStatusResumePage } from '../health-status-resume/health-status-resume';
import { GoogleFitProvider } from '../../providers/google-fit/google-fit';
import { ExercisesPage } from '../exercises/exercises';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  jump_tasks: any[] = [];
  steps_tasks: any[] = [];

  warning: string;

  supervisionButton : boolean = true;
  disabled_sa: boolean = false;
  disabled_ab: boolean = false;
  disabled_se: boolean = false;
  disabled_ca: boolean = false;

  public accX:any;
  public accY:any;
  public accZ:any;

  n=35;

  n1: number = -3;
  n2: number = 10;
  n3: number = 10;

  lat: number;
  lng: number;

  steps_entries: number = 0;
  steps_entries_boolean: boolean = false;
  jumps_entries: number = 0;
  jumps_entries_boolean: boolean = false;

  afUser = this.afAuth.auth.currentUser
  user = {} as User;
  uid: any;

  requiereUpdate: any;
  versionApp = '0.1.0.5';
  health : boolean;
  updateUserLoader: any;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public tasksService: TasksService,
    public stepsDbService: StepsDbProvider,
    public jumpDbService: JumpDbProvider,
    public sqlite: SQLite,
    public afProvider: AnguarFireProvider,
    public googleFitProvider: GoogleFitProvider
    ) {
      
      
  }

  ionViewDidLoad(){
    this.user.nickName = null;
    this.user.weight = null;
    this.user.height = null;
    this.uid = this.afUser.uid;
    this.afProvider.getUserInfo(this.uid).valueChanges().subscribe(user=>{
      let usr : any = user
      this.user.name = usr.name;
      this.user.weight = usr.weight;
      this.user.height = usr.height;
      console.log(user);
      if(
        !this.user.weight||
        !this.user.height){
        //var edit : boolean = true;
        const alert = this.alertCtrl.create({
          title: 'Agregue su peso y altura',
          inputs: [
            {
              name: 'weight',
              placeholder: 'Peso en Kg',
              type: 'number'
            },
            {
              name: 'height',
              placeholder: 'Altura en metros',
              type: 'number'
            }
          ],
          buttons: [
            {
              text: 'Ok',
              handler: data => {
                if (data.weight, data.height) {
                  this.user.lastExerciceLoad = Math.trunc(Date.now()*0.5);
                  this.user.lastRateSolicitude = new Date(new Date().getTime()).toString();
                  this.user.weight = data.weight;
                  this.user.height = data.height;
                  this.afProvider.updateUserData(this.uid, this.user);
                  if(this.platform.is('cordova')){
                    this.accesToHealth();
                  }
                  
                } else {
                  this.alertIfNotData();
                  alert.present();
                  return false;
                }
              }
            }
          ]
        });
        alert.present();
        //this.navCtrl.setRoot(EditProfilePage, {edit:edit, uid: this.uid});
      }else{
        this.toast(this.user.name);
        if(this.platform.is('cordova')){
          this.accesToHealth();
        }
      }
    });      
    
    this.afProvider.requiereUpdateApp().valueChanges().subscribe(requiereUpdate=>{
      this.requiereUpdate = requiereUpdate;
      if(this.requiereUpdate.requiere==='0.1.0.5'){
        console.log('No requiere actualizar');
        
      }else{
        this.requiereUpdateAppFunction()
      }
    });
    
  }

  alertIfNotData(){
    alert('Rellene los datos')
  }

  accesToHealth(){
    let loading = this.loadingCtrl.create({
      content: 'Conectando con Google Fit'
    });
    loading.present();
    this.googleFitProvider.accesToHealth()
    .then(available=>{
      if(available){
        this.health=true;
        this.googleFitProvider.getPermissionToHealthData();
        loading.dismiss();
      }else{
        this.health=false;
        var alert = this.alertCtrl.create({
          title: 'No habrá conexión con datos de Google Fit',
          buttons: [
            {
              text: 'Ok',
              role: 'ok',
              handler(){
                loading.dismiss();
              }
            }
          ]
        });
        alert.present();
      }
    })
    .then(()=>{
      console.log(this.health)
    })
  }

  
  logout(){
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: 'Saldrá de la sesión de la aplicación',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.loadLogout();
            this.afAuth.auth.signOut().then(()=>{
              this.navCtrl.setRoot(InitialPage)
            })
          }
        }
      ]
    });
    alert.present()
    
  }

  toast(nickName){
    const toast = this.toastCtrl.create({
           message: 'Bienvenido '+nickName,
           duration: 2000,
           position: 'bottom'
         });
      
         toast.onDidDismiss(() => {
           console.log('It is Ok');
         });
      
         toast.present();
  }

  toOptionPage(){
    this.navCtrl.push(ConfigurationPage)
  }

  toProfilePage(){
    //alert('Página de Perfil de Usuario en desarrollo')
    //this.navCtrl.push(ProfilePage, {uid: this.uid, nickName: this.user.nickName})
    this.navCtrl.push(ProfilePage);
  }

  toExercicesList(){
    this.navCtrl.push(ExercisesPage, {uid:this.uid});
  }

  toHealthPage(){
    this.navCtrl.push(HealthStatusResumePage, {health:this.health, uid:this.uid})
  }

  toStepsPage(){
    this.navCtrl.push(CaminataPage);
  }

  toJumpPage(){
    this.navCtrl.push(SaltosPage);
  }

  toABSPage(){
    this.navCtrl.push(AbdominalesPage);
  }

  loadUpdateUserData() {
    this.updateUserLoader = this.loadingCtrl.create({
      content: "Actualizando datos...",
    });
    this.updateUserLoader.present();
  }


  loadLogout() {
    const loader = this.loadingCtrl.create({
      content: "Cerrando Sesión",
      duration: 2000
    });
    loader.present();
  }


  ////////// +++++++++ LIMPIEZA DE BASE DE DATOS +++++++++ //////////

  requiereUpdateAppFunction(){

    let alert = this.alertCtrl.create({
      title: 'Actualice la aplicación',
      message: 'Su versión es '+this.versionApp+', actualice la aplicación a la versión '+this.requiereUpdate.requiere,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.afAuth.auth.signOut().then(()=>{
              this.navCtrl.setRoot(InitialPage);
            })
          }
        },
        {
          text: 'OK',
          handler: () => {
            window.open("https://github.com/GonzaloUNAB2018/healthy/tree/master/apk");
          }
        }
      ]
    });
    alert.present()
  }
  
  loadDb(){
    this.navCtrl.push(LoadDatabasePage, {uid:this.uid});
  }

  
}