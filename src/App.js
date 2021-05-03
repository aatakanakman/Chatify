import React from "react";
import { Grid } from "semantic-ui-react";
import SidePanel from "./component/SidePannel/SidePanel";

export const App = () => {
  return (
    <Grid columns="2" style = {{background : "#eee" ,height : "110vh"}}>
      <Grid.Column width="3" style = {{background : "#000"}}>
        {
          //Side Bar
          <SidePanel></SidePanel>
        }
      </Grid.Column>
      <Grid.Column width="13" style = {{background : "#eee"}}>
        {
          //Chat Pannel
        }
      </Grid.Column>
    </Grid>
  );
};

export default App;
