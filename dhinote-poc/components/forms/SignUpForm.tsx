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
import { registerUser } from "@/services/auth.service";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';


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

            toast.success("Registration Success");
            setIsConfirmationOpen(true);

            // router.push('/login');

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

                        <Input label="First Name" placeholder="First Name" {...register("firstName")} error={errors.firstName?.message} />
                    </div>
                    <div className="space-y-1.5">

                        <Input label="Last Name" placeholder="Last Name" {...register("lastName")} error={errors.lastName?.message} />

                    </div>
                </div>

                <div className="space-y-1.5">

                    <Input label="Email" placeholder="Email" {...register("email")} error={errors.email?.message} />

                </div>

                <div className="space-y-1.5">

                    <div className="relative">
                        <Input label="Password" type="password" placeholder="Password" {...register("password")} error={errors.password?.message} />


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

                <div className="space-y-1.5">

                    <div className="relative">
                        <Input label="Confirm Password" type="password" placeholder="Confirm Password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />

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


                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        Create Account

                    </Button>
                </div>

            </form>

            <Modal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                primaryActionLabel="Close"
                onPrimaryAction={handleGoToLogin}
            >
                <Image
                    src="/images/msg_img.png"
                    alt="msg logo"
                    width={180}
                    height={180}
                    className="mx-auto mb-3"
                />
                <h3 className="h3 mb-2 text-2xl font-bold">Confirmation Mail Sent</h3>
                <p>Hey there! We've just sent you a confirmation email. Could you please check your inbox and confirm your email address? This will help you get started with logging in. Thanks a bunch!</p>
            </Modal>
        </>
    );
}