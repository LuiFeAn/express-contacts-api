import { z } from "zod";

export const ResourceListRequestSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  sort: z.string().optional().default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type ResourceListRequest = z.infer<typeof ResourceListRequestSchema>;
