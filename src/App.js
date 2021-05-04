import React from "react";
import { Grid } from "semantic-ui-react";
import SidePanel from "./component/SidePannel/SidePanel";
import ChatPanel from './component/ChatPanel/ChatPanel';
import {useSelector} from 'react-redux';
export const App = () => {

  const currentChannel = useSelector(state => state.channels.currentChannel);
  

  return (
    <Grid columns="2" style = {{background : "#fff" ,height : "110vh"}}>
      <Grid.Column width="3">
        {
          //Side Bar
          <SidePanel></SidePanel>
        }
      </Grid.Column>
      <Grid.Column width="13" style = {{background : "#fff"}}>
        { //Chat Pannel 
         }
        {currentChannel && <ChatPanel currentChannel = {currentChannel}></ChatPanel>}
      </Grid.Column>
    </Grid>
  );
};

export default App;
