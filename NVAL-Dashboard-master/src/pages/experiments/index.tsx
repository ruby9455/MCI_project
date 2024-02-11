import * as React from "react";
import "./index.css";
// @ts-ignore
import {
  getExperimentsList,
  submitExperimentsList,
  getInfrastructuresList,
} from "../../request";
import { Select, MenuItem, Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Loading } from "react-admin";
import { SelectChangeEvent } from "@mui/material/Select";
import JSZip from "jszip";
import saveAs from "file-saver";

interface Item {
  id: number;
  title?: string;
  body?: string;
}

interface LocalItem {
  [key: string]: any;
}

const NodeList = () => {
  const [open, setOpen] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [dataSource, setDataSource] = React.useState<any>([]);
  const [selectorOptions, setSelectorOptions] = React.useState<any>([]);
  const [selectValue, setSelectValue] = React.useState<number | string>("");
  const [checkboxValues, setCheckboxValues] = React.useState<any>([]);

  if (dataSource.length === 0) {
    getExperimentsList().then((res: any) => {
      const data = Object.values(res) || [];
      setDataSource(data);
    });
  }

  if (selectorOptions.length === 0) {
    getInfrastructuresList().then((res: any) => {
      const data = Object.values(res) || [];
      setSelectorOptions(data);
    });
  }

  // save data
  const saveData = (dataSource: Array<Item>) => {
    const result: LocalItem = {};
    dataSource.forEach((item) => {
      const id = item.id.toString();
      result[id] = item;
    });
    submitExperimentsList(result);
  };

  // Delete a line
  const deleteRow = (index: Number) => {
    dataSource.splice(index, 1);
    setDataSource([...dataSource]);
    saveData(dataSource);
  };

  // Create a line
  const createRow = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    setSelectValue("");
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleConfirm = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    const selectItem = selectorOptions.find(
      (item: any) => item.id === selectValue
    );
    const originItemIndex = dataSource.findIndex(
      (item: any) => item.id === selectValue
    );
    if (originItemIndex === -1) {
      dataSource.push(selectItem);
    } else {
      dataSource.splice(originItemIndex, 1, selectItem);
    }
    setDataSource([...dataSource]);
    setSelectValue("");
    saveData(dataSource);
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleChange = (event: SelectChangeEvent<any>) => {
    setSelectValue(event.target.value);
  };

  const onRun = () => {
    if (checkboxValues.length === 0) {
      alert("Please select first then click the run button.");
      return;
    }
    setRunning(true);
    const zip = new JSZip();
    zip.file("output.json", "{}");
    zip.generateAsync({ type: "blob" }).then(function (content) {
      setTimeout(() => {
        saveAs(content, "output.zip");
        setRunning(false);
        setTimeout(() => {
          alert("Run successfully!");
        }, 1000);
      }, 5000);
    });
  };

  const onCheckboxChange = (index: Number) => {
    const result = JSON.parse(JSON.stringify(checkboxValues));
    const findIndex = checkboxValues.indexOf(index);
    if (findIndex !== -1) {
      result.splice(findIndex, 1);
    } else {
      result.push(index);
    }
    setCheckboxValues(result);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className={"top-btn-container"}>
        <div className={"btn"} onClick={() => createRow()}>
          Create
        </div>
        <div className={"btn"} onClick={() => onRun()}>
          Run
        </div>
      </div>
      <div className={"container"}>
        <div className={"row"}>
          <div className={"column td-header"} />
          <div className={"column td-header"}>ID</div>
          <div className={"column td-header"}>Title</div>
          <div className={"column td-header"}>Body</div>
          <div className={"column td-header"}>Operate</div>
        </div>
        {dataSource.map((item: any, index: Number) => (
          <div className={"row"} key={item.id + item.title + item.body}>
            <div className="column">
              <input
                type={"checkbox"}
                onChange={() => onCheckboxChange(index)}
              />
            </div>
            <div className={"column"}>{item.id}</div>
            <input
              placeholder="Text"
              defaultValue={item.title}
              onChange={(e) => (item.title = e.target.value)}
              onBlur={() => {
                saveData([...dataSource]);
                setDataSource([...dataSource]);
              }}
              disabled
              className={"column"}
            />
            <input
              placeholder="Text"
              defaultValue={item.body}
              onChange={(e) => (item.body = e.target.value)}
              onBlur={() => {
                saveData([...dataSource]);
                setDataSource([...dataSource]);
              }}
              disabled
              className={"column"}
            />
            <div className={"column"}>
              <div
                className={"del-btn"}
                onClick={() => {
                  deleteRow(index);
                }}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
      {running && (
        <Loading
          className={"loading"}
          loadingPrimary={"Running..."}
          loadingSecondary={""}
        />
      )}
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select Infrastructure</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 400 }}>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={selectValue}
                onChange={handleChange}
                input={<OutlinedInput />}
              >
                {selectorOptions.map((item: any) => (
                  <MenuItem key={item.id.toString()} value={item.id}>
                    {item.title || item.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NodeList;
