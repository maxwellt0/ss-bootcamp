import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { HeaderService } from './shared/services/header.service';
import { AuthService } from './auth/services/auth.service';
import { Subscription } from 'rxjs';
import { SpinnerService } from './core/services/spinner.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private isLoggedIn$: Subscription;

  headerItems: { label: string, alias: string, subItems: any[] }[] = [];
  isLoggedIn;
  showSpinner = false;

  constructor(private headerService: HeaderService,
              private authService: AuthService,
              private spinnerService: SpinnerService) {

  }

  ngOnInit(): void {
    this.headerService.getMenuItems().subscribe(data => {
      this.headerItems = data;
    });
    this.authService.initUser();

    this.spinnerService.showSpinner.pipe(
      tap((res: boolean) => this.showSpinner = res)
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.isLoggedIn$ = this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      setTimeout(() => this.isLoggedIn = isLoggedIn);
    });
  }

  ngOnDestroy(): void {
    this.isLoggedIn$.unsubscribe();
  }
}
