import { CustomerListModel } from "./customer-list-model";

export class PagedList<T>
{
    content: CustomerListModel[];
    totalCount: number;
}