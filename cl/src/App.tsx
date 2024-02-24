import { onMount } from "solid-js";
import "./App.css";
import { ServerEventHandler } from "ts-pegasus-client";
import { Route, Router } from "@solidjs/router";
import LoginComponent from "./login.component";

function App() {
  onMount(() => {
    ServerEventHandler.open({
      actionUrl: "/action",
      eventUrl: "/events",
      clientIdHeaderKey: "clientId",
      reconnectTimeout: 5000,
    });
  });

  return (
    <Router>
      <Route path="/login" component={LoginComponent} />
    </Router>
  );
}

export default App;
