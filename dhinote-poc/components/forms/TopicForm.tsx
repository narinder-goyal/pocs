"use client";

import toast from "react-hot-toast";
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormValues, loginSchema } from "@/schemas/login.schema";
import { getSession } from "next-auth/react";
import SideModal from "../ui/SideModal";

export default function TopicForm() {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

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
            console.log("LOGIN ERROR :-", e);
            toast.error(e?.data?.message || "Login Failed");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mb-2">
                <Input label="Topic Name" placeholder="e.g., Project Ideas, Meeting Notes, Journal, Project Requirement" />
                <div className="flex gap-4 w-full">
                    <div className="basis-1/2">
                        <Button type="button" variant="outline" className="w-full"
                            onClick={() => setIsModalOpen(true)}
                        >Need some inspiration?</Button>
                    </div>
                    <div className="basis-1/2">
                        <Button type="submit" className="w-full">Create Topic</Button>
                    </div>
                </div>
            </form>

            {/* Confirmation Modal */}
            <SideModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Topic Inspiration"
            >
                <div className="flex flex-col gap-6 pt-6">
                    <p className="bg-[#2ACAA7]/10 p-[6px] text-[#377A6E] text-sm">Don't worry, you can change the topic name later.</p>
                </div>

            </SideModal>
        </>
    )
}