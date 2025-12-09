export const getStatusColor = (status: string): string => {
    switch (status) {
        case "Completed": return "#0a9a00"; // Green
        case "In Progress": return "#d97706"; // Orange
        case "Pending": return "#cc0000"; // Red
        default: return "#6C4AF2"; // Default Purple
    }
};

export const getStatusBgColor = (status: string): string => {
    switch (status) {
        case "Completed": return "#e6ffe8";
        case "In Progress": return "#fff4e6";
        default: return "#ffe6e6";
    }
};
