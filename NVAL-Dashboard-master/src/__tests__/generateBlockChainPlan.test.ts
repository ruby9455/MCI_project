import { describe, it } from "vitest";
import BlockchainPlanGenerator from "../core/generateBlockChainPlan";
import BlockChainPlanGeneration from "../pages/generate-plan";
import {
  BNode,
  BNodeType,
  Channel,
  ChannelType,
  Node,
  NodeArchitecture,
  Infrastructure,
  Network,
} from "../types";

describe("BlockChainPlanGenerator in generating BG", () => {
  const bcPlanGenerator = new BlockchainPlanGenerator();
  it("should be constructed", () => {
    expect(bcPlanGenerator).not.toBeNull();
  });

  it("should received empty body", () => {
    expect(bcPlanGenerator.body).not.toBeNull();
    expect(bcPlanGenerator.body).toEqual({});
  });

  // --- More Detail Testing
  const node1: Node = {
    id: "EDGE_TEST_MIXED_0",
    architecture: NodeArchitecture.ARMv7,
    hostName: "Controlled Host 0 of EDGE_TEST_MIXED",
    hostAddress: "crest-edge-1c-p4.local",
  };
  const node2: Node = {
    id: "EDGE_TEST_MIXED_1",
    architecture: NodeArchitecture.ARMv7,
    hostName: "Controlled Host 1 of EDGE_TEST_MIXED",
    hostAddress: "crest-edge-2c-p4.local",
  };
  const bnode1: BNode = {
    id: "Eth-Channel-1-0",
    configs: {
      configStr: "",
      port: 30303,
      wsport: 8546,
    },
    type: BNodeType.Miner,
    node: node1,
  };
  const bnode2: BNode = {
    id: "Eth-Channel-1-1",
    configs: {
      configStr: "",
      port: 30303,
      wsport: 8546,
    },
    type: BNodeType.Miner,
    node: node1,
  };

  const channel1: Channel = {
    id: "Channel-1",
    configs: {
      genesisStr: "",
    },
    type: ChannelType.PoA,
    bnodes: [bnode1, bnode2],
  };

  const expectedBGValue = {
    BNodeChnl: [
      {
        BNodeID: "Eth-Channel-1-0",
        ChnlID: "Channel-1",
      },
      {
        BNodeID: "Eth-Channel-1-1",
        ChnlID: "Channel-1",
      },
    ],
    BNodes: [
      {
        BNodeID: "Eth-Channel-1-0",
        BNodeMetadata: {
          configs: {
            configStr: "",
            port: "30303",
            wsport: "8546",
          },
          nodeType: "Miner",
        },
      },
      {
        BNodeID: "Eth-Channel-1-1",
        BNodeMetadata: {
          configs: {
            configStr: "",
            port: "30303",
            wsport: "8546",
          },
          nodeType: "Miner",
        },
      },
    ],
    Chnls: [
      {
        ChnlID: "Channel-1",
        ChnlMetadata: {
          ChannelConfigs: {
            genesisStr: "",
          },
          ChannelType: "Geth_PoA",
        },
      },
    ],
  };
  it("should generate expected bg value", () => {
    const result = bcPlanGenerator.generateBG([channel1]);
    expect(result["BG"]["Chnls"]).toEqual(expectedBGValue["Chnls"]);
    expect(result["BG"]["BNodes"]).toEqual(expectedBGValue["BNodes"]);
    expect(result["BG"]["BNodeChnl"]).toEqual(expectedBGValue["BNodeChnl"]);
    expect(result["BG"]).toEqual(expectedBGValue);
  });
});

describe("BlockChainPlanGenerator in generating infrastructure", () => {
  const node1: Node = {
    id: "EDGE_TEST_MIXED_0",
    architecture: NodeArchitecture.ARMv7,
    hostName: "Controlled Host 0 of EDGE_TEST_MIXED",
    hostAddress: "crest-edge-1c-p4.local",
  };
  const node2: Node = {
    id: "EDGE_TEST_MIXED_1",
    architecture: NodeArchitecture.ARMv7,
    hostName: "Controlled Host 1 of EDGE_TEST_MIXED",
    hostAddress: "crest-edge-2c-p4.local",
  };
  const network1: Network = {
    id: "public",
    name: "Public Network",
    nodes: [node1, node2],
  };

  const network2: Network = {
    id: "_NVAL",
    name: "NVAL Controller Network",
    nodes: [node1, node2],
  };

  const infrastructure: Infrastructure = {
    id: "TEST_INFRA",
    networks: [network1, network2],
  };

  const expectedNetsVal = [
    {
      netID: "public",
      netMetadata: {
        netName: "Public Internet",
      },
    },
    {
      netID: "_NVAL",
      netMetadata: {
        netName: "NVAL Controller Network",
      },
    },
  ];

  const expectedNodesNetsVal = [
    {
      interfaceMetadata: {
        hostAddr: "crest-edge-1c-p4.local",
      },
      netID: "public",
      nodeID: "EDGE_TEST_MIXED_0",
    },
    {
      interfaceMetadata: {
        hostAddr: "crest-edge-1c-p4.local",
      },
      netID: "_NVAL",
      nodeID: "EDGE_TEST_MIXED_0",
    },
    {
      interfaceMetadata: {
        hostAddr: "crest-edge-2c-p4.local",
      },
      netID: "public",
      nodeID: "EDGE_TEST_MIXED_1",
    },
    {
      interfaceMetadata: {
        hostAddr: "crest-edge-2c-p4.local",
      },
      netID: "_NVAL",
      nodeID: "EDGE_TEST_MIXED_1",
    },
  ];

  const expectedNodesVal = [
    {
      nodeID: "EDGE_TEST_MIXED_0",
      nodeMetadata: {
        architecture: "ARMv7",
        hostName: "Controlled Host 0 of EDGE_TEST_MIXED",
      },
    },
    {
      nodeID: "EDGE_TEST_MIXED_1",
      nodeMetadata: {
        architecture: "ARMv7",
        hostName: "Controlled Host 1 of EDGE_TEST_MIXED",
      },
    },
  ];
  it("should generate infrastructure value", () => {
    const planGenerator = new BlockchainPlanGenerator();
    const infrastructureVal =
      planGenerator.generateInfrastructure(infrastructure);
    expect(infrastructureVal["PG"]["InfraID"]).toEqual(infrastructure.id);
    expect(infrastructureVal["PG"]["Nets"]).toEqual(expectedNetsVal);
    expect(infrastructureVal["PG"]["NodeNet"]).toEqual(expectedNodesNetsVal);
    expect(infrastructureVal["PG"]["Nodes"]).toEqual(expectedNodesVal);
  });
});
