import Logo from "@/components/Logo";
import { RemoveScroll } from "react-remove-scroll";
import { useTheme } from "next-themes";
import NavLink from "@/components/NavLink";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Dropdown from "./Dropdown";
import { useLanguage } from "@/context/LanguageContext";
import { SelectOption } from "@/types/select";
import { useUserStore } from "@/stores/userStore";

import { navigation } from "@/contstants/navigation";

type SidebarProps = {
    visibleSidebar?: boolean;
    hideSidebar?: boolean;
    onCloseSidebar?: () => void;
};

const Sidebar = ({
    visibleSidebar,
    hideSidebar,
    onCloseSidebar,
}: SidebarProps) => {
    const { t, language, setLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();
    const { user } = useUserStore();

    const themeOptions: SelectOption[] = [
        { id: 'light', name: t.light },
        { id: 'dark', name: t.dark },
    ];

    const currentTheme = themeOptions.find(opt => opt.id === theme) || themeOptions[0];

    const handleThemeChange = (option: SelectOption) => {
        setTheme(option.id as string);
    };

    const getUserStatusBadge = () => {
        const role = user?.role || 'member';
        if (role === 'vip' || role === 'trader' || role === 'admin' || role === 'moderator') {
            return { label: t.statusBadgePartner, color: 'text-primary-02 bg-primary-02/10' };
        }
        return { label: t.statusBadgeFree, color: 'text-t-secondary bg-b-surface2' };
    };

    const languageOptions: SelectOption[] = [
        { id: 'fr', name: 'Français' },
        { id: 'en', name: 'English' },
    ];

    const currentLanguage = languageOptions.find(opt => opt.id === language) || languageOptions[0];

    const handleLanguageChange = (option: SelectOption) => {
        setLanguage(option.id as any);
    };

    return (
    <div
        className={`fixed top-0 left-0 bottom-0 flex flex-col w-85 p-5 bg-b-surface1 border-r border-transparent dark:border-s-border transition-transform duration-300 max-4xl:w-70 max-3xl:w-60 max-xl:w-74 max-md:p-3 ${
            visibleSidebar
                ? `${
                      hideSidebar
                          ? "z-40 translate-x-0"
                          : "max-xl:z-40 max-xl:translate-x-0"
                  }`
                : `${
                      hideSidebar
                          ? "z-40 -translate-x-full"
                          : "max-xl:z-40 max-xl:-translate-x-full"
                  }`
        }`}
    >
        <Logo className="mb-5" />
        <Button
            className={`group absolute top-5 right-5 max-md:top-3 max-md:right-3 ${
                hideSidebar ? "flex" : "!hidden max-xl:!flex"
            }`}
            icon="close"
            onClick={onCloseSidebar}
            isCircle
            isWhite
        />
        <RemoveScroll
            className="flex flex-col gap-1 grow overflow-auto -mx-5 px-5 scrollbar scrollbar-thumb-t-tertiary/50 scrollbar-track-b-surface2 max-md:-mx-3 max-md:px-3"
            enabled={visibleSidebar}
        >
            {navigation.map((item) =>
                item.href ? (
                    <NavLink key={item.title} value={item} />
                ) : (
                    <Dropdown key={item.title} value={item} />
                )
            )}
        </RemoveScroll>
        <div className="mt-auto pt-6 max-md:pt-4 space-y-4">
            {/* Status Badge */}
            {(() => {
                const badge = getUserStatusBadge();
                return (
                    <div className={`flex items-center justify-center gap-2 h-10 rounded-xl text-button font-semibold ${badge.color} ${hideSidebar ? "!w-10 !h-10 !rounded-full !p-0" : ""}`}>
                        {hideSidebar ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15l-2 5L9 18H6l3-3z" fill="currentColor"/>
                                <path d="M18 18h-3l-1 2-2-5 7-7-1-1-7 7-5-2 2-1V8l5-3L12 2l-1 3L8 8v3l-5 2 2 1 7-7 1 1-7 7 2 5 1-2h3l3 5 3-5z" fill="currentColor"/>
                            </svg>
                        ) : (
                            <span>{badge.label}</span>
                        )}
                    </div>
                );
            })()}
            
            {!hideSidebar && (
                <div className="p-3 bg-b-surface2 rounded-xl border border-s-border space-y-3">
                    {/* Language Selector */}
                    <Select
                        value={currentLanguage}
                        onChange={handleLanguageChange}
                        options={languageOptions}
                        classButton="!h-10 !bg-b-surface1 !border-s-border !text-body-2 hover:!border-primary-01/50 transition-colors"
                    />
                    
                    {/* Theme Selector */}
                    <Select
                        value={currentTheme}
                        onChange={handleThemeChange}
                        options={themeOptions}
                        classButton="!h-10 !bg-b-surface1 !border-s-border !text-body-2 hover:!border-primary-01/50 transition-colors"
                    />
                </div>
            )}
        </div>
    </div>
)};

export default Sidebar;
