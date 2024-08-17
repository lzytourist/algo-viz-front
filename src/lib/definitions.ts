import {z} from "zod";

export const SignUpSchema = z.object({
  first_name: z.string()
    .min(1, 'first name is required')
    .max(200, 'at most 200 characters'),
  last_name: z.string()
    .min(1, 'last name is required')
    .max(200, 'at most 200 characters'),
  email: z.string().email(),
  password: z.string()
    .min(8, 'must be at least 8 characters'),
  re_password: z.string(),
  institute: z.string().nullable()
}).refine((data) => data.password == data.re_password, {
  message: 'Password does not match',
  path: ['re_password']
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(8, 'must be at least 8 characters'),
});

export const UserSchema = z.object({
  first_name: z.string().min(1, 'first name is required'),
  last_name: z.string().min(1, 'last name is required'),
  institute: z.string().nullable(),
  gender: z.string().nullable(),
  date_of_birth: z.coerce.date().max(new Date(Date.now())).nullable()
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type UserSchemaType = z.infer<typeof UserSchema>;