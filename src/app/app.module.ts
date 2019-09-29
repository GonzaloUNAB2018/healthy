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
//import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

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
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetPassPage } from '../pages/reset-pass/reset-pass';
import { InitialPage } from '../pages/initial/initial';
import { CaminataPage } from '../pages/caminata/caminata';
import { SaltosPage } from '../pages/saltos/saltos';
import { AbdominalesPage } from '../pages/abdominales/abdominales';
import { HealthStatusResumePage } from '../pages/health-status-resume/health-status-resume';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { LoadDatabasePage } from '../pages/load-database/load-database';
import { ProfilePage } from '../pages/profile/profile';
import { GoogleFitProvider } from '../providers/google-fit/google-fit';
import { HealthDbProvider } from '../providers/health-db/health-db';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { HomePage } from '../pages/home/home';
import { ExercisePage } from '../pages/exercise/exercise';
import { ExercisesPage } from '../pages/exercises/exercises';
import { RecoveryPasswordPage } from '../pages/recovery-password/recovery-password';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    RegisterPage,
    ResetPassPage,
    InitialPage,
    CaminataPage,
    SaltosPage,
    AbdominalesPage,
    ConfigurationPage,
    LoadDatabasePage,
    ProfilePage,
    EditProfilePage,
    HealthStatusResumePage,
    HomePage,
    ExercisePage,
    ExercisesPage,
    RecoveryPasswordPage,
  ],
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ProgressBarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    RegisterPage,
    ResetPassPage,
    InitialPage,
    CaminataPage,
    SaltosPage,
    AbdominalesPage,
    ConfigurationPage,
    LoadDatabasePage,
    ProfilePage,
    EditProfilePage,
    HealthStatusResumePage,
    HomePage,
    ExercisePage,
    ExercisesPage,
    RecoveryPasswordPage,
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
    Camera,
    //BackgroundGeolocation
  ]
})
export class AppModule {}
