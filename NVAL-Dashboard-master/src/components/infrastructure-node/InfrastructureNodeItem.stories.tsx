import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Node, NodeArchitecture } from "../../types";
import InfrastructureNetworkItem from "../infrastructure-network";
import InfrastructureNodeItem from ".";

export default {
  title: "Infrastructure Node Item",
  component: InfrastructureNodeItem,
  argTypes: {},
} as ComponentMeta<typeof InfrastructureNetworkItem>;

const Template: ComponentStory<typeof InfrastructureNodeItem> = (args) => (
  <InfrastructureNodeItem {...args} />
);

const onNodeValueChanged = (value: Node, isValid: boolean) => {
  console.log(value, isValid);
};

export const Primary = Template.bind({});
Primary.args = {
  onValueChange: onNodeValueChanged,
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  node: {
    id: "node-0001",
    hostName: "Node 0001",
    hostAddress: "node-0001.local",
    architecture: NodeArchitecture.X64,
  },
  onValueChange: onNodeValueChanged,
};
