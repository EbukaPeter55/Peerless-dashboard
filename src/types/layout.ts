export interface SidebarProps {
    collapsed: boolean;
    toggleCollapse: () => void;
    isMobile: boolean;
    closeSidebar: () => void;
}
