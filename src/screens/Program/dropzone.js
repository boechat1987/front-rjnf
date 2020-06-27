import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL;

function submitForm(contentType, data, setResponse) {
    axios({
    url: `${API_BASE}s3`,
    method: 'POST',
    data: data,
    headers: {
    'Content-Type': contentType
    }
    }).then((response) => {
    setResponse(response.data);
    }).catch((error) => {
    setResponse("error");
    })

    axios({
        url: `${API_BASE}s3/hard`,
        method: 'POST',
        data: data,
        headers: {
        'Content-Type': contentType
        }
        }).then((response) => {
        setResponse(response.data);
        }).catch((error) => {
        setResponse("error");
        })
}

const Uploader  = props => {
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [files, setFiles] = useState([]);
    const handleClick = fileName => axios({
        url: `${API_BASE}prog/${fileName}`,
        method: 'GET',
        }).then((response) => {
        console.log("success");
        const newFiles = files.filter(item => item.name !== fileName);
        setFiles(newFiles);
        }).catch((error) => {
        console.log("error");
        });

   useEffect(() => {
    async function fetch(){
        axios({
            url: `${API_BASE}s3`,
            method: 'GET',
            }).then((response) => {
            setFiles(response.data); 
            }).catch((error) => {
            console.log("error");
            })             
        }
        fetch()
    }, [success])

    function uploadWithFormData(){
        console.log("aaa")
        const formData = new FormData();
        //formData.append("title", title);
        formData.append("file", file);
        //formData.append("desc", desc);
       
        submitForm("multipart/form-data", formData, (msg) => {
            if(msg==='File moved'){
                setSuccess(true);
            }
        });
    }

    return (
        <div>
            <form>
                <label>
                    File
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <input type="button" value="Upload as Form" onClick={uploadWithFormData} />
            </form>
            <div>
                {success?"Pronto":"Aguarde"}
            </div>
            <div>
                <ul>
                    {files && files.map(item => (
                    <li key={item.id}>
                        <div onClick={()=>handleClick(item.name)}>{item.name}
                        </div>
                    </li>))}
                </ul>
            </div>
        </div>
    )
}

export default Uploader;