"use client";

import toast from "react-hot-toast";
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormValues, loginSchema } from "@/schemas/login.schema";
// import { useLoginMutation } from "@/lib/redux/auth/authApi";
// import { User } from "@/types/user";
import { signIn, getSession } from "next-auth/react";


export default function LoginForm() {
    const router = useRouter();
    // const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            // await login({
            //     email: data.email,
            //     password: data.password,
            // });

            const res = await signIn("credentials", {
                // ...data,
                email: data.email,
                password: data.password,
                redirect: false,
            });

            console.log('signIn result:', res);

            if (res?.error) {
                toast.error(res.error || 'Invalid email or password');
                setError('root', {
                    type: 'server',
                    message: res.error,
                });
                return;
            }

            const session = await getSession();
            const user = session?.user as any | undefined;
            const isFirst = user?.is_first_time_logged_in;
            if (isFirst === true) {
                toast.success("Login Success");
                router.push("/dashboard");
            } else {
                toast.success("Login Success");
                router.push("/intract");
            }
        } catch (e: any) {
            // alert(e.message || "Login failed");
            // const message = (e as string) || 'Unable to login';           
            // alert(e?.message || e?.error || JSON.stringify(e));
            console.log("LOGIN ERROR :-", e);
            toast.error(e?.data?.message || "Login Failed");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mb-2">
            <Input label="Email" placeholder="Email" {...register("email")} error={errors.email?.message} />
            {/* {errors.email && ( <p className="text-red-500 text-sm mt-1"> {errors.email.message} </p> )} */}

            <Input label="Password" type="password" placeholder="Password"
                {...register("password")}
                error={errors.password?.message}
                autoComplete="current-password"
            />
            {/* {errors.password && ( <p className="text-red-500 text-sm mt-1"> {errors.password.message} </p> )} */}

            <Button type="submit" className="w-full"
            // loading={isLoading}
            >Login</Button>
        </form>
    )
}