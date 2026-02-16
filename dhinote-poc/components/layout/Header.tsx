'use client';

import { useState } from 'react';

import SignOutButton from "../auth/SignOut";

import Input from "../ui/Input";
import SideModal from '../ui/SideModal';
import Setting from './Setting';

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (<>
        <header className="border-gray-200 px-0 py-0 md:relative z-[1000] md:z-[10]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className=" max-[1024px]:!fixed max-[1024px]:top-[80px] justify-end max-[769px]:top-[17px] right-[13px] z-[1000] md:static w-50 flex items-center md:space-x-2 space-x-1 mb-0 md:mb-0 md:justify-end md:w-auto order-1 md:order-2">
                    <button type="button" title="Send Feedback" className="p-0 md:pl-0 pl-0 mr-[15px] text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100">
                        <img alt="Feedback" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="/_next/static/media/feedback.48a61ce3.svg" />
                    </button>
                    <button type="button" title="Notifications" className="p-0 md:pl-0 pl-0 mr-[15px] text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 relative">
                        <img alt="Notifications" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="/_next/static/media/notifications.410a75e8.svg" />
                    </button>
                    <button type="button" title="Settings" className="p-0 md:pl-0 pl-0 mr-[15px] text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100" onClick={() => setIsModalOpen(true)}>
                        <img alt="Settings" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="/_next/static/media/setting.8cf0c4e6.svg" />
                    </button>
                    <button type="button" title="Logout" className="p-0 md:pl-0 pl-0 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100">
                        <img alt="Logout" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="/_next/static/media/power_settings_new.4338430d.svg" />
                    </button>
                    <SignOutButton />
                </div>

                <div className="w-full md:flex-1 md:max-w-2xl order-2 md:order-1 max-[1024px]:mt-[80px]">
                    <form className="shadow-[4px_4px_8px_0px_#2ACAA714] flex overflow-hidden gap-1 items-center self-stretch pt-2 pb-[7px] md:py-[13px] px-[12px] my-auto text-sm font-medium leading-none bg-white rounded-lg md:min-h-[52px] min-w-60 border-[#E5E5E5] border-1 text-neutral-300 w-full md:w-[354px]">
                        <img alt="Search" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" src="/_next/static/media/search.79181ba4.svg" />
                        {/* <Input className="flex-1 shrink self-stretch my-auto basis-0 text-ellipsis text-[#333333] bg-transparent border-none outline-none placeholder-[#D2D2D2]" placeholder="Search Topics, Notes and Tasks" type="text" value="test" /> */}
                    </form>
                </div>
            </div>
        </header>

        <SideModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Topic Inspiration"
        >
            <Setting />
        </SideModal>

    </>
    );
}