import { describe, it } from "vitest";
import { Infrastructure, Node, Network, NodeArchitecture, queryDistinctNodes } from '../types';

describe("Ultility functions tests", () => {
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

  it("Should return a distinct list of node", () => {
    const distinctNodes = queryDistinctNodes(infrastructure);
    // console.log(JSON.stringify(distinctNodes));
    expect(distinctNodes.length).toBe(2);
  });

  const node3: Node = {
    id: "EDGE_TEST_MIXED_2",
    architecture: NodeArchitecture.ARMv7,
    hostName: "Controlled Host 3 of EDGE_TEST_MIXED",
    hostAddress: "crest-edge-3c-p3.local",
  };

  it("Should return 3 distinct nodes", () => {
    network1.nodes.push(node3);
    const distinctNodes = queryDistinctNodes(infrastructure);
    // console.log(JSON.stringify(distinctNodes));
    expect(distinctNodes.length).toBe(3);
  })
});
