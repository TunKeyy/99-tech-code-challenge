import { Order } from "@code-challenge/models";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const orderById = async (req: Request, res: Response): Promise<void> => {
    const order: Order | null = await Order.findByPk(req.params.orderId);
    res.status(StatusCodes.OK).json({ message: "Get order by id" , order});
};

export const orderGetAll = async (_: Request, res: Response): Promise<void> => {
    const orders: Order[] | null = await Order.findAll({});
    res.status(StatusCodes.OK).json({ message: "Get all order" , orders});
};