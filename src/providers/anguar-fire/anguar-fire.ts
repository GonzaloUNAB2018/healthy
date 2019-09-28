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
    return this.afDb.list('Pacientes/'+uid+'/Ejercicios/Caminata/Datos/');
  }

  public getABSs(uid){
    return this.afDb.list('Pacientes/'+uid+'/Ejercicios/Abdominales/Datos/');
  }

  public getJumps(uid){
    return this.afDb.list('Pacientes/'+uid+'/Ejercicios/Saltos/Datos/');
  }

  public deleteDataBase(uid){
    this.afDb.database.ref('Pacientes/'+uid+'/Ejercicios/').remove();
  }

  updateJumpInfo(uid, info){
    this.afDb.database.ref('Pacientes/'+uid+'/Ejercicios/Saltos').update(info);
  }

  updateABSInfo(uid, info){
    this.afDb.database.ref('Pacientes/'+uid+'/Ejercicios/Abdominales').update(info);
  }

  updateStepsInfo(uid, info){
    this.afDb.database.ref('Pacientes/'+uid+'/Ejercicios/Caminata').update(info);
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
    this.afDb.database.ref('Pacientes/'+uid+'/Hearth_Rates/'+rate.id).set(rate);
  }

  getUserHearthAllRates(uid){
    return this.afDb.list('Pacientes/'+uid+'/Hearth_Rates/');
  }

  deleteRates(uid){
    this.afDb.database.ref('Pacientes/'+uid+'/Hearth_Rates/').remove();
  }

  

}
