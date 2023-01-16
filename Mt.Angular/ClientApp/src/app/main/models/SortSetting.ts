export class SortSetting {
  sortField: string;
  desc: boolean;

  searchBase() {
    this.sortField = "";
    this.desc = false;
  }
}
