import {Component, Input, OnInit} from '@angular/core';
import {ConfigFormResultService} from "../../../game/services/config-form-result.service";
import {ConfigModel} from "../../../game/models/config.model";
import {HttpClient} from "@angular/common/http";
import {StudentService} from "../../../../core/components/services/student.service";


@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrl: './config-list.component.scss'
})
export class ConfigListComponent implements OnInit{
  public configList: ConfigModel[] = [];
  public showCreateConfig: boolean = false;
  public showConfigList: boolean = !this.showCreateConfig;
  public configUrl: string = "http://localhost:9428/api/configs";
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
  }

  deleteConfig(config: ConfigModel) {
    
    if (!config || !config.id) {
      console.error("Invalid config or missing id.");
      return;
    }

    const urlID = `${this.configUrl}/${config.id}`;
    console.log(`Deleting config at URL: ${urlID}`);
    
    this.http.delete<ConfigModel>(urlID)
      .subscribe({
        next: () => {
          console.log("Config deleted successfully.");
          this.retrieveConfigs(); 
        },
        error: (err) => {
          console.error("Error deleting config:", err);
        }
      });
}

}
