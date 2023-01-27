import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, switchMap, timer } from 'rxjs';
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
  @Output() onSelectSuggestion = new EventEmitter<string>();
  @Input() initialDisplay = '';

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
    this.onSelectSuggestion.emit(item.value.toString());
  }
}
