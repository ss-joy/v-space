import { z } from "zod";
export const SignUpSchema = z.object({
  userName: z.string().min(5),
  userEmail: z.string().email(),
  userPwd: z.string().min(6),
  userConfirmPwd: z.string(),
});
export const LoginSchema = SignUpSchema.omit({
  userConfirmPwd: true,
  userName: true,
});
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
