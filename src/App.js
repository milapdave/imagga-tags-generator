import './App.css';
import axios from "axios";
import Tag from "./components/Tag";
import {useState} from "react";
import Preloader from "./components/loader";

function App() {

    const [tags, setTags] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [tagUrl, setTagUrl] = useState('');
    const [file, setFile] = useState();
    const [error, setError] = useState();

    const onChangeHandler = (e) => {
        setTagUrl(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
        setError(null)
    }

    const getTags = async () => {
      const formData = new FormData();
      formData.append('image', tagUrl);
      const url = `https://api.imagga.com/v2/tags`;

        if (tagUrl) {
            try {
                setIsLoad(true);
                const response = await axios.post(url, formData, {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setTags(response.data.result.tags)
                setIsLoad(false);
            } catch (error) {
              setError(error.response.data.status.text);
              setIsLoad(false);
            }
        } else {
          setError('Please select image')
        }
    }
    
    return (
        <div className="App">
            <div className="wrapper">
                <div className="input-block">
                    <form >
                      <label htmlFor="images" className="drop-container">
                        <input type="file"  id="images" accept="image/*"  onChange={onChangeHandler}/>
                        <p>Drop your image here, or <label className='link' htmlFor="images">browse</label></p>
                      </label>
                      {file &&
                        <img className="file-upload-image" src={file} alt="" />
                      }
                    </form>
                    {error &&
                    <p style={{color:'red'}}>{error}</p>
                    }
                    <button type="submit" onClick={getTags}>Tags</button>
                </div>

                {isLoad &&
                <Preloader/>}

                <div className="tags">
                    {tags.length !== 0 && tags.map(el => <div key={el.confidence}>
                        <Tag tag={el.tag.en} confidence={el.confidence}/>
                    </div>)}
                </div>

            </div>
        </div>
    );
}

export default App;