import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


/*
  Generated class for the AnguarFireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnguarFireProvider {

  constructor(
    public http: HttpClient,
    private afDb: AngularFireDatabase,
    
    ) {
    console.log('Hello AnguarFireProvider Provider');
  }

  public getSteps(uid){
    return this.afDb.list('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/Caminata/Datos/');
  }

  public getABSs(uid){
    return this.afDb.list('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/Abdominales/Datos/');
  }

  public getJumps(uid){
    return this.afDb.list('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/Saltos/Datos/');
  }

  public deleteDataBase(uid){
    this.afDb.database.ref('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/').remove();
  }

  updateJumpInfo(uid, info){
    this.afDb.database.ref('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/Saltos/'+info.id).update(info);
  }

  updateABSInfo(uid, info){
    this.afDb.database.ref('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/Abdominales/'+info.id).update(info);
  }

  updateStepsInfo(uid, info){
    this.afDb.database.ref('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/Caminata/'+info.id).update(info);
  }

  updateJumpData(uid, info){
    this.afDb.object('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/Saltos/Datos/'+info.eid+'/'+info.id).update(info);
  }

  updateABSData(uid, info){
    this.afDb.object('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/Abdominales/Datos/'+info.eid+'/'+info.id).update(info);
  }

  updateStepsData(uid, info){
    this.afDb.object('Ejercicios_Pacientes/Ejercicios/'+uid+'/Ejercicios/Caminata/Datos/'+info.eid+'/'+info.id).update(info);
  }

  public requiereUpdateApp(){
    return this.afDb.object('Update/')
  }

  public getUserInfo(uid){
    return this.afDb.object('Pacientes/Datos_Personales/'+uid+'/User_Info')
  }

  updateUserData(uid, user){
    this.afDb.database.ref('Pacientes/Datos_Personales/'+uid+'/User_Info').update(user);
  }

  userHearthRateSetLastData(uid, rate){
    this.afDb.database.ref('Google_Fit/Pulsos_Cardiacos/'+uid+'/Hearth_Rates/'+rate.id).set(rate);
  }

  getUserHearthAllRates(uid){
    return this.afDb.list('Google_Fit/Pulsos_Cardiacos/'+uid+'/Hearth_Rates/');
  }

  deleteRates(uid){
    this.afDb.database.ref('Google_Fit/Pulsos_Cardiacos/'+uid+'/Hearth_Rates/').remove();
  }

  

}
