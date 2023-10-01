import {z} from 'zod'

export const signUpSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6, "Password must be least 6 characters."),
    confirmPassword: z.string(),
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"]
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()

})

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;


