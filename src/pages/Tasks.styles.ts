import styled from "styled-components";
import { FiEye, FiEdit2 } from "react-icons/fi";
import { getStatusColor, getStatusBgColor } from "../utils/statusUtils";

export const Page = styled.div`
  padding: 0 20px; /* Added breathing space */
  
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

export const Title = styled.h2`
  margin: 0;
  color: #333;
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  min-width: 150px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #6c4af2;
  }
`;

export const StartSelect = styled(Select)`
    width: 100%;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  
  &:hover {
      background: #f5f5f5;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  p {
      color: #555;
      line-height: 1.5;
      margin: 5px 0 0 0;
  }
  
  label {
      font-weight: 600;
      font-size: 14px;
      color: #333;
  }
`;

export const SaveButton = styled.button`
    background: #6c4af2;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 10px;
    
    &:hover {
        background: #5b3ddb;
    }
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const StatusBadge = styled.span<{ $status: string }>` // Transient prop $status
    padding: 6px 12px;
    border-radius: 8px;
    font-weight: 500;
    
    background: ${({ $status }) => getStatusBgColor($status)};
    
    color: ${({ $status }) => getStatusColor($status)};
`;

export const ActionsContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const ViewIcon = styled(FiEye)`
    cursor: pointer;
    color: #666;
    &:hover { color: #333; }
`;

export const EditIcon = styled(FiEdit2)`
    cursor: pointer;
    color: #6c4af2;
    &:hover { color: #5b3ddb; }
`;
