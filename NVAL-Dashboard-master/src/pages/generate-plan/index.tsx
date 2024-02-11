import InfoIcon from "@mui/icons-material/Info";
import LanIcon from "@mui/icons-material/Lan";
import { Box, Grid, Stack } from "@mui/material";
import BlockchainPlanForm from "../../components/blockchain-plan-form";
import ContentWrapper from "../../components/content-wrapper";
import InfrastructureNodeItem from "../../components/infrastructure-node";
import RootWrapper from "../../components/root-wrapper";
import { NodeArchitecture } from "../../types";
import * as React from "react";


const BlockChainPlanGeneration = () => (
  <RootWrapper
    title="Blockchain Plan"
    pageHeader="Generate Blockchain Network Design"
  >
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      direction="row"
      alignItems="stretch"
      justifyContent="flex-start"
    >
      <Grid item xs={12} md={4}>
        <ContentWrapper
          headerTitle="Infrastructure"
          addIconHeader
          addButtonText="Add Node"
          handleAddAction={() => {
            alert("Add a node!");
          }}
          sx={{ height: "100%" }}
          headerIcon={<LanIcon />}
        >
          <Box>
            <Stack spacing={1}>
              <InfrastructureNodeItem
                node={{
                  id: "testing-node-001",
                  hostName: "Demo Node 001",
                  hostAddress: "demo-node-001.local",
                  architecture: NodeArchitecture.ARMv7,
                }}
              />
              <InfrastructureNodeItem
                node={{
                  id: "testing-node-002",
                  hostName: "Demo Node 002",
                  hostAddress: "demo-node-002.local",
                  architecture: NodeArchitecture.ARMv7,
                }}
              />
              <InfrastructureNodeItem
                node={{
                  id: "testing-node-003",
                  hostName: "Demo Node 003",
                  hostAddress: "demo-node-003.local",
                  architecture: NodeArchitecture.X64,
                }}
              />
            </Stack>
          </Box>
        </ContentWrapper>
      </Grid>
      <Grid item xs={12} md={8}>
        <ContentWrapper
          headerIcon={<InfoIcon />}
          headerTitle="Plan Details"
          childrenPadding={false}
        >
          <Box>
            <BlockchainPlanForm />
          </Box>
        </ContentWrapper>
      </Grid>
    </Grid>
  </RootWrapper>
);

export default BlockChainPlanGeneration;
