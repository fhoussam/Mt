import { Component } from '@angular/core';
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
    this.mtService.getEmployeeOptionsByName(this.inputValue.toLowerCase()).subscribe(x => {
      this.filteredItems = x;
    });
  }

  selectItem(item: ddlOption<number>) {
    this.inputValue = item.display;
    this.filteredItems = [];
  }
}
