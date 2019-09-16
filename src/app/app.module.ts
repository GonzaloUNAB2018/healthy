import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from "angular-progress-bar"



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DeviceMotion } from '@ionic-native/device-motion';
//import { Sensors } from '@ionic-native/sensors'
import { SQLite } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { Stepcounter } from '@ionic-native/stepcounter';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Gyroscope } from '@ionic-native/gyroscope'
import { Health } from '@ionic-native/health';
import { Camera } from '@ionic-native/camera';

//FIREBASE
import {firebase} from './firebase.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Providers
import { TasksService } from '../providers/tasks-service/tasks-service';
import { StepsDbProvider } from '../providers/steps-db/steps-db';
import { JumpDbProvider } from '../providers/jump-db/jump-db';
import { ABSDbProvider } from '../providers/ABS-db/ABSs-db';
import { AnguarFireProvider } from '../providers/anguar-fire/anguar-fire';

//Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { ResetPassPageModule } from '../pages/reset-pass/reset-pass.module';
import { InitialPageModule } from '../pages/initial/initial.module';
import { CaminataPageModule } from '../pages/caminata/caminata.module';
import { SaltosPageModule } from '../pages/saltos/saltos.module';
import { AbdominalesPageModule } from '../pages/abdominales/abdominales.module';
import { HealthStatusResumePageModule } from '../pages/health-status-resume/health-status-resume.module';
import { ConfigurationPageModule } from '../pages/configuration/configuration.module';
import { LoadDatabasePageModule } from '../pages/load-database/load-database.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { GoogleFitProvider } from '../providers/google-fit/google-fit';
import { HealthDbProvider } from '../providers/health-db/health-db';
import { EditProfilePageModule } from '../pages/edit-profile/edit-profile.module';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
  ],
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginPageModule,
    RegisterPageModule,
    ResetPassPageModule,
    InitialPageModule,
    CaminataPageModule,
    SaltosPageModule,
    AbdominalesPageModule,
    ConfigurationPageModule,
    LoadDatabasePageModule,
    ProfilePageModule,
    EditProfilePageModule,
    HealthStatusResumePageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ProgressBarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceMotion,
    Gyroscope,
    TasksService,
    SQLite,
    Geolocation,
    StepsDbProvider,
    ABSDbProvider,
    JumpDbProvider,
    Stepcounter,
    AnguarFireProvider,
    BackgroundMode,
    Health,
    GoogleFitProvider,
    HealthDbProvider,
    Camera
  ]
})
export class AppModule {}
