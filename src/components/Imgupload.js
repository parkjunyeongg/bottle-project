import '../../src/css/Imgupload.css';
import { useRef } from "react";

const Imgupload = () => {
    const imgInput = useRef(); 

    const handleButtonClick = (e) => {
        imgInput.current.click();
    }

    const handleChange = (e) => {
        console.log(e.target.files[0]);
    };
  

return(
    <>
        <form className="imgup">
            <h3>bottle identification system </h3>
            <div className="imgspace">
                <input type="file" ref={imgInput} onChange={handleChange} style={{display: "none"}} />

            </div>
            <div className="imgbutton">
                <button type="submit" id = "loadbutton" onClick={handleButtonClick}> load img </button>
            </div>
        </form>
    </>
    );
}
            
export default Imgupload;