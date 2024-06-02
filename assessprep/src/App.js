import React, { useContext } from "react";
import AppRoutes from "./routes/route";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeContext } from "./context/ThemeContext";
function App() {
  const { theme } = useContext(ThemeContext);
  const containerStyle = {
    backgroundColor: theme === "light" ? "#ffffff" : "#4c4c4c",
    minHeight: "100vh",
  };
  
  return (
    <div style={containerStyle}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </div>
  );
}

export default App;
