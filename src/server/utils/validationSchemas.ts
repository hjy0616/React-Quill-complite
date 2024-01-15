import { z } from "zod";

export const IssuesSchema = z.object({
  title: z.string().min(1, "작성하신 내용이 짧습니다.").max(255),
  description: z.string().min(1, "본문 내용을 작성해주세요.").max(65535),
});

export const patchIssuesSchema = z.object({
  title: z.string().min(1, "작성하신 내용이 짧습니다.").max(255).optional(),
  description: z
    .string()
    .min(1, "본문 내용을 작성해주세요.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
