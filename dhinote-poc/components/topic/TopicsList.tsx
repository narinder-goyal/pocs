'use client';

interface Topics {
    id: number;
    name: string;
    categoryName?: string;
    bgColor?: string;
    textColor?: string;
}

interface TopicsListProps {
    topics: Topics[];
}

export default function TopicsList({
    topics,
}: TopicsListProps) {

    return (
        <ul className="flex flex-wrap gap-2 text-xs mb-6">
            {topics.map((t) => (
                <li
                    key={t.id}
                    className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-blue-800"
                    style={{ backgroundColor: t.bgColor ?? '#EFF6FF', color: t.textColor ?? '#1D4ED8', }}
                    data-categoryname={t.categoryName}

                >
                    <span>{t.name}</span>
                </li>
            ))}
        </ul>
    )
}


