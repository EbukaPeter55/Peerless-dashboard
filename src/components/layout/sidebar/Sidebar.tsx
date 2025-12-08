import { NavLink } from "react-router-dom";
import { SidebarContainer, Logo, MenuItem, ToggleButton } from "./Sidebar.styles";
import { FiGrid, FiUser, FiSettings, FiLayers, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface SidebarProps {
    collapsed: boolean;
    toggleCollapse: () => void;
    isMobile: boolean;
    closeSidebar: () => void;
}

export default function Sidebar({ collapsed, toggleCollapse, isMobile, closeSidebar }: SidebarProps) {

    const links = [
        { to: "/", icon: <FiGrid size={20} />, label: "Dashboard" },
        { to: "/departments", icon: <FiLayers size={20} />, label: "Departments" },
        { to: "/patients", icon: <FiUser size={20} />, label: "Patients" },
        { to: "/settings", icon: <FiSettings size={20} />, label: "Settings" },
    ];

    // When a menu item is clicked on mobile → close sidebar
    const handleMobileClick = () => {
        if (isMobile) closeSidebar();
    };

    return (
        <SidebarContainer collapsed={collapsed}>
            <Logo collapsed={collapsed}>Medix.</Logo>

            {links.map(({ to, icon, label }) => (
                <NavLink key={to} to={to} className="nav" end>
                    {({ isActive }) => (
                        <MenuItem
                            collapsed={collapsed}
                            active={isActive}
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