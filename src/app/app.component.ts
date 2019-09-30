import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InitialPage } from '../pages/initial/initial';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../pages/home/home';

import { SQLite } from '@ionic-native/sqlite';
import { TasksService } from '../providers/tasks-service/tasks-service';
import { StepsDbProvider } from '../providers/steps-db/steps-db';
import { JumpDbProvider } from '../providers/jump-db/jump-db';
import { ABSDbProvider } from '../providers/ABS-db/ABSs-db';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage:any = InitialPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public tasksService: TasksService,
    public stepsDbService: StepsDbProvider,
    public jumpDbService: JumpDbProvider,
    public ABSDbService: ABSDbProvider,
    //public sqlite: SQLite,
    private afAuth: AngularFireAuth,
    
    ) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.afAuth.auth.onAuthStateChanged(user=>{
          if(user){
            this.nav.setRoot(HomePage);
          }else{
            this.nav.setRoot(InitialPage);
          }
        });
        this.splashScreen.hide();
    });
  }

}
