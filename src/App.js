import React from 'react';
import './App.css';
import Navigation from './components/Navigation/NAvigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";
import FaceReconition from './components/FaceReconition/FaceReconition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import $ from 'jquery';




  const particlesInit = (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    };


function App() {
 

  const [rout, setrout] = React.useState("defult");
  const [isSignedIn, setisSignedIn] =React.useState(false);
  const [user, setuser] = React.useState({
    id: "",
    name: "",
    email: "",
    enteries: "0",
    joined: ""
  });
  
  
  const loadUser = (data) => {
    setuser({
    id: data.id,
    name: data.name,
    email: data.email,
    enteries: data.enteries,
    joined: data.joined
    })
  }
   let text1;


  const onBsub = () =>{
    var formData = new FormData();
    formData.append('image', $('#YOUR_IMAGE_FILE')[0].files[0]);
    $.ajax(
    
    {
        method: 'POST',
        headers: {"X-Api-Key": "RvR0gXavg1b+Cl7BgXIbzw==A7h8VpX0Z6qwZnW6"},
        url: 'https://api.api-ninjas.com/v1/imagetotext',
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false, 
        success: function(data) { 

          if (data){
            fetch("https://mohieapp.herokuapp.com/image", {
                method: "put",
                headers: {"content-type": "application/JSON"},
                body: JSON.stringify({"id": user.id}
                )})
              .then(data => data.json())
              .then(count => {
                setuser({
                  "enteries":count,
                  "id":user.id,
                  "email":user.email,
                  "name":user.name})
              })
              }
            for (let i=0; i<data.length; i++) {
                text1 = data[i].text;
                $('span').append(text1+" ");
            };
            
        },
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        },
    });
  };
 
  
  const onRoutChange = (r1)=> {
    if (r1 === "home") {
      setisSignedIn(true);
    } else if (r1 === "defult"){
      setisSignedIn(false)
    }
    setrout(r1);
  }
  


  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      <Navigation onRoutCange={onRoutChange} isSignedIn={isSignedIn}/>
      { rout ==="home"
        ?<div>
          <Logo/>
          <Rank enteries={user.enteries} name={user.name} ></Rank>
          <ImageLinkForm onBsub={onBsub} />
          <FaceReconition />
        </div>
        : (
          rout === "defult"?
          <SignIn onRoutChange={onRoutChange} loadUser={loadUser}></SignIn>
          :
          <Register onRoutChange={onRoutChange} loadUser={loadUser}></Register>
        )
      }
      
    </div>
  );
}

export default App;
