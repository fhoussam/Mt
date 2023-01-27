import { Component } from '@angular/core';
import { timer, switchMap, map } from 'rxjs';
import { ddlOption } from '../../../models/ddlOption';
import { MtService } from '../../../services/mt-angular-http.service';

@Component({
  selector: 'app-mycompo',
  templateUrl: './mycompo.component.html',
  styleUrls: ['./mycompo.component.css']
})
export class MycompoComponent {
  inputValue = '';
  filteredItems: ddlOption<number>[];
  isFocused: boolean;

  constructor(private mtService: MtService) { }

  filterItems() {
    timer(500).pipe(
      switchMap(() => this.mtService.getEmployeeOptionsByName(this.inputValue.toLowerCase())),
      map(x => {
        this.filteredItems = x;
      })
    ).subscribe();
  }

  selectItem(item: ddlOption<number>) {
    this.inputValue = item.display;
    this.filteredItems = [];
  }
}
