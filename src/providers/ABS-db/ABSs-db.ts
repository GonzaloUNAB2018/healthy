import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ABSDbProvider {

   ABSsdb: SQLiteObject = null;

   constructor() {}
 
   setDatabase(ABSsdb: SQLiteObject){
     if(this.ABSsdb === null){
       this.ABSsdb = ABSsdb;
     }
   }
 
   create(ABSs_task: any){
     let sql_ABSs = 'INSERT INTO ABSs_tasks(eid, id, date, save_time, type, x, y, z,giroscope_x,giroscope_y,giroscope_z) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
     return this.ABSsdb.executeSql(sql_ABSs, [ABSs_task.eid, ABSs_task.id, ABSs_task.date, ABSs_task.save_time, ABSs_task.type, ABSs_task.x, ABSs_task.y, ABSs_task.z, ABSs_task.giroscope_x, ABSs_task.giroscope_y, ABSs_task.giroscope_z]);
   }
 
   createTable(){
     let sql_ABSs = 'CREATE TABLE IF NOT EXISTS ABSs_tasks(eid NUMBER, id NUMBER, date TEXT, save_time TEXT, type TEXT, x NUMBER, y NUMBER, z NUMBER, giroscope_x NUMBER, giroscope_y NUMBER, giroscope_z NUMBER)';
     return this.ABSsdb.executeSql(sql_ABSs, []);
   }
 
   delete(ABSs_task: any){
     let sql_ABSs = 'DELETE FROM ABSs_tasks WHERE id=?';
     return this.ABSsdb.executeSql(sql_ABSs, [ABSs_task.id]);
   }
 
   getAll(){
     let sql_ABSs = 'SELECT * FROM ABSs_tasks';
     return this.ABSsdb.executeSql(sql_ABSs, [])
     .then(response => {
       let ABSs_tasks = [];
       for (let index = 0; index < response.rows.length; index++) {
         ABSs_tasks.push( response.rows.item(index) );
       }
       return Promise.resolve( ABSs_tasks );
     })
     .catch(error => Promise.reject(error));
   }
 
   update(ABSs_task: any){
     let sql_ABSs = 'UPDATE ABSs_tasks SET eid=?, id=?, date=?, save_time=?, type=?, x=?, y=?, WHERE z=?';
     return this.ABSsdb.executeSql(sql_ABSs, [ABSs_task.eid, ABSs_task.id, ABSs_task.date, ABSs_task.save_time, ABSs_task.type, ABSs_task.x, ABSs_task.y, ABSs_task.z]);
   }

}
