import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GoogleFitProvider } from '../../providers/google-fit/google-fit';


@IonicPage()
@Component({
  selector: 'page-health-status-resume',
  templateUrl: 'health-status-resume.html',
})
export class HealthStatusResumePage {

  health: boolean;
  calories: any[];
  total_calories: number = 0;
  steps: any[];
  total_steps: number = 0;
  heart_rates: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public googleFitProvider: GoogleFitProvider
    ) {
      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthStatusResumePage');
    this.health = this.navParams.get('health');
      console.log('Conectado con Google Fit: '+this.health);
      if(this.health=true){
        this.presentToast('Obtenga datos desde Google Fit');
        this.getHealthData();
        this.getHeartRate();
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
    });
    this.googleFitProvider.getStepsFromHealth().then(steps=>{
      this.steps = steps;
      for(var st = 0; st < this.steps.length; st++){
        this.total_steps = this.total_steps+this.steps[st].value;
      }
    });    
  }

  getHeartRate() {
    this.googleFitProvider.getHeartRateFromHealth().then(rates=>{
      this.heart_rates = rates;
      console.table(this.heart_rates);
    });    
  }

}


//"Hello, this is Mike (example)".replace(/ *\([^)]*\) */g, "");

//Result
//"Hello, this is Mike"