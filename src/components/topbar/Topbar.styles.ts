import styled from "styled-components";

export const TopbarWrapper = styled.div`
  height: 70px;
  width: 100%;
  background: white;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 25px;
  gap: 20px;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const SearchInput = styled.input`
  padding: 10px 15px;
  width: 320px;
  outline: none;
  border-radius: 8px;
  border: 1px solid #ddd;
`;