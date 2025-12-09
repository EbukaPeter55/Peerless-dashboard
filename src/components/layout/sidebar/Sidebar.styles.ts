import styled from "styled-components";

export const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "80px" : "240px")};
  transition: 0.3s ease;
  background: white;
  height: 100vh;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
  position: fixed;
  z-index: 100;

  a.nav {
    text-decoration: none;
    color: inherit;
  }
`;

export const Logo = styled.div<{ $collapsed: boolean }>`
  font-size: ${({ $collapsed }) => ($collapsed ? "20px" : "26px")};
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: #6c4af2;
`;

export const MenuItem = styled.div<{ $collapsed: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $collapsed }) => ($collapsed ? "0" : "14px")};
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#f1eaff" : "transparent")};

  &:hover {
    background: #f4f4f4;
  }

  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
  }
`;

export const ToggleButton = styled.button`
  margin-top: auto;
  border: none;
  background: #eae6ff;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
`;