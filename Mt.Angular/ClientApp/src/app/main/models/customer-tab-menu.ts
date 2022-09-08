export class CustomerTabMenu{
  profile: boolean;
  orders: boolean;

  constructor() {
    this.profile = true;
    this.orders = false;
  }

  displayProfile() {
    this.profile = true;
    this.orders = false;
  }

  displayOrders() {
    this.profile = false;
    this.orders = true;
  }
}
