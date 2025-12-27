import * as yup from 'yup';

export const signupSchema = yup.object({
    firstName: yup
        .string()
        .required('First Name is required')
        .max(50, 'First Name exceeds maximum length of 50 characters'),
    lastName: yup
        .string()
        .required('Last Name is required')
        .max(50, 'Last Name exceeds maximum length of 50 characters'),
    email: yup
        .string()
        .required('Email is required')
        .max(255, 'Email exceeds maximum length')
        .email('Invalid email format'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be between 8 and 24 characters')
        .max(24, 'Password must be between 8 and 24 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,24}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        ),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords do not match'),
    // phone: yup.string().optional(),
});

export type SignUpFormValues = yup.InferType<typeof signupSchema>;