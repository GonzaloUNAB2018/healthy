import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { JumpDbProvider } from '../../providers/jump-db/jump-db';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-saltos',
  templateUrl: 'saltos.html',
})
export class SaltosPage {

  public l_accX: any = 0;
  public l_accY: any = 0;
  public l_accZ: any = 0;
  jumps_tasks : any [] = []
  private interval: any;
  private seconds: number = 0;
  public time: string = '00:00';
  public showSeconds: boolean = true;
  i : any;
  cdown_ok: boolean;
  cdown: any;
  cdown_ss: number = 5;
  date: string;
  hour: string;
  w: any;
  public workstarted: boolean = false;
  today: any;
  save_time: string;
  excercise = {
    id: null
  };

  constructor(
    public navCtrl: NavController, 
    public platform: Platform,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private jumpsDbService: JumpDbProvider,
    private deviceMotion: DeviceMotion,
    private backgroundMode: BackgroundMode

    ) {

      
  }

  ionViewDidLoad() {
    this.countDown()
  }

  ionViewCanLeave(): boolean{
    console.log(this.workstarted)
    if(this.workstarted===true){
      return false;
    }else if(this.workstarted===false){
      return true;
    };
  };

  stopAll(){
    this.workstarted = false;
    this.stop();
    setTimeout(() => {
      this.navCtrl.popToRoot();
    }, 1000);
  };

  countDown(){
    this.cdown_ok = true;
    this.cdown = setInterval(()=>{
      this.cdown_ss=this.cdown_ss-1;
      if(this.cdown_ss<1){
        this.stopCountDown();
        this.start();
        if(this.platform.is('cordova')){
          this.initJump();
        }
        this.cdown_ok=false;
      }
    },1000);
  };

  stopCountDown(){
    this.excercise.id = Math.trunc(Date.now()*0.5);
    clearInterval(this.cdown);
  };

  start() {
    this.time = '00:00'
    this.interval = window.setInterval(() => {
      this.seconds++;
      this.time = this.getTimeFormatted();
      document.getElementById('time').innerHTML=this.time;
      if(this.platform.is('cordova')){
        this.backgroundMode.configure({
          title: '¡Saltos!',
          text: this.time+' Presione notificación para continuar',
          color: 'primary',
          hidden: false,
          bigText: true,
        });
      };
    }, 1000);
    this.bgNotify();
  };

  bgNotify(){
    
    if(this.platform.is('cordova')){
      this.backgroundMode.enable();
      if(this.backgroundMode.isEnabled()){
        this.backgroundMode.on('enable')
      }else{
      }
    }
  };

  stopNotify(){
    if(this.platform.is('cordova')){
      this.backgroundMode.disable();
    }
  }

  

  stop() {
    this.stopNotify();
    window.clearInterval(this.interval);
    this.seconds = 0;
    if(this.platform.is('cordova')){
      this.stopJump();
    }    
  };

  

  

  getTimeFormatted() {
    var hours   = Math.floor(this.seconds / 3600);
    var minutes = Math.floor((this.seconds - (hours * 3600)) / 60);
    var seconds = this.seconds - (hours * 3600) - (minutes * 60);

    var hours_st = hours.toString();
    var minutes_st = minutes.toString();
    var seconds_st = seconds.toString();
    if (hours   < 10) {
      hours_st   = "0" + hours.toString();
    }
    if (minutes < 10) {
      minutes_st = "0" + minutes.toString();
    }
    if (seconds < 10) {
      seconds_st = "0" + seconds.toString();
    }

    var formatted_time = '';
    if (hours > 0) {
      formatted_time += hours_st + ':';
    }
    formatted_time += minutes_st;
    if (this.showSeconds) {
      formatted_time += ':' + seconds_st;
    }
    return formatted_time;
  }

  

  

  dateTime(){
    var myDay = new Date()
    var m = myDay.getMonth()+1
    this.save_time = myDay.getDate()+'-'+m+'-'+myDay.getFullYear()
    /*var today = new Date();
    var seg = Number(today.getSeconds());
    var ss = String(today.getSeconds());
    var min = Number(today.getMinutes());
    var mi = String(today.getMinutes());
    var hh = String(today.getHours());
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1); //January is 0!
    var yyyy = today.getFullYear();
    this.date = yyyy+'-'+mm+'-'+dd;
    if(min>=0&&min<10){
      mi = 0+mi
    };
    if(seg>=0&&seg<10){
      ss = 0+ss
    };
    this.hour = hh+':'+mi+':'+ss;*/

  }

  initJump(){

    this.w = this.deviceMotion.watchAcceleration({frequency: 500}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.l_accX = acceleration.x;
      this.l_accY = acceleration.y;
      this.l_accZ = acceleration.z;
      this.today = new Date().toString(); 
      this.dateTime();
      var data_jump = {
        eid : this.excercise.id,
        id : Date.now(),
        date : this.today,
        save_time: this.save_time,
        type : 'Saltos',
        x : this.l_accX,
        y : this.l_accY,
        z : this.l_accZ,
      }
      this.jumpsDbService.create(data_jump).then(response => {
        this.jumps_tasks.unshift( data_jump );
      })
    });

  }

  stopJump(){
    this.loadStopGetData();
    this.w.unsubscribe();
  }

  loadInitGetData() {
    const loader = this.loadingCtrl.create({
      content: "Iniciando toma de datos...",
      duration: 1000
    });
    loader.present();
  }

  loadStopGetData() {
    const loader = this.loadingCtrl.create({
      content: "Finalizando toma de datos...",
      duration: 1000
    });
    loader.present();
  }


}
