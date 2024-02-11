import { queryAllBNodes, queryDistinctNodes } from "./../types";
import {
  Channel,
  Infrastructure,
  BNode,
  Organization,
  Process,
  Node,
  Metric,
} from "../types";

class BlockchainPlanGenerator {
  private _body: { [name: string]: any };

  constructor() {
    this._body = {};
  }

  get body() {
    return this._body;
  }

  generateBG(channels: Channel[]): {
    BG: {
      Chnls: Array<{ [name: string]: any }>;
      BNodes: Array<{ [name: string]: any }>;
      BNodeChnl: Array<{ [name: string]: any }>;
    };
  } {
    let channelsVal: Array<{ [name: string]: any }> = [];
    let bNodesVal: Array<{ [name: string]: any }> = [];
    let channelBNodeMappingVal: Array<{ [name: string]: any }> = [];
    channels.forEach((channel) => {
      // push channel value
      channelsVal.push({
        ChnlID: channel.id,
        ChnlMetadata: {
          ChannelConfigs: {
            genesisStr: channel.configs.genesisStr && "",
          },
          ChannelType: channel.type,
        },
      });
      // values of all BNodes
      channel.bnodes.forEach((bNode) => {
        bNodesVal.push({
          BNodeID: bNode.id,
          BNodeMetadata: {
            configs: {
              configStr: bNode.configs.configStr && "",
              port: bNode.configs.port.toString(), // string
              wsport: bNode.configs.wsport.toString(), // string
            },
            nodeType: bNode.type,
          },
        });

        // mapping values between node channel
        channelBNodeMappingVal.push({
          BNodeID: bNode.id,
          ChnlID: channel.id,
        });
      });
    });
    // write back the result
    return {
      BG: {
        Chnls: channelsVal,
        BNodes: bNodesVal,
        BNodeChnl: channelBNodeMappingVal,
      },
    };
  }

  generateInfrastructure(infrastructure: Infrastructure): {
    PG: {
      InfraID: string;
      Nets: Array<{ [name: string]: any }>;
      NodeNet: Array<{ [name: string]: any }>;
      Nodes: Array<{ [name: string]: any }>;
    };
  } {
    let netsVal: Array<{ [name: string]: any }> = [];
    let nodesNetsVal: Array<{ [name: string]: any }> = [];
    let nodesVal: Array<{ [name: string]: any }> = [];

    infrastructure.networks.forEach((net) => {
      netsVal.push({
        netID: net.id,
        netMetadata: {
          netName: net.name,
        },
      });
      net.nodes.forEach((node) => {
        nodesNetsVal.push({
          interfaceMetadata: {
            hostAddr: node.hostAddress,
          },
          netID: net.id,
          nodeID: node.id,
        });
      });
    });
    // get all distinct nodes in the infrastructure
    const distinctNodes = queryDistinctNodes(infrastructure);
    distinctNodes.forEach((node) => {
      nodesVal.push({
        nodeID: node.id,
        nodeMetadata: {
          architecture: node.architecture,
          hostName: node.hostName,
        },
      });
    });
    return {
      PG: {
        InfraID: infrastructure.id,
        Nets: netsVal,
        NodeNet: nodesNetsVal,
        Nodes: nodesVal,
      },
    };
  }

  generateBNodeNode(bnodes: BNode[]): {
    BNodeNode: Array<{ [name: string]: any }>;
  } {
    let bnodeNodesVal: Array<{ [name: string]: any }> = [];
    bnodes.forEach((bnodes) => {
      bnodeNodesVal.push({
        BNodeID: bnodes.id,
        nodeID: bnodes.node.id,
      });
    });
    return {
      BNodeNode: bnodeNodesVal,
    };
  }

  generateParBNode(
    organizationId: string,
    bnodes: BNode[]
  ): {
    ParBNode: Array<{ [name: string]: any }>;
  } {
    let parBNodesVal: Array<{ [name: string]: any }> = [];
    bnodes.forEach((bnodes) => {
      parBNodesVal.push({
        BNodeID: bnodes.id,
        ParID: organizationId,
      });
    });
    return {
      ParBNode: parBNodesVal,
    };
  }

  generateOrganization(
    orgId: string,
    orgName: string,
    orgDescription: string,
    processes: Process[]
  ): {
    OG: {
      Par: Array<{ [name: string]: any }>;
      ParProc: Array<{ [name: string]: any }>;
      Proc: Array<{ [name: string]: any }>;
    };
  } {
    let parVal: Array<{ [name: string]: any }> = [];
    let parProcVal: Array<{ [name: string]: any }> = [];
    let procVal: Array<{ [name: string]: any }> = [];
    processes.forEach((process) => {
      procVal.push({
        ProcID: process.id,
        ProcMetadata: {
          ProcDesc: process.description,
          ProcName: process.name,
        },
      });
      parProcVal.push({
        ParID: orgId,
        ProcID: process.id,
      });
    });
    parVal.push({
      ParID: orgId,
      ParMetadata: {
        ParDesc: orgDescription,
        ParName: orgName,
      },
    });
    return {
      OG: {
        Par: parVal,
        ParProc: parProcVal,
        Proc: procVal,
      },
    };
  }

  generateOP(
    orgId: string,
    nodes: Node[]
  ): { OP: Array<{ [name: string]: any }> } {
    let opVal: Array<{ [name: string]: any }> = [];
    nodes.forEach((node) => {
      opVal.push({
        ParID: orgId,
        nodeID: node.id,
      });
    });
    return {
      OP: opVal,
    };
  }

  generateMetricRequests(metrics: Metric[]): {
    MetricReqs: Array<{ [name: string]: any }>;
  } {
    let metricRequestsVal: Array<{ [name: string]: any }> = [];
    metrics.forEach((metric) => {
      metricRequestsVal.push({
        channels: [metric.channel.id],
        metric: [metric.metricName],
        metricReqID: metric.metricRequestId,
      });
    });
    return {
      MetricReqs: metricRequestsVal,
    };
  }

  generatePlan(organization: Organization): {
    BND: {
      BG: { [name: string]: any };
      D: {
        BNodeNode: Array<{ [name: string]: any }>;
        ParBNode: Array<{ [name: string]: any }>;
      };
      OG: { [name: string]: any };
      OP: { [name: string]: any };
      PG: { [name: string]: any };
      MetricReqs: Array<{ [name: string]: any }>;
    };
  } {
    const allBNodes = queryAllBNodes(organization.channels);
    const allDistinctNodes = queryDistinctNodes(organization.infrastructure);
    return {
      BND: {
        BG: this.generateBG(organization.channels),
        D: {
          BNodeNode: this.generateBNodeNode(allBNodes)["BNodeNode"],
          ParBNode: this.generateParBNode(organization.id, allBNodes)[
            "ParBNode"
          ],
        },
        OG: this.generateOrganization(
          organization.id,
          organization.name,
          organization.description,
          organization.processes
        )["OG"],
        OP: this.generateOP(organization.id, allDistinctNodes)["OP"],
        PG: this.generateInfrastructure(organization.infrastructure)["PG"],
        MetricReqs: this.generateMetricRequests(organization.metrics)[
          "MetricReqs"
        ],
      },
    };
  }
}

export default BlockchainPlanGenerator;
