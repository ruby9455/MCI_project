import jsonServerProvider from "ra-data-json-server";
import { Admin, CustomRoutes, ListGuesser, Resource } from "react-admin";
import { Route } from "react-router-dom";
import React  from 'react'

import MyLayout from "./layouts";
import AddInfrastructure from "./pages/add-infrastructure";
import Dashboard from "./pages/dashboard";
import BlockChainPlanGeneration from "./pages/generate-plan";
import NodeList from "./pages/node-list"
import Experiments from "./pages/experiments";
import NewMenu from "./pages/new"
import { lightTheme } from "./themes";
const dataProvider = jsonServerProvider(null);

const App = () => (
  <Admin
    theme={lightTheme}
    // dataProvider={dataProvider}
    title="NVAL Dashboard"
    layout={MyLayout}
    dashboard={Dashboard}
    disableTelemetry
  >
    <CustomRoutes>
      <Route
        path="/generate-blockchain-design"
        element={<BlockChainPlanGeneration />}
      />
      <Route path="/add-infrastructure" element={<AddInfrastructure />} />
      <Route path="/infrastructures" element={<NodeList />} />
      <Route path="/experiments" element={<Experiments />} />
      <Route path="/node-edit/:id" element={<NewMenu />} />
    </CustomRoutes>
    {/* Default Resource set with non with a NULL data provider */}
    {/*<Resource name="non-resource" />*/}
  </Admin>
);

export default App;
