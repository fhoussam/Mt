import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/UserModel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initUserInfo();
  }

  user = new UserModel();

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  login() {
    this.authService.authenticateUser("");
  }

  logout() {
    window.location.href = 'accounts/logout';
  }

  initUserInfo() {
    this.authService.getUserInfo().subscribe(x => {

      if (x) {
        this.user = x;
      }
      
      console.log('user info', x);
    });
  }
}
