import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { GoogleFitProvider } from '../../providers/google-fit/google-fit';
import { AnguarFireProvider } from '../../providers/anguar-fire/anguar-fire';
import { User } from '../../models/user';

@Component({
  selector: 'page-health-status-resume',
  templateUrl: 'health-status-resume.html',
})
export class HealthStatusResumePage {

  uid: any;
  health: boolean;
  calories: any[];
  total_calories: number = 0;
  steps: any[];
  total_steps: number = 0;
  heart_rates: any[] = null;
  newDate : any;
  user = {} as User;
  fbUser : any;
  loading: any;
  loadingData: any;
  loadingToSync: any;
  totalRateList : number = 0;
  afRateList : number = 0;
  hableSync : boolean = false;
  pendentText : string = 'Esperando solicitud de registro de Pulsaciones'
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl : LoadingController,
    public googleFitProvider: GoogleFitProvider,
    public afProvider: AnguarFireProvider,
    ) {
      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthStatusResumePage');
    this.uid = this.navParams.get('uid');
    this.health = this.navParams.get('health');
      console.log('Conectado con Google Fit: '+this.health);
      if(this.health=true){
        this.presentToast('Obtenga datos desde Google Fit');
        this.getHealthData();
        this.afProvider.getUserInfo(this.uid).valueChanges().subscribe(user=>{
          this.fbUser = user;
        })
      }else{
        this.presentToast('No puede obtener datos desde Google Fit');
        this.navCtrl.pop();
      }
  }

  presentToast(commit: string) {
    const toast = this.toastCtrl.create({
      message: commit,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }

  getHealthData(){
    this.googleFitProvider.getCaloriesFromHealth().then(calories =>{
      this.calories = calories;
      for(var cal = 0; cal < this.calories.length; cal++){
        this.total_calories = Math.round(this.total_calories+this.calories[cal].value) 
      }
    }).catch(e=>{
      this.navCtrl.pop();
      alert(e);
    });
    this.googleFitProvider.getStepsFromHealth().then(steps=>{
      this.steps = steps;
      for(var st = 0; st < this.steps.length; st++){
        this.total_steps = this.total_steps+this.steps[st].value;
      }
    }).catch(e=>{
      this.navCtrl.pop();
      alert(e);
    })   
  }

  getHeartRate() {
    this.loadOne();
    let usr: any;
    setTimeout(() => {
      this.afProvider.getUserInfo(this.uid).valueChanges().subscribe(user=>{
        usr = user;
        console.log(usr.lastRateSolicitude);
        /*if(usr.lastRateSolicitude === undefined){
          this.newDate = new Date(new Date().getTime() - 728 * 24 * 60 * 60 * 1000); //DOS AÑOS
        }else{
          this.newDate = new Date(usr.lastRateSolicitude);
        };*/
        this.newDate = new Date(usr.lastRateSolicitude);
        console.log(this.newDate);
        if(this.newDate !== undefined){
          console.log('Si newDate no es indefinido: '+ this.newDate);
          //this.gfH_Rate(this.newDate, usr);
            this.googleFitProvider.getHeartRateFromHealth(this.newDate).then(rates =>{
              this.heart_rates = rates;
              console.log(this.heart_rates);
              if(this.heart_rates){
                this.loadingData.dismiss();
                this.totalRateList = this.heart_rates.length;
                if(this.totalRateList>0){
                  this.pendentText = 'Existen '+this.totalRateList+' registros pendientes';
                  this.hableSync = true;
                }else{
                  this.pendentText = 'Sin registros pendientes';
                }
              }
            }).catch(e=>{
              console.log(e)
              this.navCtrl.pop();
              alert(e);
            });
            setTimeout(() => {
              if(this.heart_rates===null){
                this.loadingData.dismiss();
                this.navCtrl.pop();
                alert('Exceso de tiempo de respuesta. Intente nuevamente.');
              }
            }, 10000);
        }else{
          this.loadingData.dismiss();
          alert('Error');
          this.navCtrl.pop();
        }
      });
    }, 1000);

  }

  gfH_Rate(){
    this.loadTwo();
    setTimeout(() => {
      console.log(this.newDate);
    //this.googleFitProvider.getHeartRateFromHealth(this.newDate).then(rates=>{
      //this.heart_rates = rates;
      if(this.heart_rates){
        this.totalRateList = this.heart_rates.length;
        console.log(this.totalRateList);
        if(this.totalRateList > 0){
          let h_r = {
            startDate: null,
            endDate: null,
            id: null,
            value: null,
            unit: null,
            height: null,
            weight: null
          };
          h_r.height = this.fbUser.height;
          h_r.weight = this.fbUser.weight;
          for(var h : number = 0; h < this.totalRateList; h++){
            console.log(h);
            h_r.endDate = this.heart_rates[h].endDate.toString();
            h_r.startDate = this.heart_rates[h].startDate.toString();
            h_r.id = Date.now();
            h_r.value = this.heart_rates[h].value;
            h_r.unit = this.heart_rates[h].unit;
            console.log(h_r);
            this.afProvider.userHearthRateSetLastData(this.uid, h_r);
            if(h === this.totalRateList - 1){
              this.loadingToSync.dismiss();
              console.log('el último: '+h);
              console.log(h_r);
              this.user.lastRateSolicitude = new Date().toString();
              this.afProvider.updateUserData(this.uid, this.user);
              //this.navCtrl.pop();
              break;
            };
          };
        };
      };
      this.hableSync = false;
    /*}).catch(e=>{
      this.navCtrl.pop();
      this.hableSync = false;
      alert(e);
    })*/
    }, 1000);
  }

  loadOne(){
    this.loadingData = this.loadingCtrl.create({
           content: 'Obteniendo información, espere por favor',
         });
         this.loadingData.present();
  }

  loadTwo(){
    this.loadingToSync = this.loadingCtrl.create({
           content: 'Cargando a Base de datos. Puede demorar algunos minutos',
         });
         this.loadingToSync.present();
  }

}


//"Hello, this is Mike (example)".replace(/ *\([^)]*\) */g, "");

//Result
//"Hello, this is Mike"