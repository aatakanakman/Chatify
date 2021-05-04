import React, { useState } from "react";
import { Popup, Menu, Icon } from "semantic-ui-react";
import CreateChannelForm from '../Channels/CreateChannelForm'
import ChannelList from '../Channels/ChannelList'
import UserPanel from '../UserPanel/UserPanel'

const SidePanel = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Menu
        vertical
        inverted
        secondary
        color="blue"
        fixed="left"
        style={{
          width: "19%",
          fontSize: "1.3rem",
        }}
      >
        <Menu.Item>
            <UserPanel></UserPanel>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>
            Kanallar
            <span style={{ float: "right" }}>
              <Popup
                content="Yeni kanal oluştur"
                trigger={
                  <Icon name="add" onClick={(event) => handleOpen()}></Icon>
                }
              ></Popup>
            </span>
          </Menu.Header>

          {/* Channels */}
          
          <ChannelList></ChannelList>

        </Menu.Item>
      </Menu>

            {/* Create Channel Form */}
        <CreateChannelForm open = {open} onOpen = {handleOpen} onClose = {handleClose}></CreateChannelForm>
    </>
  );
};

export default SidePanel;
