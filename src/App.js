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
    formData.append("apikey"  , "K89117377888957");
    formData.append("isOverlayRequired", true);
    $.ajax({
      url: 'https://api.ocr.space/parse/image',
      data: formData,
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function (ocrParsedResult){
        var parsedResults = ocrParsedResult["ParsedResults"];
        var ocrExitCode = ocrParsedResult["OCRExitCode"];
        var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
        var errorMessage = ocrParsedResult["ErrorMessage"];
        var errorDetails = ocrParsedResult["ErrorDetails"];
        var processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];

        //If we have got parsed results, then loop over the results to do something
        if (parsedResults!= null) {

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
              });

          //Loop through the parsed results
          $.each(parsedResults, function (index, value) {
          var exitCode = value["FileParseExitCode"];
          var parsedText = value["ParsedText"];
          var errorMessage = value["ParsedTextFileName"];
          var errorDetails = value["ErrorDetails"];
          
          var textOverlay = value["TextOverlay"];
          var pageText = '';
          switch (+exitCode) {
          case 1:
          pageText = parsedText;
          break;
          case 0:
          case -10:
          case -20:
          case -30:
          case -99:
          default:
          pageText += "Error: " + errorMessage;
          break;
          }
          
          const TextF = $.each(textOverlay["Lines"], function (index, value) {
          
           return (
             <div style={{maxHeight: value.MaxHeight, marginTop: value.MinTop}}>{value.LineText}</div>
           )

          //LOOP THROUGH THE LINES AND GET WORDS TO DISPLAY ON TOP OF THE IMAGE AS OVERLAY
         
          });
          
          // console.log("me",parsedText)

          $('span').append(parsedText);
          //YOUR CODE HERE

          });
          }
      }
    })
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
