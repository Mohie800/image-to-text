import React from "react";
import Tilt from 'react-parallax-tilt';
import broo from "./broo.png";
import "./logo.css";

const Logo = () => {
    return (
       <div>
           <Tilt className="Tilt br2 shadow-2">
                <div style={{ height: '100px', width: "100px"  }}>
                    <img alt="logo" src={broo}/>
                </div>
            </Tilt>
       </div>
    );
}

export default Logo;