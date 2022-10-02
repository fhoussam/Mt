export class OrderListItem {
  id!: number;
  contactName: string = "";
  employee: string = "";
  orderDate!: Date;
  shipCountry: string = "";
  customerId: string = "";
  totalOrderedUnits: number = 0;
}
