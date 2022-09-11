export class OrderSearch {
  from: Date | null;
  to: Date | null;
  shipCountry: string;
  customerId: string;

  constructor() {
    this.from = null;
    this.to = null;
    this.shipCountry = "";
    this.customerId = "";
  }
}
