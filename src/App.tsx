import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { TaskProvider } from "./context/TaskContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;