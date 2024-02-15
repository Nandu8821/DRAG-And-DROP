import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/files');
        setFiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (id) => {
    try {
      await axios.get(`http://localhost:3001/download/${id}`, {
        responseType: 'blob'
      });
    } catch (error) {
      console.error(error);
      alert('Error downloading file');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setFiles(files.filter(file => file._id !== id));
    } catch (error) {
      console.error(error);
      alert('Error deleting file');
    }
  };

  return (
    <div>
      <h2>Files</h2>
      <ul>
        {files.map(file => (
          <li key={file._id}>
            {file.filename}
            <button onClick={() => handleDownload(file._id)}>Download</button>
            <button onClick={() => handleDelete(file._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
