import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .max(255, 'Email exceeds maximum length')
        .email('Invalid email format'),
    password: yup.string().required('Password is required'),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;