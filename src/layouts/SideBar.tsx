import { Home } from 'lucide-react';
import { buttonStyles } from '../components/Button';
import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

export function SideBar() {
    return (
        <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
            <SmallSidebarItem Icon={Home} title="Home" url="/" />
        </aside>
    );
}

type SmallSidebarItemProps = {
    Icon: ElementType;
    title: string;
    url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return (
        <a
            href={url}
            className={twMerge(buttonStyles({ variant: 'ghost' }), 'py-4 px-1 flex flex-col items-center rounded-lg')}
        >
            <Icon className="w-6 h-6" />
            <div className="text-sm">{title}</div>
        </a>
    );
}
