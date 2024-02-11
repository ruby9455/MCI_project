import DvrIcon from "@mui/icons-material/Dvr";
import InfoIcon from "@mui/icons-material/Info";
import LanIcon from "@mui/icons-material/Lan";
import { Box, Grid, Stack, TextField } from "@mui/material";
import * as React from "react";

import ContentWrapper from "../../components/content-wrapper";
import InfrastructureNetworkItem from "../../components/infrastructure-network";
import InfrastructureNodeItem from "../../components/infrastructure-node";
import RootWrapper from "../../components/root-wrapper";
import { Node, NodeArchitecture } from "../../types";

export type AddInfrastructureProps = {
  name?: string;
};

const AddInfrastructure = ({
  name = "Add Infrastructure",
}: AddInfrastructureProps) => {
  const onNodeValueChanged = (value: Node) => {
    console.log(value);
  };
  return (
    <RootWrapper title={name} pageHeader="Add Infrastructure">
      <ContentWrapper
        headerTitle="Organization Info"
        sx={{ height: "100%" }}
        headerIcon={<DvrIcon />}
        plain
        small
        noBorder
        elevation={0}
        shadows={0}
        childrenPadding={true}
      >
        <Grid
          container
          rowSpacing={0}
          columnSpacing={2}
          alignItems="stretch"
          justifyItems="stretch"
        >
          <Grid item xs={12} md={2}>
            <TextField
              name="id"
              variant="outlined"
              label="ID"
              placeholder="e.g. CREST"
              defaultValue=""
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name="name"
              variant="outlined"
              label="Name"
              placeholder="e.g. CREST Centre"
              defaultValue=""
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="description"
              variant="outlined"
              label="Description"
              placeholder="e.g. CREST's Description: ..."
              defaultValue=""
              size="small"
              fullWidth
              multiline
              maxRows={2}
            />
          </Grid>
        </Grid>
      </ContentWrapper>

      <Grid container spacing={2} alignItems="stretch" justifyItems="stretch">
        <Grid item xs={12} md={4}>
          <ContentWrapper
            headerTitle="Nodes"
            addIconHeader
            addButtonText="New"
            handleAddAction={() => {
              alert("Add a node!");
            }}
            sx={{ height: "100%" }}
            headerIcon={<DvrIcon />}
          >
            <Box>
              <Stack spacing={1}>
                <InfrastructureNodeItem
                  onValueChange={onNodeValueChanged}
                  node={{
                    id: "",
                    hostName: "Demo Node 001",
                    hostAddress: "demo-node-001.local",
                    architecture: NodeArchitecture.ARMv7,
                  }}
                />
                <InfrastructureNodeItem
                  onValueChange={onNodeValueChanged}
                  node={{
                    id: "",
                    hostName: "Demo Node 001",
                    hostAddress: "demo-node-001.local",
                    architecture: NodeArchitecture.ARMv7,
                  }}
                />
              </Stack>
            </Box>
          </ContentWrapper>
        </Grid>
        <Grid item xs={12} md={8}>
          <ContentWrapper
            headerTitle="Networks"
            addIconHeader
            addButtonText="New"
            handleAddAction={() => {
              alert("Add a network!");
            }}
            sx={{ height: "100%" }}
            headerIcon={<LanIcon />}
          >
            <InfrastructureNetworkItem name="network" />
          </ContentWrapper>
        </Grid>
      </Grid>
    </RootWrapper>
  );
};

export default AddInfrastructure;
