import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  age: z.coerce.number().min(18, "Age must be 18+"),
  email: z.string().email("Valid email required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});
