export class OrderTabMenu{
  profile: boolean;
  orderDetails: boolean;

  constructor() {
    this.profile = true;
    this.orderDetails = false;
  }

  displayProfile() {
    this.profile = true;
    this.orderDetails = false;
  }

  displayOrderDetails() {
    this.profile = false;
    this.orderDetails = true;
  }
}
