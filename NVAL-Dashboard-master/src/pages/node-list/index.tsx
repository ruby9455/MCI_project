import * as React from "react";
import "./index.css";
import { Link } from "react-router-dom";
// @ts-ignore
import {
  getInfrastructuresList,
  submitInfrastructuresList,
} from "../../request";

interface Item {
  id: number;
  title?: string;
  body?: string;
}

interface LocalItem {
  [key: string]: any;
}

const NodeList = () => {
  const [dataSource, setDataSource] = React.useState<any>([]);

  if (dataSource.length === 0) {
    getInfrastructuresList().then((res: any) => {
      const data = Object.values(res) || [];
      setDataSource(data);
    });
  }

  // Save Data
  const saveData = (dataSource: Array<Item>) => {
    const result: LocalItem = {};
    dataSource.forEach((item) => {
      const id = item.id.toString();
      result[id] = item;
    });
    submitInfrastructuresList(result);
  };

  // 删除一行
  const deleteRow = (index: Number) => {
    dataSource.splice(index, 1);
    setDataSource([...dataSource]);
    saveData(dataSource);
  };

  // 创建一行
  const createRow = () => {
    const id = new Date().getTime();
    dataSource.push({
      id,
      title: "",
      body: "",
    });
    setDataSource([...dataSource]);
    saveData(dataSource);
  };

  return (
    <div>
      <div className={"top-btn-container"}>
        <div className={"btn"} onClick={() => createRow()}>
          Create
        </div>
      </div>
      <div className={"container"}>
        <div className={"row"}>
          <div className={"column td-header"}>ID</div>
          <div className={"column td-header"}>Title</div>
          <div className={"column td-header"}>Body</div>
          <div className={"column td-header"}>Operate</div>
        </div>
        {dataSource.map((item: any, index: Number) => (
          <div className={"row"} key={item.id + item.title + item.body}>
            <div className={"column"}>{item.id}</div>
            <input
              placeholder="Text"
              defaultValue={item.title}
              onChange={(e) => (item.title = e.target.value)}
              onBlur={() => {
                saveData([...dataSource]);
                setDataSource([...dataSource]);
              }}
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
              className={"column"}
            />
            <div className={"column"}>
              <Link
                to={{
                  pathname: `/node-edit/${item.id}`,
                }}
              >
                <div className={"edit-btn"}>Edit</div>
              </Link>
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
    </div>
  );
};

export default NodeList;
