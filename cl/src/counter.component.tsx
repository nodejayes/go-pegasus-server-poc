import { Component, JSX, createSignal, onCleanup, onMount } from "solid-js";
import "./counter.component.css";
import CosmicText from "./ui/base/text";
import CosmicButton from "./ui/base/button";
import { ServerEventHandler, Subscription } from "ts-pegasus-client";

interface CounterComponentProperties
  extends JSX.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

const CounterComponent: Component<CounterComponentProperties> = (props) => {
  let counterStoreNewSubscription: Subscription | null = null;
  const [counter, setCounter] = createSignal(0);

  onMount(() => {
    counterStoreNewSubscription = ServerEventHandler.subscribe<number>(
      "[counterStore] new",
      (value) => setCounter(value)
    );
    ServerEventHandler.sendAction({
      type: "counter",
      payload: {
        operation: "get",
        value: 0,
      },
    });
  });
  onCleanup(() => {
    counterStoreNewSubscription?.unsubscribe();
  });

  const increment = () => {
    ServerEventHandler.sendAction({
      type: "counter",
      payload: {
        operation: "add",
        value: 1,
      },
    });
  };
  const decrement = () => {
    ServerEventHandler.sendAction({
      type: "counter",
      payload: {
        operation: "sub",
        value: 1,
      },
    });
  };

  return (
    <>
      <CosmicText>Counter: {counter()}</CosmicText>
      <div>
        <CosmicButton
          style={{ width: "45px", height: "45px" }}
          disabled={props.disabled}
          tooltip="Counter um 1 erhöhen"
          onclick={increment}
        >
          +
        </CosmicButton>
        <CosmicButton
          style={{ width: "45px", height: "45px" }}
          tooltip="Counter um 1 verringern"
          onclick={decrement}
        >
          -
        </CosmicButton>
      </div>
    </>
  );
};

export default CounterComponent;
