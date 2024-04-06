import { Component, OnInit } from "@angular/core";

@Component({
  selector:'stat-graph',
  templateUrl: './stat-graph.component.html',
  styleUrls:['./stat-graph.component.scss']
})
export class StatGraphComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const buttons = document.querySelectorAll('.mode-button');
    const titles = document.querySelectorAll(".title");
    const graphImg = document.querySelector('.graph-img');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        titles.forEach(title => {
          title.setAttribute('data-status', 'unknown');
        });
        if(graphImg) {
          graphImg.setAttribute('data-status', 'unknown');
        }
        setTimeout(() => {
          titles.forEach(title => {
            title.setAttribute('data-status', 'active');
          });
          if(graphImg) {
            graphImg.setAttribute('data-status', 'active');
        }
        }, 300);      
      });
    });
  }
}
