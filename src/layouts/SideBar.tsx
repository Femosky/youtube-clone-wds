import {
    Check,
    ChevronDown,
    ChevronUp,
    Clapperboard,
    Clock,
    History,
    Home,
    Library,
    ListVideo,
    PlaySquare,
    Repeat,
} from 'lucide-react';
import { Button, buttonStyles } from '../components/Button';
import { ElementType, ReactNode, Children, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { playlists } from '../data/sidebar';

export function SideBar() {
    return (
        <>
            <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 md:flex flex-col ml-1 hidden lg:hidden">
                <SmallSidebarItem Icon={Home} title="Home" url="/" />
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
                <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
                <SmallSidebarItem Icon={Library} title="Library" url="/library" />
            </aside>
            <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 hidden lg:flex">
                <LargeSidebarSection>
                    <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
                    <LargeSidebarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem IconOrImgUrl={Library} title="Library" url="/library" />
                    <LargeSidebarItem IconOrImgUrl={History} title="History" url="/histroy" />
                    <LargeSidebarItem IconOrImgUrl={PlaySquare} title="Your Videos" url="/your-videos" />
                    <LargeSidebarItem IconOrImgUrl={Clock} title="Watch Later" url="/playlist?list=WL" />
                    {playlists.map((playlist) => (
                        <LargeSidebarItem
                            key={playlist.id}
                            IconOrImgUrl={ListVideo}
                            title={playlist.name}
                            url={`/playlist?list=${playlist.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Subscriptions">
                    <LargeSidebarItem IconOrImgUrl={Library} title="Library" url="/library" />
                </LargeSidebarSection>
            </aside>
        </>
    );
}

type SmallSidebarItemProps = {
    Icon: ElementType;
    title: string;
    url: string;
};

type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string;
    title: string;
    url: string;
    isActive?: boolean;
};

type LargeSidebarSectionProps = {
    children: ReactNode;
    title?: string;
    visibleItemCount?: number;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return (
        <a
            href={url}
            className={twMerge(
                buttonStyles({ variant: 'ghost' }),
                'py-4 px-1 flex flex-col items-center rounded-lg gap-1'
            )}
        >
            <Icon className="w-6 h-6" />
            <div className="text-sm">{title}</div>
        </a>
    );
}

function LargeSidebarSection({
    children,
    title,
    visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const childrenArray = Children.toArray(children).flat();
    const showExpandButton = childrenArray.length > visibleItemCount;
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1 font-semibold">{title}</div>}
            {visibleChildren}
            {showExpandButton && (
                <Button
                    onClick={() => setIsExpanded((e) => !e)}
                    variant="ghost"
                    className="w-full flex items-center rounded-lg gap-4 p-3"
                >
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? 'Show Less' : 'Show More'}</div>
                </Button>
            )}
        </div>
    );
}

function LargeSidebarItem({ IconOrImgUrl, title, url, isActive = false }: LargeSidebarItemProps) {
    return (
        <a
            href={url}
            className={twMerge(
                buttonStyles({ variant: 'ghost' }),
                `w-full flex items-center rounded-lg gap-4 p-3 ${
                    isActive && 'font-bold bg-neutral-100 hover:bg-secondary'
                }`
            )}
        >
            {typeof IconOrImgUrl === 'string' ? (
                <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
            ) : (
                <IconOrImgUrl className="w-6 h-6" />
            )}
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        </a>
    );
}
