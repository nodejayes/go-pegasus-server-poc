import { Component, JSX } from "solid-js";

import "./text.component.css";

interface TextComponentProperties extends JSX.ParamHTMLAttributes<HTMLParagraphElement> {}

const TextComponent: Component<TextComponentProperties> = (props) => {
  return (
    <p class="cosmic-text">
      {props.children}
    </p>
  )
}

export default TextComponent