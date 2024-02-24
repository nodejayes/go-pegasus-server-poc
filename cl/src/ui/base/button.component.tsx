import "./button.component.css";
import { Component, JSX, splitProps } from "solid-js";
import CosmicTooltip from "./tooltip.component";

interface ButtonComponentProperties
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  tooltip?: string;
}

const ButtonComponent: Component<ButtonComponentProperties> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  const buttonClass = () =>
    others.disabled ? "cosmic-button cosmic-button-blocking" : "cosmic-button";

  return (
    <button {...others} class={buttonClass()}>
      <CosmicTooltip tooltip={others.tooltip} />
      {local.children}
    </button>
  );
};

export default ButtonComponent;
