export class OrderSearchQuery {
  from: Date | null;
  to: Date | null;
  shipCountry: string = "";
  customerId: string = "";

  constructor(shipCountry: string = "") {
    this.from = null;
    this.to = null;
    this.shipCountry = shipCountry;
    this.customerId = "";
  }
}
