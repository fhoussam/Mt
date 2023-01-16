import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PagerSetting } from '../../models/PagerSetting';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit, OnChanges {

  @Input() totalCount: number;
  @Input() selectedPageSize: number;
  @Output() ChangePagerSettings = new EventEmitter<PagerSetting>();
  pageSetting = new PagerSetting();
  pageCount = 0;

  emit() {
    //emiting the object like the following :
    //this.ChangePagerSettings.emit(this.pageSetting);
    //makes redux stire point to the reference of this.pageSetting
    //thus making not possible to modify when emiting the next value
    //real use case example : selecting first page > works, then select second page > does work and gives error message : cannot set read only propoerty pageIndex
    //that's why this, we made it work like this :
    this.ChangePagerSettings.emit({ ...this.pageSetting });
  }

  goToFirst() {
    this.pageSetting.pageIndex = 0;
    this.emit();
  }

  goToLast() {
    this.pageSetting.pageIndex = this.pageCount - 1;
    this.emit();
  }

  goToPrevious() {

    if (this.pageSetting.pageIndex <= 0)
      return;

    this.pageSetting.pageIndex--;
    this.emit();
  }

  goToNext() {

    if (this.pageSetting.pageIndex + 1 >= this.pageCount)
      return;

    this.pageSetting.pageIndex++;
    this.emit();
  }

  emitPageSize(event: any) {
    let pageSize = event.target.value;
    this.pageSetting.pageSize = +pageSize;
    this.pageSetting.pageIndex = 0;
    this.refreshPageCount();
    this.emit();
  }

  refreshPageCount() {
    let pageSize = this.pageSetting.pageSize === undefined ? this.selectedPageSize : this.pageSetting.pageSize;
    let pageCount = Math.ceil(this.totalCount / pageSize);
    this.pageCount = pageCount;
  }

  constructor() { }

  ngOnInit() {
    this.refreshPageCount();
  }

  ngOnChanges() {
    this.refreshPageCount();
  }
}
