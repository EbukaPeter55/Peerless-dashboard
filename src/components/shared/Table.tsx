import type { ReactNode } from "react";
import { TableContainer, StyledTable, TableTitle } from "./Table.styles";

export interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
}

interface TableProps<T> {
    title?: string;
    columns: Column<T>[];
    data: T[];
}

export default function Table<T>({ title, columns, data }: TableProps<T>) {
    return (
        <TableContainer>
            {title && <TableTitle>{title}</TableTitle>}
            <StyledTable>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col) => (
                                <td key={`${rowIndex}-${col.key}`}>
                                    {col.render
                                        ? col.render(row)
                                        : (row as any)[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
}
