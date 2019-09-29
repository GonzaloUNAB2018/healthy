import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class StepsDbProvider {

  stepsdb: SQLiteObject = null;

  constructor() {}

  setDatabase(stepsdb: SQLiteObject){
    if(this.stepsdb === null){
      this.stepsdb = stepsdb;
    }
  }

  create(steps_task: any){
    let sql_steps = 'INSERT INTO steps_tasks(eid, id, date, save_time, type, steps, lat, lng, alt, speed) VALUES(?,?,?,?,?,?,?,?,?,?)';
    return this.stepsdb.executeSql(sql_steps, [steps_task.eid, steps_task.id, steps_task.date, steps_task.save_time, steps_task.type, steps_task.steps, steps_task.lat, steps_task.lng, steps_task.alt, steps_task.speed]);
  }

  createTable(){
    let sql_steps = 'CREATE TABLE IF NOT EXISTS steps_tasks(eid NUMBER, id NUMBER, date TEXT, save_time TEXT, type TEXT, steps NUMBER, lat NUMBER, lng NUMBER, alt NUMBER, speed NUMBER)';
    return this.stepsdb.executeSql(sql_steps, []);
  }

  delete(steps_task: any){
    let sql_steps = 'DELETE FROM steps_tasks WHERE eid=?';
    return this.stepsdb.executeSql(sql_steps, [steps_task.eid]);
  }

  getAll(){
    let sql_steps = 'SELECT * FROM steps_tasks';
    return this.stepsdb.executeSql(sql_steps, [])
    .then(response => {
      let steps_tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        steps_tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( steps_tasks );
    })
    .catch(error => Promise.reject(error));
  }

  update(steps_task: any){
    let sql_steps = 'UPDATE steps_tasks SET eid=?, id=?, date=?, save_time=?, type=?, steps=?, lat=?, lng=?, alt=?, WHERE speed=?';
    return this.stepsdb.executeSql(sql_steps, [steps_task.eid, steps_task.id, steps_task.date, steps_task.save_time, steps_task.type, steps_task.steps, steps_task.lat, steps_task.lng, steps_task.alt, steps_task.speed]);
  }

}
