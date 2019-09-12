import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthStatusResumePage } from './health-status-resume';

@NgModule({
  declarations: [
    HealthStatusResumePage,
  ],
  imports: [
    IonicPageModule.forChild(HealthStatusResumePage),
  ],
})
export class HealthStatusResumePageModule {}
