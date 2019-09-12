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
        alert('Obteniendo datos desde Google Fit');
        this.getHealthData();
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
      console.log(this.calories);
      console.log(this.calories.length);
      for(var cal = 0; cal < this.calories.length; cal++){
        console.log(this.calories[cal].value);
        this.total_calories = Math.round(this.total_calories+this.calories[cal].value) 
      }
    });
    this.googleFitProvider.getStepsFromHealth().then(steps=>{
      this.steps = steps;
      console.log(this.steps);
      console.log(this.steps.length);
      for(var st = 0; st < this.steps.length; st++){
        console.log(this.steps[st].value);
        this.total_steps = this.total_steps+this.steps[st].value;
      }
    })
  }

}
