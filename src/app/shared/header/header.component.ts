import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'boot-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuItems;

  dropdownItems: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectItem(item): void {
    if (item.subItems && item.subItems.length) {
      this.dropdownItems = item.subItems;
      return;
    }
    this.router.navigate([item.alias]);
  }
}
