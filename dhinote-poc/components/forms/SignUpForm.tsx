'use client'

import { Eye, EyeOff } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema, SignUpFormValues } from '@/schemas/signup.schema';
import { useRegisterMutation } from "@/lib/redux/auth/authApi";
import { registerUser } from "@/services/auth.service";

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';


export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // const { register: registerUser, loading } = useAuth();
    const [registerUser, { isLoading }] = useRegisterMutation();

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

    const onSubmit = async (data: any) => {
        try {
            // await registerUser(data).unwrap();
            await registerUser({
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            toast.success("Registration Success");
            // alert("Verification email sent");
            router.push('/login');

        } catch (e: any) {
            // alert(e.message || "Signup failed");
            // toast.error("Registration Failed");
            const message = (e as string) || 'Unable to create account';
            toast.error(message);
        }
    };


    return (
        <div className="w-full max-w-[520px] mx-auto flex flex-col items-center">
            <div className="mb-6 flex flex-col items-center">
                <Link href="/" className="w-12 h-12 mb-2 text-[#2AB09C]">
                    <Image
                        src="/images/logo.svg"
                        alt="dhinote logo"
                        width={80}
                        height={80}
                        className=""
                    />
                </Link>
                <span className="text-2xl font-bold tracking-tight text-slate-700">dhinote</span>
            </div>

            <h1 className="text-xl font-medium text-slate-800 mb-8">Create Your Account</h1>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button
                    type="button"
                    className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.5 12.625c0-2.6 2.125-4.4 2.225-4.4-.025-.075-1.375-1.525-2.725-1.525-1.15 0-2.025.675-2.55.675-.525 0-1.6-.65-2.625-.65-1.35 0-2.6 1.05-3.3 2.525-1.425 2.475-.375 6.125 1 8.125.675.975 1.475 1.925 2.525 1.925 1.025 0 1.4-.65 2.65-.65 1.225 0 1.575.65 2.65.65 1.075 0 1.75-1.025 2.475-2.05.775-1.125 1.1-2.225 1.125-2.275-.025-.025-2.175-.825-2.175-3.25zM15.225 6.275c.575-.725.975-1.7.875-2.675-.85.025-1.85.575-2.45 1.275-.525.625-.95 1.625-.85 2.6.95.075 1.875-.475 2.425-1.2z" />
                    </svg>
                    Continue with Apple
                </button>

                <button
                    type="button"
                    className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>
            </div>

            <div className="w-full relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative bg-white px-4 text-sm text-[#248B77]">Or</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
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
                        // disabled={isSubmitting}
                        loading={isLoading}
                    >
                        Create Account
                        {/* {isSubmitting ? "Creating..." : "Create Account"} */}
                    </Button>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-[#248B77] font-medium">
                    Already have an account? <Link href="/login" className="font-bold hover:underline underline-offset-2">Log in</Link>
                </p>

                {/* Terms */}
                <p className="text-center text-xs text-slate-600 mt-6 leading-relaxed">
                    By Creating Account you accept our <Link href="#" className="font-bold text-[#248B77] underline underline-offset-2 decoration-1 hover:text-[#1e7564]">Terms and Conditions</Link> and <Link href="#" className="font-bold text-[#248B77] underline underline-offset-2 decoration-1 hover:text-[#1e7564]">Privacy Policy</Link>
                </p>
            </form>
        </div>
    );
}