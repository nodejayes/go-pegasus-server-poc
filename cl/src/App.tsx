import { createSignal, onMount, Show } from "solid-js";
import "./App.css";
import CounterComponent from "./counter.component";
import ButtonComponent from "./ui/base/button.component";
import CenterSingleComponent from "./ui/layouts/center.single.component";
import { ServerEventHandler } from "ts-pegasus-client";
import { InputComponent, InputValidState } from "./ui/base/input.component";

function App() {
  const [secondCounterVisibility, setSecondCounterVisibility] =
    createSignal(true);

  const toggleVisibilitySecondCounter = () =>
    setSecondCounterVisibility(!secondCounterVisibility());

  onMount(() => {
    ServerEventHandler.open({
      actionUrl: "/action",
      eventUrl: "/events",
      clientIdHeaderKey: "clientId",
      reconnectTimeout: 5000,
    });
  });

  return (
    <CenterSingleComponent>
      <div>
        <CounterComponent />
      </div>
      <Show when={secondCounterVisibility()}>
        <div>
          <CounterComponent disabled={true} />
        </div>
      </Show>
      <ButtonComponent onclick={toggleVisibilitySecondCounter}>
        Hide Second
      </ButtonComponent>
      <InputComponent placeholder="Wert eingeben..." label={<span>Wert</span>} controls={<span>Controls</span>} />
      <InputComponent placeholder="Wert eingeben..." label={<span>Wert</span>} />
      <InputComponent placeholder="Wert eingeben..." />
      <InputComponent placeholder="Wert eingeben..." valid={InputValidState.SUCCESS} />
      <InputComponent placeholder="Wert eingeben..." valid={InputValidState.WARNING} />
      <InputComponent placeholder="Wert eingeben..." valid={InputValidState.FAIL} />
    </CenterSingleComponent>
  );
}

export default App;
