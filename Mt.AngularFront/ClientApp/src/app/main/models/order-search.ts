import { ISearch } from "../../shared/models/ISearch";
import { IPagerSetting } from "../../shared/models/PagerSetting";

export class OrderSearchQuery implements IPagerSetting, ISearch {
  from: Date | null = null;
  to: Date | null = null;
  shipCountry = "";
  customerId = "";
  pageIndex = 0;
  pageSize = 0;
  sortField = "";
  desc = false;
}
