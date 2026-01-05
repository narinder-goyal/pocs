'use client';

import type { DefaultTopicsCategory } from '@/services/topic.service';
import Button from '../ui/Button';

interface TopicsByCategoryProps {
    categories?: DefaultTopicsCategory[];
    selectedTopicIds: number[];
    onToggleTopic: (id: number) => void;
    onAddTopicOnPage: () => void;
}

export default function TopicsByCategory({
    categories = [],
    selectedTopicIds,
    onToggleTopic,
    onAddTopicOnPage,
}: TopicsByCategoryProps) {
    if (!categories.length) {
        return (
            <p className="text-sm text-gray-500">
                No topics found
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {categories.map((cat) => (
                <div
                    key={cat.id}
                    className="flex-col"
                >
                    <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-gray-900">
                            Category {cat.id}: {cat.name}
                        </span>
                    </div>

                    {(!cat.defaultTopics || cat.defaultTopics.length === 0) ? (
                        <p className="text-xs text-gray-500">
                            No topics in this category.
                        </p>
                    ) : (
                        <ul className="flex flex-wrap gap-[12px]">
                            {cat.defaultTopics.map((t) => {
                                const isSelected = selectedTopicIds.includes(t.id);
                                return (
                                    <li key={t.id}>
                                        <button
                                            type="button"
                                            onClick={() => onToggleTopic(t.id)}
                                            className={`flex w-full items-center justify-between rounded-full border px-3 py-2 gap-1 text-left bg-[#D0E2FF] ${isSelected
                                                ? 'border-[#0043CE]'
                                                : 'border-transparent'
                                                }`}
                                        >
                                            <span className='text-base/[20px] text-[#0043CE]'>{t.name}</span>
                                            {isSelected && (
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0)">
                                                        <path d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM6.66683 11.3333L3.3335 7.99992L4.2735 7.05992L6.66683 9.44658L11.7268 4.38659L12.6668 5.33325L6.66683 11.3333Z" fill="#0043CE" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect width="16" height="16" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            ))}
            {selectedTopicIds.length > 0 && (
                <Button
                    type="button" className="mt-8"
                    onClick={onAddTopicOnPage}
                >
                    Done
                </Button>
            )}
        </div>
    );
}