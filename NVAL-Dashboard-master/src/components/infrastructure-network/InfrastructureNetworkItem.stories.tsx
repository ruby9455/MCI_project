import { ComponentMeta, ComponentStory } from "@storybook/react";
import InfrastructureNetworkItem from ".";
import { Network, NodeArchitecture } from '../../types';

export default {
  title: "Infrastructure Network Item",
  component: InfrastructureNetworkItem,
  argTypes: {},
} as ComponentMeta<typeof InfrastructureNetworkItem>;

const Template: ComponentStory<typeof InfrastructureNetworkItem> = (args) => (
  <InfrastructureNetworkItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export const NVALNetwork = Template.bind({
});
NVALNetwork.args = {
  name: "nval-network-item",
  isNVALNetwork: true,
}

export const DefaultWithoutNode = Template.bind({});
DefaultWithoutNode.args = {
  name: "with-default-network-item",
  network: {
    id: "external-net",
    name: "External Network",
  },
  onValueChange: (value, isValid) => {
    console.log(value, isValid);
  }
};

export const DefaultWithNodes = Template.bind({});
DefaultWithoutNode.args = {
  name: "with-default-network-item",
  network: {
    id: "external-net",
    name: "External Network",
    nodes: [{
      id: "node-001",
      architecture: NodeArchitecture.ARMv7,
      hostName: "Node 001",
      hostAddress: "node-001.local"
    }, {
      id: "node-002",
      architecture: NodeArchitecture.X64,
      hostName: "Node 002",
      hostAddress: "node-002.local"
    }, {
      id: "node-003",
      architecture: NodeArchitecture.X64,
      hostName: "Node 003",
      hostAddress: "node-003.local"
    }, {
      id: "node-004",
      architecture: NodeArchitecture.ARMv7,
      hostName: "Node 004",
      hostAddress: "node-004.local"
    }, {
      id: "node-005",
      architecture: NodeArchitecture.ARMv7,
      hostName: "Node 005",
      hostAddress: "node-005.local"
    }]
  },
  onValueChange: (value, isValid) => {
    console.log(value, isValid);
  }
};