import React from "react";

const Register = ({onRoutChange, loadUser}) => {

    const [viewPassword, setViewPassword] = React.useState(false);

    const [remail, setremail] = React.useState("");
    const [rpassword, setrpassword] = React.useState("");
    const [rname, setRName] = React.useState("");

    const onRNameChange = (event) => {
        setRName(event.target.value)
    }

    const onREmailChange = (event) => {
        setremail(event.target.value)
    }
    
    const onRPasswardChange = (event) => {
        setrpassword(event.target.value)
    }

    const onSubmitRegister = ()=> {
        fetch("https://mohieapp.herokuapp.com/register",{
            method: "post",
            headers: {"content-type": "application/JSON"},
            body: JSON.stringify({
                "name": rname,
                "email": remail,
                "password": rpassword
            })
        })
        .then(Response => Response.json())
        .then( user => {
            if (user.id) {
                loadUser(user);
                onRoutChange("home");
            } else if (user === "invalid") {
                window.alert("please enter valid information")
            } else {
                window.alert("User already exist")
            }
        })
    }

    return (
        <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="b--black db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={onRNameChange}/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={onREmailChange}/>
                </div>
                <div className="mv3">
                    <label className="b--black db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type={viewPassword?"text":"password"} name="password"  id="password" onChange={onRPasswardChange}/>
                    <div className="flex items-center mb2">
                        <label className="b--black db fw6 lh-copy f6 mr2" htmlFor="view-password">View Password</label>
                        <input className="mr2" type="checkbox" onChange={()=>setViewPassword(!viewPassword)} id="view-password"/>
                    </div>
                </div>
                </fieldset>
                <div className="">
                <input onClick={onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register"/>
                </div>
            </div>
        </main>
        </article>

    );
}

export default Register;