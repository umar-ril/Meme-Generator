import "../src/App.css"
import {useState} from "react"
import {useEffect} from "react"

export default function Main(){
    const [meme,setMeme] = useState({
       topText:"",
       bottomText: "",
       memeImage: "http://i.imgflip.com/1bij.jpg" 
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() *allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevState => ({
            ...prevState,
            memeImage : url
        }))
    }

    function handleChange(event){
        const {name,value} =  event.target;
        setMeme(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(meme)
    return(
    <div>
        <div className="container">
            <label className="label" htmlFor="topText">Top Text</label>
            <label className="label" htmlFor="bottomText">Bottom Text</label>
            <input
             className = "meme-input"
             id="topText"
             name = "topText"
             value = {meme.topText}
             type="text"
            onChange={handleChange} />
            <input 
              className = "meme-input"
              id="bottomText"
              name="bottomText"
              value = {meme.bottomText}
              type="text" 
              onChange={handleChange} />
            <button className="meme-btn"
                    onClick ={getMemeImage}
            >

                Get the Meme 🖼️
            </button>
        </div>  
        <div className="meme">
        <img src={meme.memeImage} className="meme-img"/>
        <p className="meme--text top" >
        {meme.topText}</p>      
        <p className="meme--text bottom">{meme.bottomText}</p>      
        </div>
    </div>
    )
}