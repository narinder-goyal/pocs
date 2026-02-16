export default function LeftSideBar() {
    return (
        <nav className="flex flex-col self-stretch bg-white border-r border-solid border-r-neutral-200 md:min-w-[371px] md:max-w-[371px] md:top-0 md:left-0 h-full overflow-y-auto topics-list-sidebar min-h-screen">
            <div className="sticky top-0 z-10 bg-white md:pt-10 md:pr-[20px] md:pl-[40px] w-full p-4 max-[1024px]:!p-[15px]">
                <img alt="Dhinote logo" loading="lazy" width="126" height="32" className="lg:block w-[126px] object-contain cursor-pointer hover:opacity-80 transition-opacity" src="/_next/static/media/logo.d1265b54.svg" />
            </div>
        </nav>
    );
}