import React from 'react'
import {Dimmer , Loader , Image , Segment , Icon} from 'semantic-ui-react';

const Fallback = () => {
    return (
       <Segment style = {{height : "100vh"}}>
           <Dimmer active>
               <Loader></Loader>
           </Dimmer>
           <Image src='/images/wireframe/short-paragraph.png'>{" "}</Image>
       </Segment>
    )
}

export default Fallback
