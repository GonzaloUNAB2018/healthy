import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class HealthDbProvider {

  healthdb: SQLiteObject = null;

  constructor(public http: HttpClient) {
    console.log('Hello HealthDbProvider Provider');
  }

  setDatabase(healthdb: SQLiteObject){
    if(this.healthdb === null){
      this.healthdb = healthdb;
    }
  }
 
  create(health_task: any){
    let sql_healths = 'INSERT INTO health_tasks(id, date, time, type, x, y, z) VALUES(?,?,?,?,?,?,?)';
    return this.healthdb.executeSql(sql_healths, [health_task.id, health_task.date, health_task.time, health_task.type, health_task.x, health_task.y, health_task.z]);
  }

  createTable(){
    let sql_healths = 'CREATE TABLE IF NOT EXISTS health_tasks(id NUMBER, date TEXT, time TEXT, type TEXT, x NUMBER, y NUMBER, z NUMBER)';
    return this.healthdb.executeSql(sql_healths, []);
  }

  delete(health_task: any){
    let sql_healths = 'DELETE FROM health_tasks WHERE id=?';
    return this.healthdb.executeSql(sql_healths, [health_task.id]);
  }

  getAll(){
    let sql_healths = 'SELECT * FROM health_tasks';
    return this.healthdb.executeSql(sql_healths, [])
    .then(response => {
      let health_tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        health_tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( health_tasks );
    })
    .catch(error => Promise.reject(error));
  }

  update(health_task: any){
    let sql_healths = 'UPDATE health_tasks SET id=?, date=?, time=?, type=?, x=?, y=?, WHERE z=?';
    return this.healthdb.executeSql(sql_healths, [health_task.id, health_task.date, health_task.time, health_task.type, health_task.x, health_task.y, health_task.z]);
  }

}
