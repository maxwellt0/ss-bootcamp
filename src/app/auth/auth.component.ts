import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'boot-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user = {
    username: '',
    password: ''
  };
  showSpinner = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['']);
        }
      }
    );
  }

}
