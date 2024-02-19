import { Component, JSX, createSignal, onCleanup, onMount } from "solid-js";
import "./counter.component.css";
import TextComponent from "./ui/base/text.component";
import ButtonComponent from "./ui/base/button.component";
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
      <TextComponent>Counter: {counter()}</TextComponent>
      <div>
        <ButtonComponent
          style={{ width: "45px", height: "45px" }}
          disabled={props.disabled}
          tooltip="Counter um 1 erhöhen"
          onclick={increment}
        >
          +
        </ButtonComponent>
        <ButtonComponent
          style={{ width: "45px", height: "45px" }}
          tooltip="Counter um 1 verringern"
          onclick={decrement}
        >
          -
        </ButtonComponent>
      </div>
    </>
  );
};

export default CounterComponent;
