import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MyTranslationService {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(localStorage.getItem(constants.languageLocalStorageKey) || constants.defaultLanguage);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
