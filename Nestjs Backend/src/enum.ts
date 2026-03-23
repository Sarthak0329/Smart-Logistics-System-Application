export const enum Roles{
    ADMIN = 'admin',
    CLIENT = 'client',
    CUSTOMER = 'customer', 
    DRIVER = 'driver',
    DELIVERY_AGENT = 'delivery_agent',
}

export enum paymentMode{
    COD = 'COD',
    UPI = 'UPI',
    CARD = 'CARD',
    NETBANKING = 'NETBANKING'
}

export enum paymentStatus{
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum status{
    CREATED="CREATED",
    IN_TRANSIT="IN_TRANSIT",
    AT_WAREHOUSE="AT_WAREHOUSE",
    OUT_FOR_DELIVERY="OUT_FOR_DELIVERY",
    DELIVERED="DELIVERED",
    CANCELLED="CANCELLED"
}

export enum DriverAssignmentStatus{
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}