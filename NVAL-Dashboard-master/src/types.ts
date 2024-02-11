export type Organization = {
  id: string;
  name: string;
  description: string;
  processes: Process[];
  infrastructure: Infrastructure;
  metrics: Metric[];
  channels: Channel[];
};

export type Process = {
  id: string;
  name: string;
  description: string;
};

export enum NodeArchitecture {
  ARMv7 = "ARMv7",
  X64 = "X64",
}

export enum ChannelType {
  PoA = "Geth_PoA",
  PoW = "Geth_PoW",
}

export enum BNodeType {
  Miner = "Miner",
  FullNode = "Full",
  BootNode = "BootNode",
}

/**
 * Node is in an computed instance e.g. a VM or a raspberry pi
 */
export type Node = {
  id: string;
  architecture: NodeArchitecture;
  hostName: string;
  hostAddress: string;
};

export type Infrastructure = {
  id: string;
  networks: Network[];
};

export type Network = {
  id: string;
  name: string;
  nodes?: Node[];
};

export type BNode = {
  id: string;
  type: BNodeType;
  configs: {
    configStr: string;
    port: number;
    wsport: number;
  };
  node: Node; // BNode is deployed over a Node. And a node could have multiple BNode(s).
};

export type Channel = {
  id: string;
  type: ChannelType;
  configs: {
    genesisStr: string;
  };
  bnodes: BNode[];
};

export type Metric = {
  channel: Channel;
  metricName: string;
  metricRequestId: string;
};

export const defaultMetric = ({
  channel,
  metricName = "ResourceConsumption",
  metricRequestId = "m1",
}: Metric): Metric => ({
  channel: channel,
  metricName: metricName,
  metricRequestId: metricRequestId,
});

// Utility Function

export const queryDistinctNodes = (infrastructure: Infrastructure) => {
  const allNodes = infrastructure.networks
    .map((net: Network, _) => net.nodes)
    .reduce(
      (accumulator, value) =>
        accumulator.concat(
          value.filter(
            (node: Node) =>
              accumulator.findIndex((prevNode) => prevNode.id === node.id) < 0
          )
        ),
      [] as Node[]
    );
  return [...new Set(allNodes)];
};

export const queryAllBNodes = (channels: Channel[]) => {
  return channels
    .map((channel: Channel, _) => channel.bnodes)
    .reduce((accumulator, value) => accumulator.concat(value), [] as BNode[]);
};
