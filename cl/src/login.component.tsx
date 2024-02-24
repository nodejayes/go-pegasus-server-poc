import { Component } from "solid-js";
import CenterSingleComponent from "./ui/layouts/center.single";
import CosmicPanel from "./ui/base/panel";
import { CosmicInput } from "./ui/base/input";

import "./login.component.css";
import CosmicButton from "./ui/base/button";
import CosmicCheckbox from "./ui/base/checkbox";

interface LoginComponentProperties {}

const LoginComponent: Component<LoginComponentProperties> = () => {
  const loginNameLabel = () => <span class="label">Login</span>;
  const passwordLabel = () => <span class="label">Password</span>;
  const loginForm = () => (
    <form>
      <CosmicInput placeholder="Loginname..." label={loginNameLabel()} />
      <CosmicInput
        placeholder="Passwort..."
        label={passwordLabel()}
        obfuscate={true}
      />
      <CosmicCheckbox />
      <CosmicButton>Anmelden</CosmicButton>
    </form>
  );

  return (
    <CenterSingleComponent>
      <CosmicPanel content={loginForm()} />
    </CenterSingleComponent>
  );
};

export default LoginComponent;
