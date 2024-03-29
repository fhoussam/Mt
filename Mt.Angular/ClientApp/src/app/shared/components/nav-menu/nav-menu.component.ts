import { Component, ElementRef, OnInit } from '@angular/core';
import { constants } from '../../constants';
import { UserModel } from '../../models/UserModel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  selectedLanguage: string = constants.defaultLanguage;

  constructor(private authService: AuthService, private el: ElementRef) { }

  ngOnInit(): void {
    this.initUserInfo();
    this.selectedLanguage = localStorage.getItem(constants.languageLocalStorageKey) || constants.defaultLanguage;
  }

  getCurrentLanguageLabel(): string {
    switch (this.selectedLanguage) {
      case 'fr':
        return 'FR';
      case 'ar':
        return 'AR';
      case 'en':
        return 'EN';
      default:
        return constants.defaultLanguage;
    }
  }

  toggleDropdown() {
    const dropdown = this.el.nativeElement.querySelector('.dropdown-menu');
    dropdown.classList.toggle('show');
  }

  selectLanguage(language: string) {
    localStorage.setItem(constants.languageLocalStorageKey, language);
    window.location.reload();
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
