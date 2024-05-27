import {Component, Input, OnInit} from '@angular/core';
import {ConfigFormResultService} from "../../../game/services/config-form-result.service";
import {ConfigModel} from "../../../game/models/config.model";

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrl: './config-list.component.scss'
})
export class ConfigListComponent implements OnInit{
  public configList: ConfigModel[] = [];
  public showCreateConfig: boolean = false;
  public showConfigList: boolean = !this.showCreateConfig;

  
  @Input() selectedPlayerId: number | null = 0; 

  constructor(public configFormResultService: ConfigFormResultService){
    this.configFormResultService.configActual$.subscribe(() => {
      this.configList = configFormResultService.getResults();
    })

  }

  showCreateConfiguration(){
    this.showCreateConfig = !this.showCreateConfig;
    this.showConfigList = !this.showConfigList;
  }
  ngOnInit() {}

  startGameWithConfig(config: ConfigModel){
    this.configFormResultService.startGameWithConfiguration(config);
  }
  deleteConfig(config: ConfigModel){
    this.configFormResultService.deleteConfiguration(config);
  }

}
