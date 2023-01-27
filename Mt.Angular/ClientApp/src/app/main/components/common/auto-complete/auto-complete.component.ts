import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable, switchMap, timer } from 'rxjs';
import { ddlOption } from '../../../models/ddlOption';
import { MtService } from '../../../services/mt-angular-http.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent {
  inputValue = '';
  filteredItems: ddlOption<string>[];
  isFocused: boolean;
  @Output() onSelectSuggestion = new EventEmitter<string>();
  @Input() initialDisplay = '';
  @Input() action: string;
  observableAction: Observable<ddlOption<string>[]>;

  /* typically a service that will be dedicated to load drop down lists from api */
  constructor(private mtService: MtService) {}

  filterItems() {

    if (this.action == "load_emplyees") {
      this.observableAction = this.mtService.getEmployeeOptionsByName(this.inputValue.toLowerCase());
    }
    else
      throw new DOMException("data load action is required");

    timer(500).pipe(
      switchMap(() => this.observableAction),
      map(x => {
        this.filteredItems = x;
      })
    ).subscribe();
  }

  selectItem(item: ddlOption<string>) {
    this.inputValue = item.display;
    this.filteredItems = [];
    this.onSelectSuggestion.emit(item.value.toString());
  }
}
