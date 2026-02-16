"use client";

import toast from "react-hot-toast";
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useEffect, useMemo, useState, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';

import SideModal from "../ui/SideModal";
import TopicsByCategory from "../topic/TopicsByCategory";

import {
    fetchDefaultTopics,
    fetchDefaultTopicCategories,
    saveUserTopics,
    fetchColorCodes
} from '@/services/topic.service';
import type {
    DefaultTopic,
    DefaultTopicsCategory,
    ColorCode
} from '@/services/topic.service';

import { useSession } from "next-auth/react";
import Link from "next/link";
import TopicsList from "../topic/TopicsList";


interface TopicClientProps {
    firstName?: string;
    topics?: DefaultTopic[];
    categories?: DefaultTopicsCategory[];
}

interface TopicView {
    id: number;
    name: string;
    categoryName?: string;
    colorCodeId?: number;
    bgColor?: string;
    textColor?: string;
    sourceTopicId?: number;
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
    const [modalTopicsOnPage, setModalTopicsOnPage] = useState<TopicView[]>([]);

    const [topicName, setTopicName] = useState("");

    const { data: session } = useSession();
    const accessToken = (session as any)?.user?.accessToken;

    const user = session?.user;
    const userId = session?.user.id;

    const [topics, setTopics] = useState<DefaultTopic[]>(initialTopics);
    const [categories, setCategories] = useState<DefaultTopicsCategory[]>(initialCategories);
    const [colorCodes, setColorCodes] = useState<ColorCode[]>([]);

    const fechDefTopic = async () => {
        try {
            if (accessToken) {
                const categoriesRes = await fetchDefaultTopicCategories(accessToken);
                const topicsRes = await fetchDefaultTopics(accessToken);
                const colorCodesRes = await fetchColorCodes(accessToken);
                setCategories(categoriesRes ?? []);
                setTopics(topicsRes ?? []);
                setColorCodes(colorCodesRes ?? []);

                return { categoriesRes, topicsRes, colorCodesRes };
            }

        } catch (err: any) {
            console.error("Failed to load data", err);
            toast.error(err?.message || "Failed to load Data");
        }
    }

    useEffect(() => {
        fechDefTopic()
    }, [accessToken])

    const totalTopics = topics.length;

    const allTopicsFlat = useMemo<TopicView[]>(() => {
        const result: TopicView[] = [];
        (categories || []).forEach((cat) => {
            const list = (cat as any).defaultTopics ?? (cat as any).default_topics ?? [];
            list.forEach((t: any) => {
                result.push({
                    id: t.id,
                    name: t.name,
                    categoryName: cat.name,
                });
            });
        });
        return result;
    }, [categories]);

    const pickRandomColor = (): ColorCode | undefined => {
        if (!colorCodes.length) return undefined;
        const idx = Math.floor(Math.random() * colorCodes.length);
        return colorCodes[idx];
    };

    const defaultTopicsOnPage = useMemo<TopicView[]>(() => {
        if (!appliedTopicIds.length) return [];
        const ids = new Set(appliedTopicIds);
        return allTopicsFlat.filter((t) => ids.has(t.id));
    }, [allTopicsFlat, appliedTopicIds]);

    const topicsOnPage = useMemo<TopicView[]>(() => {
        return [...defaultTopicsOnPage, ...modalTopicsOnPage, ...customTopicsOnPage];
    }, [defaultTopicsOnPage, modalTopicsOnPage, customTopicsOnPage]);


    const toggleTopic = (id: number) => {
        setSelectedTopicIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const handleAddTopicOnPage = () => {
        setModalTopicsOnPage((prev) => {
            const existingBySourceId = new Map<number, TopicView>();

            prev.forEach((t) => {
                if (t.sourceTopicId != null) {
                    existingBySourceId.set(t.sourceTopicId, t);
                }
            });

            const newList: TopicView[] = [];

            selectedTopicIds.forEach((bid) => {
                const base = allTopicsFlat.find((t) => t.id === bid);

                if (!base) return;

                const existing = existingBySourceId.get(bid);

                if (existing) {
                    newList.push(existing);
                } else {
                    const color = pickRandomColor();
                    newList.push({
                        id: Date.now() + bid,
                        sourceTopicId: bid,
                        name: base.name,
                        categoryName: base.categoryName,
                        colorCodeId: color?.id,
                        bgColor: color?.bg_color_code,
                        textColor: color?.text_color_code,
                    });
                }
            });
            return newList;
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
        const color = pickRandomColor();

        const newTopic: TopicView = {
            id: Date.now(),
            name: trimmed,
            categoryName: "Custom",
            colorCodeId: color?.id,
            bgColor: color?.bg_color_code,
            textColor: color?.text_color_code,
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
        const defaultColorId = topicsOnPage.find((t) => t.colorCodeId)?.colorCodeId ?? colorCodes[0]?.id ?? 0;

        const payload = {
            user_id: userId,
            topics: topicsOnPage.map((t) => ({
                name: t.name,
                color_code_id: t.colorCodeId ?? defaultColorId,
            })),
            is_skipped: false,
        };

        try {
            await saveUserTopics(payload, accessToken);
            toast.success("Topics saved");
            router.push("/dashboard");
        } catch (err: any) {
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


                <div className='p-[14px] flex justify-center'>
                    <Link href="/dashboard" className="flex items-center gap-2">Skip for Now
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z" fill="#606060" /></g><defs><clipPath id="clip0"> <rect width="24" height="24" fill="white" /> </clipPath></defs></svg>
                    </Link>
                </div>

                {topicsOnPage.length > 0 && (
                    <>
                        <TopicsList topics={topicsOnPage} />

                        <div className="basis-1/2 mt-auto mx-auto pb-2 w-full md:w-[60%]">
                            <Button
                                type="submit"
                                className="w-full"
                                onClick={handleContinue}
                            >Continue</Button>
                        </div>
                    </>
                )}
            </form>

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