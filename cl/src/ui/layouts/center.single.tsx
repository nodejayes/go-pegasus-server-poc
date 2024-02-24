import { Component, JSX } from "solid-js";
import "./center.single.css";

interface CenterSingleComponentProperties extends JSX.HTMLAttributes<HTMLDivElement> {}

const CenterSingleComponent: Component<CenterSingleComponentProperties> = (props) => {
  return (
    <div class="app">
      <div class="content">
        {props.children}
      </div>
    </div>
  )
}

export default CenterSingleComponent;