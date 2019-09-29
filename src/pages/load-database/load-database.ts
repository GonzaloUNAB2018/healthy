import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ABSDbProvider } from '../../providers/ABS-db/ABSs-db';
import { JumpDbProvider } from '../../providers/jump-db/jump-db';
import { StepsDbProvider } from '../../providers/steps-db/steps-db';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AnguarFireProvider } from '../../providers/anguar-fire/anguar-fire';
import { User } from '../../models/user';


@IonicPage()
@Component({
  selector: 'page-load-database',
  templateUrl: 'load-database.html',
})
export class LoadDatabasePage {

  user = {} as User;

  jump_tasks: any[] = [];
  steps_tasks: any[] = [];
  ABS_tasks: any[] = [];

  steps_entries: number = 0;
  steps_entries_boolean: boolean = false;
  jumps_entries: number = 0;
  jumps_entries_boolean: boolean = false;
  ABSs_entries: number = 0;
  ABSs_entries_boolean: boolean = false;
  total_entries: number = 0;

  uid: any = null; 

  fbSteps : any[];
  totalSteps: number = 0;
  fbJumps : any[];
  totalJumps: number = 0;
  fbABS : any[];
  totalABS: number = 0;
  steps: number = null;
  jumps: number = null;
  ABS: number = null;
  totalDataOnFirebase: number = 0;
  openSteps1: boolean = false;
  openSteps2: boolean = false;
  openABS1: boolean = false;
  openABS2: boolean = false;
  openJumps1: boolean = false;
  openJumps2: boolean = false;
  diference: number = 0;

  loadingBar: boolean = false;
  ableButtons: boolean = true;
  

  loadInfo: string = "";
  okLoad1: boolean;
  okLoad2: boolean;
  okLoad3: boolean;
  loadSyncData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public afProvider: AnguarFireProvider,
    public jumpDbService: JumpDbProvider,
    public ABSDbService: ABSDbProvider,
    public stepsDbService: StepsDbProvider,
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {

      //this.uid = this.afAuth.auth.currentUser.uid;
      this.uid = navParams.get('uid')
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadDatabasePage');
    this.getAll();
    this.afProvider.getUserInfo(this.uid).valueChanges().subscribe(usr=>{
      let usr_ : any = usr
      if(usr){
        this.user.lastExerciceLoad = usr_.lastExerciceLoad;
      }
    })
  }

  getAll(){
    this.getABS();
    this.getJumps();
    this.getSteps();
  }

  getABS(){
    this.ABSDbService.getAll()
    .then(ABS_tasks => {
      this.ABS_tasks = ABS_tasks;
      if(this.ABS_tasks.length!=0){
        this.ABSs_entries = this.ABS_tasks.length;
        console.log(this.ABS_tasks);
        this.ABSs_entries_boolean = true;
        this.openABS1 = true
      }else{
        console.log('No existen datos de abdominales por sincronizar');
        this.ABSs_entries = 0;
        this.ABSs_entries_boolean = false;
        this.openABS2=true;
      }
    })
    .catch( error => {
      console.error( error );
    });
  }

  getSteps(){
    this.stepsDbService.getAll()
    .then(steps_tasks => {
      this.steps_tasks = steps_tasks;
      if(this.steps_tasks.length!=0){
        console.log(this.steps_tasks)
        this.steps_entries = this.steps_tasks.length
        this.steps_entries_boolean = true;
        this.openSteps1 = true;
      }else{
        console.log('No existen datos de caminata por sincronizar');
        this.steps_entries = 0;
        this.steps_entries_boolean = false;
        this.openSteps2 = true;
      }
    })
    .catch( error => {
      console.error( error );
    });
  }

  getJumps(){
    this.jumpDbService.getAll()
    .then(jump_tasks => {
      this.jump_tasks = jump_tasks;
      if(this.jump_tasks.length!=0){
        console.log(this.jump_tasks)
        this.jumps_entries = this.jump_tasks.length;
        this.jumps_entries_boolean = true;
        this.openJumps1 = true
      }else{
        console.log('No existen datos de saltos por sincronizar');
        this.jumps_entries = 0;
        this.jumps_entries_boolean = false;
        this.openJumps2 = true
      }
    })
    .catch( error => {
      console.error( error );
    });
  }

  


  syncDb(){
    let alert = this.alertCtrl.create({
      title: 'SINCRONIZAR INFORMACION',
      message: 'Se sincronizará sus datos',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.cancelToast();
            console.log('Se cancela borrado');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.ableButtons = false;
            //this.loadNewSync();
            setTimeout(()=>{
              this.okLoadToDatabase();
            },300);
          }
        }
      ]
    });
    alert.present();
  }

  move(){
    
    var elem = document.getElementById('myBar');
    var width = 1;
    var id = setInterval(()=>{
      if (width >= 100) {
        clearInterval(id);
        this.loadInfo = 'Datos sincronizados exitosamente';
        this.okToast();
        this.ableButtons = true;
      } else {
        width++; 
        elem.style.width = width + '%';
        this.loadInfo = 'Sincronizando datos...';
        this.loadSyncData.dismiss();
      }  
    }, 10);
  }

  okLoadToDatabase(){
    this.okLoad1 = false;
    this.okLoad2 = false;
    this.okLoad3 = false;
    this.user.lastExerciceLoad = Math.trunc(Date.now()*0.5);
    this.afProvider.updateUserData(this.uid, this.user);
    let loadSyncData = this.loadingCtrl.create({
      content: 'Calculando datos...',
    });
 
    loadSyncData.present();
    if(this.steps_tasks.length!=0||this.ABS_tasks.length!=0||this.jump_tasks.length!=0){
      
      for(var s = 0;s<this.steps_entries;s++) {
        console.log(this.steps_tasks[s].eid);
        let exer = this.steps_tasks[s].eid;
        if(exer>this.user.lastExerciceLoad){
          this.afProvider.updateStepsData(this.uid, this.steps_tasks[s]);
        };
        if(s===this.steps_entries){
          this.okLoad1 = true;
        }
      };
      for(var a = 0;a<this.ABSs_entries;a++) {
        console.log(this.ABS_tasks[a].eid);
        let exer = this.ABS_tasks[a].eid;
        if(exer>this.user.lastExerciceLoad){
          this.afProvider.updateABSData(this.uid, this.ABS_tasks[a]);
        };
        if(a===this.ABSs_entries){
          this.okLoad2 = true;
        }
      };
      for(var j = 0;j<this.jumps_entries;j++) {
        console.log(this.jump_tasks[j].eid);
        let exer = this.jump_tasks[j].eid;
        if(exer>this.user.lastExerciceLoad){
          this.afProvider.updateJumpData(this.uid, this.jump_tasks[j]);
        };
        if(j===this.jumps_entries){
          this.okLoad3 = true;
        }
      };

      if(this.steps_tasks.length===0){

      }else{
        var stepsinfo = {
          tipo: 'Caminata',
          id: '001'
        }
        this.afProvider.updateStepsInfo(this.uid, stepsinfo);
      }
      if(this.jump_tasks.length===0){

      }else{
        var jumpsinfo = {
          tipo: 'Saltos',
          id: '002'
        }
        this.afProvider.updateJumpInfo(this.uid, jumpsinfo);
      }
      if(this.ABS_tasks.length===0){

      }else{
        var ABSinfo = {
          tipo: 'Abdominales',
          id: '003'
        }
        this.afProvider.updateABSInfo(this.uid, ABSinfo);
      }
      if(this.okLoad1===true&&this.okLoad2===true&&this.okLoad3===true){
        loadSyncData.dismiss();
      }
      /*this.move();
      console.log(this.steps_tasks.length+this.ABS_tasks.length+this.jump_tasks.length)
      for(var s = 0;s<this.steps_entries;s++) { 
        console.log(this.steps_tasks[s].time);
        this.afDb.object('Pacientes/'+this.uid+'/Ejercicios/Caminata/Datos/'+this.steps_tasks[s].id).update(this.steps_tasks[s]);
      }
      for(var j = 0;j<this.jumps_entries;j++) { 
        console.log(this.jump_tasks[j].time);
        this.afDb.object('Pacientes/'+this.uid+'/Ejercicios/Saltos/Datos/'+this.jump_tasks[j].id).update(this.jump_tasks[j]);
      }
      for(var a = 0;a<this.ABSs_entries;a++) {
        console.log(this.ABS_tasks[a].time);
        this.afDb.object('Pacientes/'+this.uid+'/Ejercicios/Abdominales/Datos/'+this.ABS_tasks[a].id).update(this.ABS_tasks[a]);
      }
      if(this.steps_tasks.length===0){

      }else{
        var stepsinfo = {
          tipo: 'Caminata',
          id: '001'
        }
        this.afService.updateStepsInfo(this.uid, stepsinfo);
      }
      if(this.jump_tasks.length===0){

      }else{
        var jumpsinfo = {
          tipo: 'Saltos',
          id: '002'
        }
        this.afService.updateJumpInfo(this.uid, jumpsinfo);
      }
      if(this.ABS_tasks.length===0){

      }else{
        var ABSinfo = {
          tipo: 'Abdominales',
          id: '003'
        }
        this.afService.updateABSInfo(this.uid, ABSinfo);
      }*/
    }else{
      alert('Nada que sincronizar');
      this.loadSyncData.dismiss()
    }
  }

  cancelToast() {
    const toast = this.toastCtrl.create({
      message: 'Sincronización cancelada',
      duration: 1000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  okToast() {
    const toast = this.toastCtrl.create({
      message: 'Sincronización exitosa',
      duration: 1000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present()
  }

  noLoadToast() {
    const toast = this.toastCtrl.create({
      message: 'Nada que sincronizar',
      duration: 1000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present()
  }

  load(){
    const loading = this.loadingCtrl.create({
       content: 'Please wait...',
       duration: 2000
     });
  
     loading.present();

     setTimeout(() => {
      this.okToast();
      loading.dismiss();
    }, 1300);
  }

  loadNewSync(){
    this.loadSyncData = this.loadingCtrl.create({
       content: 'Calculando datos...',
     });
  
     this.loadSyncData.present();
  }

  

}
