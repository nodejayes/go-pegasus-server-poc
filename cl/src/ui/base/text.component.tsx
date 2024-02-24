import { Component, JSX } from "solid-js";

import "./text.component.css";

interface TextComponentProperties
  extends JSX.ParamHTMLAttributes<HTMLParagraphElement> {}

const CosmicText: Component<TextComponentProperties> = (props) => {
  return <p class="cosmic-text">{props.children}</p>;
};

export default CosmicText;
