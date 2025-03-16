import { Table, Column, Model, HasMany } from "sequelize-typescript";

import { OrderItem } from "./order-item";

export enum PaymentMethod {
    Cash = "cash",
    Banking = "banking",
}

export enum StatusCode {
    Active = "active",
    Deleted = "deleted",
}

export interface VatInfo {
    vatRate: number;
    vatAmount: number;
}

@Table({ tableName: "orders", modelName: "orders" })
export class Order extends Model<Order> {
    @Column
    public status!: StatusCode;

    @Column
    public customerName!: string;
    
    @Column
    public customerPhoneNumber!: string;

    @Column
    public customerAddress!: string;

    @Column
    public paymentMethod!: PaymentMethod;
    
    @Column
    public totalBeforeVat!: number;

    @Column
    public discount!: number;

    @Column
    public shippingCost!: number;

    @Column
    public vatInfo!: VatInfo[];

    @Column
    public totalAfterVat!: number;

    @HasMany(() => OrderItem)
    public orderItems!: OrderItem[];
}