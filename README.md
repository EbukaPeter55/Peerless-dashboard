# Peerless Dashboard

A comprehensive task management dashboard designed to help users organize, track, and visualize their daily tasks. It provides a centralized place to manage tasks and track their progress.

## Node Version used
**Version 22**

## Technologies used
-   **React**
-   **React Router**
-   **Chart.js**
-   **Styled Components**
-   **React Icons**
-   **Axios**
-   **TypeScript**
-   **Vite**
-   **Jest**
-   **React testing library**
-   **json-server**

## Features
-   **Dashboard Overview**: Visual analytics of task status using interactive Bar and Doughnut charts.
-   **Task Management**: Full capability to view, edit and list tasks.
-   **Status Tracking**: Visual indicators for different task statuses (e.g., Completed, In Progress).
-   **Responsive Interface**: Adaptive layout for seamless usage across devices.
-   **Mock Backend Integration**: Uses `json-server` to simulate real-world API interactions.

## State Management: Context API

I choosed the **React Context API** for managing the application state for several reasons:
1.  **Simplicity & Reduced Boilerplate**: For an application of this scale, Context API provides a lightweight solution without the steep learning curve and excessive boilerplate code associated with libraries like Redux.
2.  **Global State Access**: It effectively solves the "prop-drilling" problem, allowing state (like task lists and user preferences) to be accessible by any component in the tree, intimately connecting the dashboard widgets with the task list.
3.  **Built-in Efficiency**: As a native React feature, it eliminates the need for additional external dependencies, keeping the bundle size smaller and maintenance easier.

## How to run database of this app
### To setup the database and api, do the following below:

Create a .env file in the root directory of the project and add the following line:
```bash
VITE_API_BASE_URL=http://localhost:3000
```

To run this app, you need to have `json-server` installed globally. If not, you can install it using the following command:
```bash
pnpm add -D json-server
```

After installing `json-server`, you can start the server by running the following command:
  
```bash
npx json-server db.json
```

### To run the Frontend React vite app, you must have a miniumu of node 20+, I made use of node v22.12.0

First of all install all dependencies using:

```bash
 pnpm install
 ```
 Then run the app using:
```bash
pnpm dev
```
### To run the test, use the command:
```bash
pnpm test
```

After running the app, you can access it at `http://localhost:5173`.


