import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PagerSetting } from '../../../models/PagerSetting';

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

  goToFirst() {
    this.pageSetting.pageIndex = 0;
    this.ChangePagerSettings.emit(this.pageSetting);
  }

  goToLast() {
    this.pageSetting.pageIndex = this.pageCount - 1;
    this.ChangePagerSettings.emit(this.pageSetting);
  }

  goToPrevious() {

    if (this.pageSetting.pageIndex <= 0)
      return;

    this.pageSetting.pageIndex--;
    this.ChangePagerSettings.emit(this.pageSetting);
  }

  goToNext() {

    if (this.pageSetting.pageIndex + 1 >= this.pageCount)
      return;

    this.pageSetting.pageIndex++;
    this.ChangePagerSettings.emit(this.pageSetting);
  }

  emitPageSize(event: any) {
    let pageSize = event.target.value;
    this.pageSetting.pageSize = +pageSize;
    this.pageSetting.pageIndex = 0;
    this.refreshPageCount();
    this.ChangePagerSettings.emit(this.pageSetting);
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
