import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { ABSDbProvider } from '../../providers/ABS-db/ABSs-db';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Gyroscope, GyroscopeOrientation } from '@ionic-native/gyroscope';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-abdominales',
  templateUrl: 'abdominales.html',
})
export class AbdominalesPage {
  
  public l_accX: any = 0;
  public l_accY: any = 0;
  public l_accZ: any = 0;
  public g_accX: any = 0;
  public g_accY: any = 0;
  public g_accZ: any = 0;
  ABSs_tasks : any [] = [];
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
    private ABSsDbService: ABSDbProvider,
    private deviceMotion: DeviceMotion,
    public gyroscope: Gyroscope,
    private backgroundMode: BackgroundMode
    ) {
    
  }

  ionViewDidLoad() {
    this.countDown()
  };

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
          this.initABS();
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
    this.workstarted = true;
    this.interval = window.setInterval(() => {
      this.seconds++;
      this.time = this.getTimeFormatted();
      document.getElementById('time').innerHTML=this.time;
      if(this.platform.is('cordova')){
        this.backgroundMode.configure({
          title: '¡Abdominales!',
          text: this.time+' Presione notificación para continuar',
          color: 'primary',
          hidden: false,
          bigText: true,
        });
      }
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
  };

  stop() {
    this.stopNotify();
    window.clearInterval(this.interval);
    this.seconds = 0;
    if(this.platform.is('cordova')){
      this.stopABS();
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

  };

  initABS(){
    this.w = this.deviceMotion.watchAcceleration({frequency: 500})
    .subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.l_accX = acceleration.x;
      this.l_accY = acceleration.y;
      this.l_accZ = acceleration.z;
      this.gyroscope.getCurrent().then((orientation: GyroscopeOrientation) => {
        this.g_accX = orientation.x;
        this.g_accY = orientation.y;
        this.g_accZ = orientation.z;
      }).catch();
      this.today = new Date().toString(); 
      this.dateTime();
      var data_ABS = {
        eid : this.excercise.id,
        id : Date.now(),
        date : this.today,
        save_time: this.save_time,
        type : 'Abdominales',
        x : this.l_accX,
        y : this.l_accY,
        z : this.l_accZ,
        giroscope_x : this.g_accX,
        giroscope_y : this.g_accY,
        giroscope_z : this.g_accZ,
      }
      this.ABSsDbService.create(data_ABS).then(response => {
        this.ABSs_tasks.unshift( data_ABS );
      })
    });

  };

  stopABS(){
    this.loadStopGetData();
    this.w.unsubscribe();
  };

  loadInitGetData() {
    const loader = this.loadingCtrl.create({
      content: "Iniciando toma de datos...",
      duration: 1000
    });
    loader.present();
  };

  loadStopGetData() {
    const loader = this.loadingCtrl.create({
      content: "Finalizando toma de datos...",
      duration: 1000
    });
    loader.present();
  };
  

}
