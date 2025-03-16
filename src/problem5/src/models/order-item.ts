import { Table, Column, Model, BelongsTo } from "sequelize-typescript";

import { Order } from "./order";

@Table({ tableName: "order_items", modelName: "order_items" })
export class OrderItem extends Model<OrderItem> {
    @Column
    public productName!: string;
    
    @Column
    public price!: number;

    @Column
    public quantity!: number;

    @Column
    public vatRate!: number;
    
    @Column
    public totalBeforeVat?: number;

    @Column
    public totalAfterVat?: number;

    @BelongsTo(() => Order)
    public order?: Order;
}