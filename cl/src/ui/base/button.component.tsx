import "./button.component.css";
import { Component, JSX, splitProps, Show } from "solid-js";

interface ButtonComponentProperties
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  tooltip?: string;
}

const ButtonComponent: Component<ButtonComponentProperties> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  const buttonClass = () =>
    others.disabled ? "cosmic-button cosmic-button-blocking" : "cosmic-button";
  const hasTooltipContent = () => !!others.tooltip;

  return (
    <button {...others} class={buttonClass()}>
      <Show when={hasTooltipContent()}>
        <span class="tooltip" data-text-initial={others.tooltip}></span>
      </Show>
      {local.children}
    </button>
  );
};

export default ButtonComponent;
