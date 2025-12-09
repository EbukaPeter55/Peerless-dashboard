import { NavLink } from "react-router-dom";
import { SidebarContainer, Logo, MenuItem, ToggleButton } from "./Sidebar.styles";
import { FiGrid, FiLayers, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import type { SidebarProps } from "../../../types/layout";

export default function Sidebar({ collapsed, toggleCollapse, isMobile, closeSidebar }: SidebarProps) {

    const links = [
        { to: "/", icon: <FiGrid size={20} />, label: "Dashboard" },
        { to: "/task", icon: <FiLayers size={20} />, label: "Tasks" }
    ];

    // When a menu item is clicked on mobile → close sidebar
    const handleMobileClick = () => {
        if (isMobile) closeSidebar();
    };

    return (
        <SidebarContainer $collapsed={collapsed}>
            <Logo $collapsed={collapsed}>Taskify.</Logo>

            {links.map(({ to, icon, label }) => (
                <NavLink key={to} to={to} className="nav" end>
                    {({ isActive }) => (
                        <MenuItem
                            $collapsed={collapsed}
                            $active={isActive}
                            onClick={handleMobileClick}
                        >
                            {icon}
                            {!collapsed && <span>{label}</span>}
                        </MenuItem>
                    )}
                </NavLink>
            ))}

            {!isMobile && (
                <ToggleButton onClick={toggleCollapse}>
                    {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
                </ToggleButton>
            )}
        </SidebarContainer>
    );
}