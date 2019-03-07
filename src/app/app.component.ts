import { Component, OnInit } from '@angular/core';

import { HeaderService } from './shared/services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  headerItems: any[];

  constructor(private headerService: HeaderService) {

  }

  ngOnInit(): void {
    this.headerService.getMenuItems().subscribe(data => {
      this.headerItems = data;
    });
  }
}
