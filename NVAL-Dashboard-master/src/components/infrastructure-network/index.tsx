import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/EditOutlined";
import { Network, Node } from "../../types";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { networkSchema } from "../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../forms/input/index";
import React from "react";
import KeyValueMuiChip from "../key-value-mui-chip";

type InfrastructureNetworkItemProps = {
  name: string;
  network?: Network;
  isNVALNetwork: boolean;
  onValueChange: (value: Network, isValud: boolean) => void;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  "&:hover": {
    border: `2px solid ${theme.palette.primary.light}`,
  },
}));

const NodeItem = ({
  node,
  onItemClicked,
  onItemDeleted,
}: {
  node: Node;
  onItemClicked: (id: string) => void;
  onItemDeleted: (id: string) => void;
}) => (
  <Item elevation={1} square>
    <Stack spacing={1}>
      <KeyValueMuiChip
        fixedLabelWidth={100}
        label="ID"
        value={node.id}
        fullWidth
      />
      <KeyValueMuiChip
        fixedLabelWidth={100}
        label="Host Name"
        value={node.hostName}
        fullWidth
      />
      <KeyValueMuiChip
        fixedLabelWidth={100}
        label="Host Address"
        value={node.hostAddress}
        fullWidth
      />
      <Stack
        spacing={1}
        direction={"row"}
        justifyContent="center"
        alignItems="center"
      >
        <IconButton aria-label="edit" onClick={() => onItemClicked(node.id)}>
          <EditIcon />
        </IconButton>

        <IconButton aria-label="delete" onClick={() => onItemDeleted(node.id)}>
          <DeleteIcon
            sx={{
              "&&": {
                color: "orange",
              },
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  </Item>
);
const InfrastructureNetworkItem = ({
  name,
  network,
  isNVALNetwork = false,
  onValueChange,
}: InfrastructureNetworkItemProps) => {
  const defaultValues = network;

  const methods = useForm<Network>({
    mode: "onChange",
    resolver: yupResolver(networkSchema),
    defaultValues,
  });

  const onNodeItemClicked = (id: string) => {
    console.log("onNodeItemClicked", id);
  };

  const onNodeItemDeleted = (id: string) => {
    console.log("onNodeItemDeleted", id);
  };

  React.useEffect(() => {
    const allValuesSub = methods.watch((_, { name, type }) =>
      onValueChange(methods.getValues(), methods.formState.isValid)
    );
    return () => allValuesSub.unsubscribe();
  }, [methods.watch]);

  return (
    <FormProvider {...methods}>
      <Accordion disableGutters expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            "&.MuiAccordionSummary-root": {
              backgroundColor: "#2F3F4F1F",
              "& .Mui-expanded:focus:after": {
                backgroundColor: "inherit",
              },
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "rotate(0deg)",
              },
            },
          }}
        >
          <Grid container spacing={2} sx={{ paddingX: 1 }}>
            <Grid
              item
              xs={isNVALNetwork ? "auto" : 12}
              md={isNVALNetwork ? "auto" : 3}
            >
              {isNVALNetwork ? (
                <Chip label={"_NVAL"} color="primary" sx={{ my: 0.5 }} />
              ) : (
                <FormInput
                  name="id"
                  sx={{ pointerEvents: "auto", zIndex: 1 }}
                  variant="outlined"
                  label={"Network's ID"}
                  placeholder={"Network's ID"}
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                  }}
                  fullWidth
                  hiddenLabel
                  focused
                />
              )}
            </Grid>
            <Grid item xs>
              <FormInput
                name="name"
                sx={{ pointerEvents: "auto", zIndex: 1 }}
                variant="outlined"
                label={"Network's Name"}
                placeholder={"Network's Name"}
                size="small"
                fullWidth
                hiddenLabel
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                focused
              />
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            {network && network.nodes ? (
              network.nodes.map((node, index) => (
                <Grid item xs={3}>
                  <NodeItem
                    node={node}
                    onItemClicked={onNodeItemClicked}
                    onItemDeleted={onNodeItemDeleted}
                  />
                </Grid>
              ))
            ) : (
              <Typography>No Nodes have been added to this network</Typography>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </FormProvider>
  );
};

export default InfrastructureNetworkItem;
