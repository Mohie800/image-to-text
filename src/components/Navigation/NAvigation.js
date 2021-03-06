import React from "react";

const Navigation = ({onRoutCange, isSignedIn}) => {
    if (isSignedIn){ 
    return (
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p onClick={() => onRoutCange("defult")} className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </nav>
    );
    }   else {
    return (
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p onClick={() => onRoutCange("defult")} className="f3 link dim black underline pa3 pointer">Sign in</p>
            <p onClick={() => onRoutCange("register")} className="f3 link dim black underline pa3 pointer">Register</p>
        </nav>
    )}
}

export default Navigation;