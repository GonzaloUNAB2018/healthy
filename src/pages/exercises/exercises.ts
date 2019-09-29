import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { JumpDbProvider } from '../../providers/jump-db/jump-db';
import { ABSDbProvider } from '../../providers/ABS-db/ABSs-db';
import { StepsDbProvider } from '../../providers/steps-db/steps-db';

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html',
})
export class ExercisesPage {

  uid: any;
  jump_tasks: any[] = [];
  steps_tasks: any[] = [];
  ABS_tasks: any[] = [];
  steps_entries: number = 0;
  steps_entries_boolean: boolean = false;
  jumps_entries: number = 0;
  jumps_entries_boolean: boolean = false;
  ABSs_entries: number = 0;
  ABSs_entries_boolean: boolean = false;
  total_entries: number = 0;
  openSteps1: boolean = false;
  openSteps2: boolean = false;
  openABS1: boolean = false;
  openABS2: boolean = false;
  openJumps1: boolean = false;
  openJumps2: boolean = false;
  steps: any[];
  abss: any[];
  jumps: any[];

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public jumpDbService: JumpDbProvider,
    public ABSDbService: ABSDbProvider,
    public stepsDbService: StepsDbProvider,
    ) {
      this.uid = navParams.get('uid')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisesPage');
    this.getAll()
  }

  getAll(){
    if(this.platform.is('cordova')){
      this.getABS();
      this.getJumps();
      this.getSteps();
    }else{
      this.steps = [
        {
          eui:1,
          type:'Caminata',
          save_time:'1-9-2019'
        },
        {
          eui:2,
          type:'Caminata',
          save_time:'1-9-2019'
        }
      ]
    }
  }

  getABS(){
    this.ABSDbService.getAll()
    .then(ABS_tasks => {
      this.ABS_tasks = ABS_tasks;
      if(this.ABS_tasks.length!=0){
        this.abss = Array.from(new Set(this.ABS_tasks.map(x=>x.eid))).map(eid=>{
          return{
            eid: eid,
            type: this.ABS_tasks.find(type=> type.eid === eid).type,
            save_time: this.ABS_tasks.find(type=> type.eid === eid).save_time
          }
        });
        console.log(this.abss)
        this.ABSs_entries = this.ABS_tasks.length;
        this.ABSs_entries_boolean = true;
        this.openABS1 = true
      }else{
        console.log('No existen datos de abdominales por sincronizar');
        this.ABSs_entries = 0;
        this.ABSs_entries_boolean = false;
        this.openABS2=true;
      }
    })
    .catch( error => {
      console.error( error );
    });
  }

  getSteps(){
    this.stepsDbService.getAll()
    .then(steps_tasks => {
      this.steps_tasks = steps_tasks;
      if(this.steps_tasks.length!=0){
        this.steps = Array.from(new Set(this.steps_tasks.map(x=>x.eid))).map(eid=>{
          return{
            eid: eid,
            type: this.steps_tasks.find(type=> type.eid === eid).type,
            save_time: this.steps_tasks.find(type=> type.eid === eid).save_time
          }
        });
        console.log(this.steps)
        this.steps_entries = this.steps_tasks.length;
        this.steps_entries_boolean = true;
        this.openSteps1 = true;
      }else{
        console.log('No existen datos de caminata por sincronizar');
        this.steps_entries = 0;
        this.steps_entries_boolean = false;
        this.openSteps2 = true;
      }
    })
    .catch( error => {
      console.error( error );
    });
  }

  getJumps(){
    this.jumpDbService.getAll()
    .then(jump_tasks => {
      this.jump_tasks = jump_tasks;
      if(this.jump_tasks.length!=0){
        this.jumps = Array.from(new Set(this.jump_tasks.map(x=>x.eid))).map(eid=>{
          return{
            eid: eid,
            type: this.jump_tasks.find(type=> type.eid === eid).type,
            save_time: this.jump_tasks.find(type=> type.eid === eid).save_time
          }
        });
        console.log(this.jumps)
        this.jumps_entries = this.jump_tasks.length;
        this.jumps_entries_boolean = true;
        this.openJumps1 = true
      }else{
        console.log('No existen datos de saltos por sincronizar');
        this.jumps_entries = 0;
        this.jumps_entries_boolean = false;
        this.openJumps2 = true
      }
    })
    .catch( error => {
      console.error( error );
    });
  }


}
