import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Health } from '@ionic-native/health';

@Injectable()
export class GoogleFitProvider {

  constructor(
    public http: HttpClient,
    private health : Health
    ) {
    console.log('Hello GoogleFitProvider Provider');
  }

  public accesToHealth(){
    return this.health.isAvailable()
  }

  public getPermissionToHealthData(){
    this.health.requestAuthorization([
      'height', 'weight','nutrition',  //read and write permissions
      {
        read: [
          'steps', 
          'stairs', 
          'distance', 
          'appleExerciseTime',
          'calories',
          'activity',
          'height',
          'weight',
          'heart_rate',
          'heart_rate.variability',
          'fat_percentage',
          'date_of_birth',
        ],       //read only permission
        write: [
          'date_of_birth',
          'height',
          'weight',
        ]  //write only permission
      }
    ])
  }

  public getStepsFromHealth(){
    return this.health.query({
      startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
      endDate: new Date(), // now
      dataType: 'steps',
      limit: 1000
    })
  }

  public getDistanceFromHealth(){
    return this.health.query({
      startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
      endDate: new Date(), // now
      dataType: 'distance',
      limit: 1000
    })
  }
  
  public getCaloriesFromHealth(){
    return this.health.query({
      startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
      endDate: new Date(), // now
      dataType: 'calories',
      limit: 1000
    })
  }

  public getHeartRateFromHealth(newDate){
    console.log('Desde google provider: '+newDate);
    return this.health.query({
      //startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
      startDate: newDate,
      endDate: new Date(), // now
      dataType: 'heart_rate',
      limit: 10000000,
    })
  }



}
