'use client';

import type { DefaultTopicsCategory } from '@/services/topic.service';

interface TopicsByCategoryProps {
    categories?: DefaultTopicsCategory[];
    selectedTopicIds: number[];
    onToggleTopic: (id: number) => void;
}

export default function TopicsByCategory({
    categories = [],
    selectedTopicIds,
    onToggleTopic,
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
                                            className={`flex w-full items-center justify-between rounded border px-2 py-1 text-left text-xs ${isSelected
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50'
                                                }`}
                                        >
                                            <span>{t.name}</span>
                                            {isSelected && (
                                                <span className="ml-2 text-[0.65rem] font-semibold uppercase tracking-wide text-blue-600">
                                                    Done
                                                </span>
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}