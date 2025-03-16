import { Order, StatusCode } from "@code-challenge/models";
import { orderSchemaUpdate } from "@code-challenge/schemes/order";
import { BadRequestError } from "@TunKeyy/leo-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const orderUpdate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = orderSchemaUpdate.validate(req.body);
        if (error?.details) {
            throw new BadRequestError(error.details[0].message, "Create order method");
        }

        const order = await Order.findByPk(req.params.orderId);

        if (!order || order.status === StatusCode.Deleted) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "This order doesn't exist" });
    
            return;
        }

        await order.update({
            customerName: req.body.customerName,
            customerAddress: req.body.customerAddress,
            customerPhoneNumber: req.body.customerPhoneNumber,
            paymentMethod: req.body.paymentMethod,
        });

        res.status(StatusCodes.OK).json({ message: "Update Order successfully"});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Update Order Fail", error });
    }
};
