import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});


export const PolicySchema = z.object({
  id: z.string().min(6, {
    message: "Id is required",
  }),
  name: z.string().min(6, {
    message: "Name is required",
  }),
  price: z.coerce.number().gte(0,{
    message: "Price should be 0 or above."
  }),
  type: z.string().min(1, {
    message: "Select a type"
  })
  
});