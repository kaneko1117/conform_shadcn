import { z } from "zod";

export const DATA_SCHEMA = z.object({
  name: z.string({ required_error: "Name is required" }),
  country: z.string({ required_error: "From is required" }),
});
