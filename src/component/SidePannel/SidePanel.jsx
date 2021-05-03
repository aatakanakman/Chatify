import React from 'react'
import {Popup , Menu , Icon} from 'semantic-ui-react';



const SidePanel = () => {

    const handleOpen = () => {
            console.log("asdad")
    }

    return (
       
        <Menu
            vertical
            inverted
            secondary
            color =  "blue"
            fixed = "left"
            style = {{
                width : "346px",
                fontSize : "1.3rem",
            }}
        >
            <Menu.Item>
                {/* <UserPanel></UserPanel> */}
            </Menu.Item>

            <Menu.Item>
                <Menu.Header>
                    Kanallar
                    <span style = {{float : "right"}}>
                        <Popup 
                        content = "Yeni kanal oluştur"
                        trigger = {<Icon name= "add" onClick = {event => handleOpen()}></Icon>}
                        >
                        </Popup>
                    </span>
                </Menu.Header>

                {/* Channels */}
                {[...new Array(10)].map((prop,index) => (
                    <Menu.Item key = {index} name = "A" as = "a" icon = "hashtag" ></Menu.Item>
                ))}
            </Menu.Item>

        </Menu>

    )
}

export default SidePanel
