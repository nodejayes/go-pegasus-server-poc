import { Component, JSX, Show, splitProps } from 'solid-js';
import './tooltip.css';

interface CosmicTooltipProperties extends JSX.HTMLAttributes<HTMLSpanElement> {
  tooltip?: string;
}

const CosmicTooltip: Component<CosmicTooltipProperties> = (props) => {
  const [_, others] = splitProps(props, ["children"]);
  return (
    <Show when={others.tooltip}>
      <span class="tooltip" data-text-initial={others.tooltip}></span>
    </Show>
  )
};

export default CosmicTooltip;