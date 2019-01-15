import { Component, OnInit } from '@angular/core';
import {RobotManagerService} from '../../../services/robot-manager.service';

@Component({
  selector: 'app-status-module',
  templateUrl: './status-module.component.html',
  styleUrls: ['./status-module.component.scss']
})
export class StatusModuleComponent implements OnInit {

  public battPercentage: number;
  public batt: number;

  constructor(private robotManager: RobotManagerService) {
    this.battPercentage = 0;
    this.batt = 0;
  }

  ngOnInit() {
    this.robotManager.networkTables.onUpdate.subscribe(() => {
      let battRow = this.robotManager.networkTables.table.find(row => row.key === "/SmartDashboard/simpledashboard.voltage");
        if(battRow !== undefined){
          try {
            const battValue = Number.parseFloat(battRow.value);
            this.batt = Math.round(battValue*100)/100;
            this.battPercentage = (battValue / 14.0) * 100;
            console.log("percentage: " + this.battPercentage);
          }catch (e) {
            console.error("Battery value is not a float!")
          }
        }else{
          console.debug("No battery value emitted from robot!")
        }
    });
  }

}
