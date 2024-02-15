import { useState, useRef } from "react";
import "./App.css"
import axios from "axios";

function App() {
  const [images, setImages] = useState([])
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click()
  }


  const onFileSelect = (event) => {
    const files = event.target.files;
    console.log(files)
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },

        ]);
      }
    }
  }

  const deleteImage = (index) => {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  }

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  }

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },

        ]);
      }
    }
  }

 const handleUpload =()=>{
  const formData = new FormData()
  console.log(formData)
  formData.append('images',images)
  axios.post('http://localhost:3001/upload',formData).then(res => console.log(res.data)).catch(err => console.log("err"))

 }

  return (
    <div className='card'>
      <div className='top'>
        <p>Drag  &  Drop image uploading </p>
      </div>

      <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        {isDragging ? (<span className='select'>
          Drop images here
        </span>

        ) : (
          <>

            Drag & Drop image here or (" ")
            <span className='select' role="button" onClick={selectFiles}>
              browse
            </span>
          </>

        )}
        
        <input name='filename' type='file' className='file' multiple ref={fileInputRef} onChange={onFileSelect}></input>
        </div>
        
        <div className='container'>
        
        {images.map((images, index) => (
          
          
          <div className='image' key={index}>
            <span className='delete' onClick={() => deleteImage(index)} >&times;</span>
            <img src={images.url} alt={images.name} />
          </div>
        ))}

      </div>

      <button type='button'  onClick={handleUpload} >Upload</button>
      </div>
      
      );
    }
export default App;