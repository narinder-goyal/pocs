"use client";

import toast from "react-hot-toast";
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useEffect, useMemo, useState, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';

import SideModal from "../ui/SideModal";
import TopicsByCategory from "../topic/TopicsByCategory";

import { fetchDefaultTopics, fetchDefaultTopicCategories, saveUserTopics } from '@/services/topic.service';
import type { DefaultTopic, DefaultTopicsCategory } from '@/services/topic.service';

import { useSession } from "next-auth/react";
import Link from "next/link";


interface TopicClientProps {
    firstName?: string;
    topics?: DefaultTopic[];
    categories?: DefaultTopicsCategory[];
}

interface TopicView {
    id: number;
    name: string;
    categoryName: string;
}

export default function TopicForm({
    firstName,
    topics: initialTopics = [],
    categories: initialCategories = [],
}: TopicClientProps) {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);
    const [appliedTopicIds, setAppliedTopicIds] = useState<number[]>([]);
    const [customTopicsOnPage, setCustomTopicsOnPage] = useState<TopicView[]>([]);
    const [topicName, setTopicName] = useState("");

    const { data: session } = useSession();
    const accessToken = (session as any)?.user?.accessToken;


    const user = session?.user;
    const userId = session?.user.id;

    console.log("userId- ", userId);

    // const user = session?.user as any | undefined;
    // const userId = user?.id as string | undefined;

    const [topics, setTopics] = useState<DefaultTopic[]>(initialTopics);
    const [categories, setCategories] = useState<DefaultTopicsCategory[]>(initialCategories);

    // console.log("session   -> ", session)

    const fechDefTopic = async () => {
        // console.log("accessToken -> ", accessToken);

        const categoriesRes = await fetchDefaultTopicCategories(accessToken);
        const topicsRes = await fetchDefaultTopics(accessToken);

        // console.log("categoriesRes -> ", categoriesRes);
        // console.log("topicsRes -> ", topicsRes);

        setCategories(categoriesRes ?? []);
        setTopics(topicsRes ?? []);

        return { categoriesRes, topicsRes };
    }

    useEffect(() => {
        fechDefTopic()
    }, [accessToken])

    const totalTopics = topics.length;

    const allTopicsFlat = useMemo<TopicView[]>(() => {
        const result: TopicView[] = [];
        // categories.forEach((cat) => {
        (categories || []).forEach((cat) => {
            (cat.defaultTopics || []).forEach((t) => {
                result.push({
                    id: t.id,
                    name: t.name,
                    categoryName: cat.name,
                });
            });
        });
        return result;
    }, [categories]);

    const defaultTopicsOnPage = useMemo<TopicView[]>(() => {
        if (!appliedTopicIds.length) return [];
        const ids = new Set(appliedTopicIds);
        return allTopicsFlat.filter((t) => ids.has(t.id));
    }, [allTopicsFlat, appliedTopicIds]);

    const topicsOnPage = useMemo<TopicView[]>(() => {
        return [...defaultTopicsOnPage, ...customTopicsOnPage];
    }, [defaultTopicsOnPage, customTopicsOnPage]);


    const toggleTopic = (id: number) => {
        setSelectedTopicIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const handleAddTopicOnPage = () => {
        setAppliedTopicIds((prev) => {
            const merged = new Set([...prev, ...selectedTopicIds]);
            return Array.from(merged);
        });
        setIsModalOpen(false);
    };

    const handleTopicNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTopicName(e.target.value);
    };

    const handleCreateTopicClick = () => {
        const trimmed = topicName.trim();
        if (!trimmed) {
            toast.error("Please enter a topic name");
            return;
        }

        const newTopic: TopicView = {
            id: Date.now(),
            name: trimmed,
            categoryName: "Custom",
        };

        setCustomTopicsOnPage((prev) => [...prev, newTopic]);
        setTopicName("");
        toast.success("Topic Created");
    };

    const handleContinue = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session || !userId || !accessToken) {
            toast.error("You must be logged in to continue");
            return;
        }

        if (!topicsOnPage.length) {
            toast.error("Please add at least one topic or skip");
            return;
        }

        const payload = {
            user_id: userId,
            topics: topicsOnPage.map((t) => ({
                name: t.name,
                color_code_id: 1,
            })),
            is_skipped: false,
        };

        try {
            await saveUserTopics(payload, accessToken);
            toast.success("Topics saved");
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Failed to save user topics", err);
            toast.error(err?.message || "Failed to save topics");
        }
    };

    return (
        <>
            <form className="w-full space-y-5 mb-2">
                <Input
                    label="Topic Name"
                    placeholder="e.g., Project Ideas, Meeting Notes, Journal, Project Requirement"
                    value={topicName}
                    onChange={handleTopicNameChange}
                />
                <div className="flex gap-4 w-full">
                    <div className="basis-1/2">
                        <Button type="button" variant="outline" className="w-full"
                            onClick={() => setIsModalOpen(true)}
                        >Need some inspiration?</Button>
                    </div>
                    <div className="basis-1/2">
                        <Button
                            type="button"
                            className="w-full"
                            onClick={handleCreateTopicClick}
                        >Create Topic</Button>
                    </div>
                </div>
            </form>


            <div className='p-[14px]'>
                <Link href="/dashboard" className="flex items-center gap-2">Skip for Now
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z" fill="#606060" /></g><defs><clipPath id="clip0"> <rect width="24" height="24" fill="white" /> </clipPath></defs></svg>
                </Link>
            </div>

            {topicsOnPage.length > 0 && (
                <>
                    <ul className="flex flex-wrap gap-2 text-xs mb-6">
                        {topicsOnPage.map((t) => (
                            <li
                                key={t.id}
                                className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-blue-800"
                                // data-id={t.id} data-categoryName={t.categoryName}
                            >
                                <span>{t.name}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="basis-1/2 mt-auto w-full">
                        <Button
                            type="submit"
                            className="w-full"
                            onClick={handleContinue}
                        >Continue</Button>
                    </div>
                </>
            )}

            {/* Topics SideModal */}
            <SideModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Topic Inspiration"
            >
                <div className="flex flex-col gap-6 py-6 ">
                    <p className="bg-[#2ACAA7]/10 p-[6px] text-[#377A6E] text-sm">Don't worry, you can change the topic name later.</p>
                </div>
                <TopicsByCategory
                    categories={categories}
                    selectedTopicIds={selectedTopicIds}
                    onToggleTopic={toggleTopic}
                    onAddTopicOnPage={handleAddTopicOnPage}
                />
            </SideModal>
        </>
    )
}