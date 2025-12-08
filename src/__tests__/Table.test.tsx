import { render, screen } from "@testing-library/react";
import Table, { type Column } from "../components/shared/Table";
import "@testing-library/jest-dom";

interface TestData {
    id: number;
    name: string;
    role: string;
}

const columns: Column<TestData>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
];

const data: TestData[] = [
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "User" },
];

describe("Table Component", () => {
    test("renders table headers and data correctly", () => {
        render(<Table columns={columns} data={data} title="Test Table" />);

        // Check if title is rendered
        expect(screen.getByText("Test Table")).toBeInTheDocument();

        // Check if headers are rendered
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Role")).toBeInTheDocument();

        // Check if data is rendered
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Admin")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText("User")).toBeInTheDocument();
    });

    test("renders custom cell content", () => {
        const customColumns: Column<TestData>[] = [
            { key: "id", header: "ID" },
            {
                key: "name",
                header: "Name",
                render: (item) => <span data-testid="custom-name">{item.name.toUpperCase()}</span>
            }
        ];

        render(<Table columns={customColumns} data={data} />);

        const customName = screen.getAllByTestId("custom-name")[0];
        expect(customName).toHaveTextContent("ALICE");
    });
});
