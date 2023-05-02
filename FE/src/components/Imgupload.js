import '../../src/css/Imgupload.css';
import { useRef, useState } from "react";

const Imgupload = () => {
    const [imgFile, setImgFile] = useState("");
    const imgInput = useRef(); 

    const handleButtonClick = () => {
        imgInput.current.click();
    };
    
    const saveImgFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImgFile(reader.result);
           };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImgFile(null);
        }
        
    };

return(
    <>
        <form className="imgup">
            <h3>bottle identification system </h3>
            <div className="imgspace">
            <input type="file" ref={imgInput} onChange={saveImgFile} style={{display: "none"}} />
            {imgFile && (<img src={URL.createObjectURL(imgFile)} alt="병 이미지" style={{ maxWidth: '100%' }} />)}

            </div>
            <div className="imgbutton">
                <button type="submit" id = "loadbutton" onClick={handleButtonClick}> load img </button>
            </div>
        </form>
    </>
    );
}
            
export default Imgupload;