import React from "react";
import "./ImageLinkForm.css";


const ImageLinkForm= ({onBsub}) => {


    const [image, setImage] = React.useState("");
    const imageRef = React.useRef(null);
  
    function useDisplayImage() {
      const [result, setResult] = React.useState("");
  
      function uploader(e) {
        const imageFile = e.target.files[0];
  
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setResult(e.target.result);
        });
  
        reader.readAsDataURL(imageFile);
      }
  
      return { result, uploader };
    }
  
    const { result, uploader } = useDisplayImage();



  



    return (
       <div>
           <p>
               {"This will extract text from images"}
           </p>
           <div className="center">
               <div className="pa4 center form br3 shadow-5">
                    <div className="custom-file file">
                        <input type="file"  id="YOUR_IMAGE_FILE" className="custom-file-input" name="api-file" accept="image/png,image/jpeg" onChange={(e) => {
                            setImage(e.target.files[0]);
                            uploader(e); }}
                        />
                        <label className="custom-file-label image-input-api" htmlFor="api-file" >Upload Image</label>
                    </div><br></br>
                    <button className=" w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onBsub}>Detect</button>
               </div>
           </div>
           {result && <img id="image2" className="image1" ref={imageRef} src={result} alt="" />}
           <br></br>
           <div className="text1 center">   
                <span className="f6 f5-ns lh-copy measure mw5">
                    
                </span>
           </div>  
       </div>
       
    );
}


export default ImageLinkForm;