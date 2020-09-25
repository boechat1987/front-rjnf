import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
const API_BASE = process.env.REACT_APP_API_URL;

function submitForm(contentType, data, setResponse) {
    // axios({
    // url: `${API_BASE}s3`,
    // method: 'POST',
    // data: data,
    // headers: {
    // 'Content-Type': contentType
    // }
    // }).then((response) => {
    // setResponse(response.data);
    // }).catch((error) => {
    // setResponse("error");
    // })

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
    const [apontamentoOld, setApontamentoOld] = useState([]);
    const [semana, setSemana] = useState('');
    const [off_set, setOff_set] = useState('');
    const [limit, setLimit] = useState('');

    setTimeout(() => { console.log(apontamentoOld,"semana:", semana,"offset:", off_set,"limit:", limit); }, 3000);

    const handleClick = fileName => axios({
        url: `${API_BASE}prog/file/${fileName}`,
        method: 'GET',
        }).then((response) => {
        console.log("success", `${fileName}`);
        const newFiles = files.filter(item => item.name !== fileName);
        setFiles(newFiles);
        }).catch((error) => {
            console.log(files.filter(item => item.name !== fileName))
            console.log(error)
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

    useEffect(() => {
            if (apontamentoOld.length !== 0){
            axios.post(`${API_BASE}prog/apontlastupload`, {apontamentoOld: apontamentoOld
                }).then((response) => {
                console.log(response);
                }).catch((error) => {
                console.log("error");
                })             
            }
        }, [apontamentoOld])

    function uploadWithFormData(){
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

   async function atualizaApontamento(e){
        e.preventDefault();
        //realizado enviando o apontamento antigo manualmente para o back e ele da um update na semana escolhida
        try{
            await axios.get(`${API_BASE}prog/semana/busca/apontamento/${semana}`,{params: {
            off_set: off_set,
            limit: limit,}
            }).then((response) => {
                setApontamentoOld(response.data);                
            }).catch((error) => {
                alert(`Erro: ${error}`);
            });
        } catch (err){
            console.log(err);
         }
    
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
            <div>
            <form onSubmit={atualizaApontamento}>
                <label> Primeiro parâmetro busca apontamento - programação </label>
                <input
                placeholder="semana" 
                value={semana}
                onChange={e => setSemana(e.target.value)}
                />
                <input
                placeholder="Offset" 
                value={off_set}
                onChange={e => setOff_set(e.target.value)}
                />
                <input
                placeholder="Limit" 
                value={limit}
                onChange={e => setLimit(e.target.value)}
                />
                <label> 112 à 224 </label>
                <button className="button" type="submit">Atualizar Apontamento</button>
            </form>
            </div>
        </div>
    )
}

export default Uploader;