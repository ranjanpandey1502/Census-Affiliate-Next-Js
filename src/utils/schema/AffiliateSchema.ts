import {z} from "zod";

export const AffiliateLinkSchema = z.object({
    affiliate_slug: z.string().trim().min(2).max(50),
    description: z.string().nullable().optional()
})