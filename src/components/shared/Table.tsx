import { TableContainer, StyledTable, TableTitle } from "./Table.styles";

import type { TableProps } from "../../types/table";

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
