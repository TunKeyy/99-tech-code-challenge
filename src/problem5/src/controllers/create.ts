import { Order, OrderItem, VatInfo } from "@code-challenge/models";
import { orderSchemaCreate } from "@code-challenge/schemes/order";
import { BadRequestError } from "@TunKeyy/leo-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export interface IOrderItem {
    productName: string;
    quantity: number;
    price: number;
    vatRate: number;
};

export const orderCreate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = await Promise.resolve(orderSchemaCreate.validate(req.body));
        if (error?.details) {
            throw new BadRequestError(error.details[0].message, "Create order method");
        }

        const inputItems: IOrderItem[] = req.body.items;

        const discount: number = req.body.discount;
        let totalBeforeVat: number = 0;
        let totalAfterVat: number = 0;
        const vatInfo: VatInfo[] = [];
        const orderItems: OrderItem[] = [];
        
        inputItems.map((item: IOrderItem) => {
            orderItems.push({
                productName: item.productName,
                price: item.price,
                quantity: item.quantity,
                vatRate: item.vatRate,
                totalBeforeVat: item.price * item.quantity,
                totalAfterVat: item.price * item.quantity * (1 + item.vatRate / 100),
            } as OrderItem);

            vatInfo.push({
                vatRate: item.vatRate,
                vatAmount: item.vatRate * item.price * item.quantity,
            } as VatInfo);

            totalBeforeVat += item.price * item.quantity;
            totalAfterVat += item.price * item.quantity * (1 + item.vatRate / 100);
        });

        const order: Order = await Order.create({
            customerName: req.body.customerName,
            customerPhoneNumber: req.body.customerPhoneNumber,
            customerAddress: req.body.customerAddress,
            paymentMethod: req.body.paymentMethod,
            discount: req.body.discount,
            shippingCost: req.body.shippingCost,
            vatInfo: vatInfo,
            totalBeforeVat: totalBeforeVat,
            totalAfterVat: totalAfterVat - discount,
            orderItems: orderItems,
        } as Order);

        res.status(StatusCodes.OK).json({ message: "Order created successfully.", order });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};