import {Component, Input, OnInit} from '@angular/core';
import {ConfigFormResultService} from "../../../game/services/config-form-result.service";
import {ConfigModel} from "../../../game/models/config.model";
import {HttpClient} from "@angular/common/http";
import {StudentService} from "../../../../core/components/services/student.service";
import {backUrl} from "../../../../../environnement/environnement";


@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrl: './config-list.component.scss'
})
export class ConfigListComponent implements OnInit{
  public configList: ConfigModel[] = [];
  public showCreateConfig: boolean = false;
  public showConfigList: boolean = !this.showCreateConfig;
  public configUrl: string = backUrl+"/configs/";
  private userId: number | null = 0;


  constructor(private studentService:StudentService, private http: HttpClient, public configFormResultService: ConfigFormResultService){
    studentService.selectedStudentId$.subscribe((value) => {
      this.userId = value;
    })
    this.retrieveConfigs()
  }

  retrieveConfigs(){
    this.http.get<ConfigModel[]>(this.configUrl).subscribe((list) => {
      this.configList = (list.filter((config) => config.userId == this.userId));
    });
  }

  showCreateConfiguration(){
    this.showCreateConfig = !this.showCreateConfig;
    this.showConfigList = !this.showConfigList;
  }
  ngOnInit() {}

  startGameWithConfig(config: ConfigModel){
    this.configFormResultService.startGameWithConfiguration(config);
    console.log("config avec laquelle on essaye de lancer dans le component config list", config)
  }

  deleteConfig(config: ConfigModel) {

    if (!config || !config.id) {
      console.error("Invalid config or missing id.");
      return;
    }

    const urlID = `${this.configUrl}/${config.id}`;

    this.http.delete<ConfigModel>(urlID)
      .subscribe({
        next: () => {
          this.retrieveConfigs();
        },
        error: (err) => {
          console.error("Error deleting config:", err);
        }
      });
}

}
