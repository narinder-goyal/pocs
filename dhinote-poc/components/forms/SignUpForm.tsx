'use client'

import { Eye, EyeOff } from 'lucide-react';

import toast from "react-hot-toast";
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema, SignUpFormValues } from '@/schemas/signup.schema';
// import { useRegisterMutation } from "@/lib/redux/auth/authApi";
import { registerUser } from "@/services/auth.service";
import { signIn } from 'next-auth/react';


export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState<string>('');

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: yupResolver(signupSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignUpFormValues) => {
        try {
            await registerUser({
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });

            // const result = await signIn('credentials', {
            //     email: data.email,
            //     password: data.password,
            //     redirect: false,
            // });
            // if (result?.error) {router.push('/login');} else {router.push('/dashboard');}

            toast.success("Registration Success");
            setIsConfirmationOpen(true);

            router.push('/login');

        } catch (e: any) {
            const msg = e?.message || '';
            const message = (e as string) || 'Unable to create account';

            if (/email/i.test(msg) && /exist|already/i.test(msg)) {
                toast.error('Email already in use');
                setError('email', {
                    type: 'server',
                    message: 'Email already in use',
                });
            } else if (/network/i.test(msg)) {
                toast.error('Network connection unavailable');
                setError('root', {
                    type: 'server',
                    message: 'Network connection unavailable',
                });
            } else {
                toast.error(message);
                setError('root', {
                    type: 'server',
                    message: msg || 'Unable to create account',
                });
            }
        }
    };

    const handleGoToLogin = () => {
        setIsConfirmationOpen(false);
        router.push('/login');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5  mb-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        {/* <label htmlFor="firstName" className="block text-sm font-medium text-slate-600">First Name</label> */}
                        <Input label="First Name" placeholder="First Name" {...register("firstName")} error={errors.firstName?.message} />
                        {/* {errors.firstName && (<p className="text-red-500 text-sm mt-1"> {errors.firstName.message}</p> )} */}
                    </div>
                    <div className="space-y-1.5">
                        {/* <label htmlFor="lastName" className="block text-sm font-medium text-slate-600">Last Name</label> */}
                        <Input label="Last Name" placeholder="Last Name" {...register("lastName")} error={errors.lastName?.message} />
                        {/* {errors.lastName && ( <p className="text-red-500 text-sm mt-1"> {errors.lastName.message} </p> )} */}
                    </div>
                </div>

                <div className="space-y-1.5">
                    {/* <label htmlFor="email" className="block text-sm font-medium text-slate-600">Email</label> */}
                    <Input label="Email" placeholder="Email" {...register("email")} error={errors.email?.message} />
                    {/* {errors.email && ( <p className="text-red-500 text-sm mt-1"> {errors.email.message} </p> )} */}
                </div>

                <div className="space-y-1.5">
                    {/* <label htmlFor="password" className="block text-sm font-medium text-slate-600">Password</label> */}
                    <div className="relative">
                        <Input label="Password" type="password" placeholder="Password" {...register("password")} error={errors.password?.message} />
                        {/* {errors.password && ( <p className="text-red-500 text-sm mt-1">{errors.password.message}</p> )} */}

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none h-[42px]"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                    {/* <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-600">Confirm Password</label> */}
                    <div className="relative">
                        <Input label="Confirm Password" type="password" placeholder="Confirm Password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
                        {/* {errors.confirmPassword && ( <p className="text-red-500 text-sm mt-1"> {errors.confirmPassword.message}</p> )} */}
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none h-[42px]"
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                            {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    // loading={isLoading}
                    >
                        Create Account
                        {/* {isSubmitting ? "Creating..." : "Create Account"} */}
                    </Button>
                </div>

            </form>

            {/* Confirmation Modal */}
            <Modal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                title="Confirmation Mail Sent"
                primaryActionLabel="Go to Login"
                onPrimaryAction={handleGoToLogin}
            >
                <p className="mb-2">
                    We&apos;ve sent a confirmation email to{' '}
                    <span className="font-medium">{registeredEmail}</span>.
                </p>
                <p>
                    Please check your inbox and click the verification link to
                    confirm your email address. Once verified, you can log in and
                    start using DhiNote.
                </p>
            </Modal>
        </>
    );
}