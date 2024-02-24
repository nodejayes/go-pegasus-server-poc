import { Component, JSX, Show } from "solid-js";

interface CosmicPanelProperties {
  header?: JSX.Element;
  content?: JSX.Element;
  footer?: JSX.Element;
}

const CosmicPanel: Component<CosmicPanelProperties> = (props) => {
  return (
    <div class="cosmic-panel">
      <Show when={props.header}>
        <div class="cosmic-panel-header">{props.header}</div>
      </Show>
      <Show when={props.content}>
        <div class="cosmic-panel-content">{props.content}</div>
      </Show>
      <Show when={props.footer}>
        <div class="cosmic-panel-footer">{props.footer}</div>
      </Show>
    </div>
  );
};

export default CosmicPanel;
