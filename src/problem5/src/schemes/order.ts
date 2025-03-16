import { PaymentMethod } from "@code-challenge/models";
import J from "joi";

const Joi: J.Root = J;
const vatInfoSchema = Joi.object({
  percentage: Joi.number().min(0).max(100).required(),
  amount: Joi.number().min(0).required(),
});

const orderItemSchema = Joi.object({
  productName: Joi.string().required(),
  quantity: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  vatRate: Joi.number().positive().required(),
});

export const orderSchemaCreate = Joi.object({
  customerName: Joi.string().required().min(2).max(100),
  customerPhoneNumber: Joi.string()
    .required()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .message("Invalid phone number format"),
  customerAddress: Joi.string().required().min(5).max(255),
  paymentMethod: Joi.string()
    .valid(...Object.values(PaymentMethod))
    .required(),
  totalBeforeVat: Joi.number().positive().required(),
  discount: Joi.number().min(0).default(0),
  shippingCost: Joi.number().min(0).default(0),
  vatInfo: Joi.array().items(vatInfoSchema).required(),
  totalAfterVat: Joi.number().positive().required(),
  orders: Joi.array().items(orderItemSchema).min(1).required()
});


export const orderSchemaUpdate = Joi.object({
  customerName: Joi.string().required().min(2).max(100),
  customerPhoneNumber: Joi.string()
    .required()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .message("Invalid phone number format"),
  customerAddress: Joi.string().required().min(5).max(255),
  paymentMethod: Joi.string()
    .valid(...Object.values(PaymentMethod))
    .required(),
});