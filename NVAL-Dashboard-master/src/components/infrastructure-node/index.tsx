import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { Box, Chip, IconButton, InputAdornment, Stack } from "@mui/material";
import * as React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";


import { Node, NodeArchitecture } from "../../types";
import FormInput from "../forms/input";
import ToggleButtonSelect from "../forms/toggle-button-select";
import FormUnderlineInput from "../forms/underline-input";
import { infrastructureNodeSchema } from "../../schemas";


type InfrastructureNodeItemProps = {
  node?: Node;
  onValueChange: (value: Node, isValud: boolean) => void;
};

const InfrastructureNodeItem = ({
  node = {
    id: "",
    hostName: "",
    hostAddress: "",
    architecture: NodeArchitecture.ARMv7,
  },
  onValueChange,
}: InfrastructureNodeItemProps) => {
  const defaultValues = node;
  const [isValid, setIsValid] = React.useState(false);

  const methods = useForm<Node>({
    mode: "onChange",
    resolver: yupResolver(infrastructureNodeSchema),
    defaultValues,
  });

  React.useEffect(() => {
    setIsValid(methods.formState.isValid);
    const allValuesSub = methods.watch((_, { name, type }) =>
      onValueChange(methods.getValues(), isValid)
    );
    return () => allValuesSub.unsubscribe();
  }, [methods.watch]);

  const onSubmitHandler: SubmitHandler<Node> = (values) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <Box
        boxShadow={3}
        border={1}
        borderRadius={0.5}
        borderColor="#CDCDCD"
        overflow="hidden"
        noValidate
        autoComplete="off"
        component="form"
        onSubmit={methods.handleSubmit(onSubmitHandler)}
      >
        <Box
          sx={{
            bgcolor: "#2d3840",
            color: "#EFEFEF",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FormUnderlineInput
            hiddenLabel
            fullWidth
            name="id"
            variant="standard"
            size="small"
            placeholder="e.g. node-001"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginBottom: 1 }}>
                  <Chip label="ID" color="info" size="small" />
                </InputAdornment>
              ),
            }}
            sx={{ mx: 1, my: 1 }}
            focused
            required
          />

          <IconButton aria-label="delete" size="medium">
            <DeleteIcon fontSize="inherit" color="error" />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              paddingRight: 1,
              justifyContent: "right",
              paddingY: 1,
            }}
          ></Box>
        </Box>
        <Stack m={2} spacing={1.5}>
          <ToggleButtonSelect
            name="architecture"
            aria-label="Architecture"
            size="small"
            sx={{ backgroundColor: "#FFFFFF" }}
            title="Architecture"
            fullWidth
            selectValues={Object.values(NodeArchitecture)}
          />

          <FormInput
            variant="standard"
            label="Host's name"
            name="hostName"
            placeholder="e.g. Sample Node 01"
            size="small"
            focused
            required
          />

          <FormInput
            name="hostAddress"
            variant="standard"
            label="IP/Host"
            placeholder="e.g. my-pi-001.local"
            size="small"
            focused
            required
          />
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default InfrastructureNodeItem;
