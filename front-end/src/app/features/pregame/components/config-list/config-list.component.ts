import {Component, OnInit} from '@angular/core';
import {ConfigFormResultService} from "../../../game/services/config-form-result.service";
import {ConfigModel} from "../../../game/models/config.model";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrl: './config-list.component.scss'
})
export class ConfigListComponent implements OnInit{
  public configList: ConfigModel[] = [];
  public showCreateConfig: boolean = false;
  public showConfigList: boolean = !this.showCreateConfig;
  public configUrl: string = "http://localhost:9428/api/configs/";

  constructor(private http: HttpClient, public configFormResultService: ConfigFormResultService){
    this.retrieveConfigs()
  }

  retrieveConfigs(){
    this.http.get<ConfigModel[]>(this.configUrl).subscribe((list) => {
      console.log(list)
      this.configList = (list);
    });
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
    const urlID = this.configUrl + "/" + config.id;
    this.http.delete<ConfigModel>(urlID).subscribe(() => this.retrieveConfigs())
  }

}
