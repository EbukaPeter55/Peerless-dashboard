import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";

const MobileHamburger = styled.button`
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 200;
  background: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

/* NEW MAIN CONTENT WRAPPER */
const Main = styled.div<{ sidebarWidth: number; isMobile: boolean }>`
  margin-left: ${({ isMobile, sidebarWidth }) => (isMobile ? 0 : sidebarWidth)}px;
  padding: 25px;
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  background: #f7f7f7;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export default function Layout() {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Detect screen size
    useEffect(() => {
        const checkWidth = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setSidebarOpen(!mobile); // hide sidebar on mobile by default
        };

        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    const sidebarWidth = collapsed ? 80 : 240;

    return (
        <>
            {/* MOBILE HAMBURGER */}
            <MobileHamburger onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FiMenu size={24} />
            </MobileHamburger>

            {/* BACKDROP */}
            {isMobile && sidebarOpen && (
                <Backdrop onClick={() => setSidebarOpen(false)} />
            )}

            {/* SIDEBAR */}
            {sidebarOpen && (
                <Sidebar
                    collapsed={collapsed}
                    toggleCollapse={() => setCollapsed(!collapsed)}
                    isMobile={isMobile}
                    closeSidebar={() => isMobile && setSidebarOpen(false)}
                />
            )}

            {/* FIXED MAIN CONTENT WRAPPER */}
            <Main sidebarWidth={sidebarWidth} isMobile={isMobile}>
                <Outlet context={{ sidebarWidth }} />
            </Main>
        </>
    );
}