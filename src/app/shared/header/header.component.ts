import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'boot-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuItems: { label: string, alias: string, subItems: any[] }[] = [];
  @Input() isLoggedIn: boolean;

  dropdownItems: any[] = [];

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  selectItem(item): void {
    if (item.subItems && item.subItems.length) {
      this.dropdownItems = item.subItems;
      return;
    }
    this.router.navigate([item.alias]);
  }

  goToAuth() {
    this.router.navigate(['/auth']);
  }

  logout() {
    this.authService.logout();
    this.goToAuth();
  }
}
