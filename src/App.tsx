import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectList } from "./screens/project-list";
import { TsReactTest } from "try-use-array";
import { LoginScreen } from "./screens/login";
function App() {
  return (
    <div className="App">
      {/* <ProjectList /> */}
      {/* <TsReactTest /> */}
      <LoginScreen />
    </div>
  );
}

export default App;
