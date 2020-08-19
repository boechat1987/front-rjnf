import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const API_BASE = process.env.REACT_APP_API_URL;

function submitForm(contentType, data, setResponse) {
    axios({
        url: `${API_BASE}sdrop/hard`,
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

const DropSobreaviso  = props => {
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [files, setFiles] = useState([]);

    const handleClick = fileName => axios({
        url: `${API_BASE}prog/sobreaviso/file/${fileName}`,
        method: 'GET',
        }).then((response) => {
        console.log("success", `${fileName}`);
        const newFiles = files.filter(item => item.name !== fileName);
        setFiles(newFiles);
        }).catch((error) => {
            console.log(error)
        console.log("error");
        });

   useEffect(() => {
    async function fetch(){
        axios({
            url: `${API_BASE}sdrop`,
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
        const formData = new FormData();
        formData.append("file", file);
        submitForm("multipart/form-data", formData, (msg) => {
            if(msg==='File moved'){
                setSuccess(true);
            }
        });
    }

    return (
        <div className="upload-container-box" >
            <form>
                <label className="label"> {file?`${file.name}`:"Selecione o Arquivo Excel"}
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <input className="button" type="button" value="Iniciar Upload" onClick={uploadWithFormData} />
            </form>
            <div className="upload-container">
                {success?"Pronto":""}
            </div>
            <div >
                <ul>
                    {files && files.map(item => (
                    <li key={item.id}>
                        <div onClick={()=>handleClick(item.name)}> {item.name}
                        </div>
                    </li>))}
                </ul>
            </div>
        </div>
    )
}

export default DropSobreaviso;