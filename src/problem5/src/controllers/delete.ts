import { Order, StatusCode } from "@code-challenge/models";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const orderDelete = async (req: Request, res: Response): Promise<void> => {
    const order: Order| null = await Order.findByPk(req.params.orderId);
    if (!order || order.status === StatusCode.Deleted) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "This order doesn't exist" });

        return;
    }
    
    await order.update({ status: StatusCode.Deleted });
    res.status(StatusCodes.OK).json({ message: "Delete order successfully" });
};