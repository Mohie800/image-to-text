import React from "react";




const SignIn = ({onRoutChange, loadUser}) => {

    const [email, setemail] = React.useState("");
    const [password, setpassword] = React.useState("");
    const [viewPassword, setViewPassword] = React.useState(false);


    const onEmailChange = (event) => {
        setemail(event.target.value)
    }
    
    const onPasswardChange = (event) => {
        setpassword(event.target.value)
    }

    const onSubmitSignIn = ()=> {
        fetch("https://eager-ruby-pinafore.cyclic.app/login",{
            method: "post",
            headers: {"content-type": "application/JSON"},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        
        .then(Response => Response.json())
        .then( user => {
            if (user.id) {
                loadUser(user);
                onRoutChange("home");
            } else {
                window.alert("Invalid email or password")
            }
        
        })
    }

    return (
        <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
                    <input className="b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"onChange={onEmailChange}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b--black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type={viewPassword?"text":"password"} name="password"  id="password" onChange={onPasswardChange}/>
                    <div className="flex items-center mb2">
                        <label className="b--black db fw6 lh-copy f6 mr2" htmlFor="view-password">View Password</label>
                        <input className="mr2" type="checkbox" onChange={()=>setViewPassword(!viewPassword)} id="view-password"/>
                    </div>
                </div>
                </fieldset>
                <div className="">
                <input onClick={onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <p onClick={()=> onRoutChange("register")} className="f6 link dim black db pointer shadow-5">Register</p>
                </div>
            </div>
        </main>
        </article>

    );
}

export default SignIn;
