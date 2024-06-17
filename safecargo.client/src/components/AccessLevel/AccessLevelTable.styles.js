import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.tableHeaderBackground};
  color: ${({ theme }) => theme.tableHeaderTextColor};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.tableRowEvenBackground};
  }

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.tableRowOddBackground};
  }

  &:hover {
    background-color: ${({ theme }) => theme.tableRowHoverBackground};
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.tableBorderColor};
  text-align: left;
`;

export const TableCellButtons = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
  font-size: 18px;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.buttonHoverBackground};
  }

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.tooltipBackground};
    color: ${({ theme }) => theme.tooltipTextColor};
    padding: 5px;
    border-radius: 4px;
    white-space: nowrap;
    font-size: 12px;
    margin-bottom: 5px;
  }
`;

export const DeleteButton = styled(IconButton)`
  &:hover {
    color: red;
  }
`;
