import * as React from "react";
import { Stack, Divider } from "@mui/material";
import ContentWrapper from "../content-wrapper";
import {
  TextField,
  Grid,
  Chip,
  Box,
  MenuItem,
  IconButton,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/DeleteForeverTwoTone";
import BlockChainNodeItem from "../blockchain-node";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  //   "&:not(:last-child)": {
  //     borderBottom: 0,
  //   },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowRightOutlinedIcon sx={{ fontSize: "2.2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(80, 120, 80, .08)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const BlockchainPlanForm = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Stack spacing={1} my={1}>
      <ContentWrapper headerTitle="Metadata" plain elevation={0} noBorder>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={3}
          justifyContent="space-between"
        >
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label={"Unique Infrastructure ID"}
              placeholder={"Infrastructure ID"}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <ContentWrapper headerTitle={"Organization"} small plain>
              <Stack spacing={2}>
                <TextField
                  variant="standard"
                  label={"Organization's ID"}
                  placeholder={"Organization's ID"}
                  fullWidth
                />
                <TextField
                  variant="standard"
                  label={"Organization's Name"}
                  placeholder={"Organization's Name"}
                  fullWidth
                />
                <TextField
                  variant="standard"
                  label={"Description"}
                  placeholder={"Description"}
                  fullWidth
                  multiline
                  maxRows={3}
                />
              </Stack>
            </ContentWrapper>
          </Grid>
          <Grid item xs={6}>
            <ContentWrapper headerTitle={"Process"} small plain>
              <Stack spacing={2}>
                <TextField
                  variant="standard"
                  label={"Process ID"}
                  placeholder={"Process ID"}
                  fullWidth
                />
                <TextField
                  variant="standard"
                  label={"Process Name"}
                  placeholder={"Process Name"}
                  fullWidth
                />
                <TextField
                  variant="standard"
                  label={"Description"}
                  placeholder={"Description"}
                  fullWidth
                  multiline
                  maxRows={3}
                />
              </Stack>
            </ContentWrapper>
          </Grid>
        </Grid>
      </ContentWrapper>
      <Divider
        variant="middle"
        sx={{ bgcolor: "#848484", borderBottomWidth: 1, boxShadow: 1 }}
      />
      <ContentWrapper
        headerTitle="Channels"
        plain
        elevation={0}
        noBorder
        addButtonText="Add Channel"
        addIconHeader
        handleAddAction={() => {
          alert("Adding a new channel!");
        }}
      >
        <Stack spacing={2}>
          <Accordion
            expanded={true}
            // onChange={handleChange("channel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Box
                sx={{ display: "flex", alignItems: "flex-end", flexGrow: 1 }}
              >
                <Chip label={"Channel 1"} color="info" sx={{ my: 1 }} />
                <TextField
                  sx={{ marginX: 2 }}
                  variant="outlined"
                  label={"Channel's ID"}
                  placeholder={"Channel's ID"}
                  fullWidth
                />
                <TextField
                  select
                  variant="outlined"
                  label={"Channel's Type"}
                  placeholder={"Channel's Type"}
                  fullWidth
                >
                  <MenuItem key={"Geth_PoA"} value={"Geth_PoA"}>
                    Geth_PoA
                  </MenuItem>
                  <MenuItem key={"Geth_PoA"} value={"Geth_PoA"}>
                    Geth_PoA
                  </MenuItem>
                </TextField>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <BlockChainNodeItem />
                </Grid>
                <Grid item xs={4}>
                  <BlockChainNodeItem />
                </Grid>
                <Grid item xs={4}>
                  <BlockChainNodeItem />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={true}
            // onChange={handleChange("channel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Box
                sx={{ display: "flex", alignItems: "flex-end", flexGrow: 1 }}
              >
                <Chip label={"Channel 2"} color="info" sx={{ my: 1 }} />
                <TextField
                  sx={{ marginX: 2 }}
                  variant="outlined"
                  label={"Channel's ID"}
                  placeholder={"Channel's ID"}
                  fullWidth
                />
                <TextField
                  select
                  variant="outlined"
                  label={"Channel's Type"}
                  placeholder={"Channel's Type"}
                  fullWidth
                >
                  <MenuItem key={"Geth_PoA"} value={"Geth_PoA"}>
                    Geth_PoA
                  </MenuItem>
                  <MenuItem key={"Geth_PoA"} value={"Geth_PoA"}>
                    Geth_PoA
                  </MenuItem>
                </TextField>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <BlockChainNodeItem />
                </Grid>
                <Grid item xs={4}>
                  <BlockChainNodeItem />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </ContentWrapper>
    </Stack>
  );
};

export default BlockchainPlanForm;
