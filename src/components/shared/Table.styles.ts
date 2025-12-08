import styled from "styled-components";

export const TableContainer = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-top: 25px;
  overflow-x: auto; /* Responsive fix */

  @media (max-width: 768px) {
    padding: 15px;
    margin-top: 15px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Ensure table doesn't collapse too much on mobile */

  th, td {
    padding: 15px;
    text-align: left;
  }

  th {
    color: #666;
    font-weight: 600;
  }

  tr {
    border-bottom: 1px solid #eee;
  }
  
  tbody tr:last-child {
      border-bottom: none;
  }
`;

export const TableTitle = styled.h3`
  margin-bottom: 20px;
  color: #333;
`;
