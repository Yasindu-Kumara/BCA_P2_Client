import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DrawerArea from "../component/drawaerArea";
import StickyHeadTable from "../component/jobTable";

export default function AdminPanel() {
  return (
    <Box sx={{ display: "flex" }}>
      <DrawerArea />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <StickyHeadTable />
      </Box>
    </Box>
  );
}
