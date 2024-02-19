import { Component, JSX, Show, createSignal, splitProps } from "solid-js";
import "./input.component.css";
import { v4 } from "uuid";

interface InputComponentProperties
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: JSX.Element;
  controls?: JSX.Element;
  placeholder?: string;
  name?: string;
  id?: string;
  typ?: InputType;
  valid?: InputValidState;
}

enum InputType {
  TEXT = "text",
  PASSWORD = "password",
}

enum InputValidState {
  SUCCESS = "success",
  WARNING = "warning",
  FAIL = "fail",
  NONE = "none",
}

const InputComponent: Component<InputComponentProperties> = (props) => {
  const [_, others] = splitProps(props, ["children"]);
  const [inputFocus, setInputFocus] = createSignal(false);

  if (!others.id) {
    others.id = v4();
  }

  const getType = () =>
    others.typ === InputType.PASSWORD ? "password" : "text";
  const getStateClass = () => {
    if (others.valid === InputValidState.SUCCESS) {
      return `input-control success ${inputFocus() ? 'focusSuccess' : ''}`;
    }
    if (others.valid === InputValidState.WARNING) {
      return `input-control warning ${inputFocus() ? 'focusWarning' : ''}`;
    }
    if (others.valid === InputValidState.FAIL) {
      return `input-control fail ${inputFocus() ? 'focusFail' : ''}`;
    }
    return `input-control ${inputFocus() ? 'focus' : ''}`;
  };
  const inputGetFocus = () => {
    setInputFocus(true);
  };
  const inputLostFocus = () => {
    setInputFocus(false);
  };

  return (
    <div class={getStateClass()}>
      <Show when={others.label}>
        <span class="label-section">{others.label}</span>
      </Show>
      <input {...others} class="input" type={getType()} onfocusin={inputGetFocus} onfocusout={inputLostFocus} />
      <Show when={others.controls}>
        <span class="control-section">{others.controls}</span>
      </Show>
    </div>
  );
};

export { InputComponent, InputType, InputValidState };
