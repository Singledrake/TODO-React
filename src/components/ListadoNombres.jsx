import React,{useState} from 'react';
import uniqid from 'uniqid';

const ListadoNombres = () => {

    const [nombre, setNombre] = useState('');
    const [listaNombres, setListaNombres] = useState([]);
    const [modoEdicion, setModoedicion] = useState(false);
    const [id, setId] = useState('');
    const [errorApp, setErrorApp] = useState(null);

    const addNombre = (e)=>{
        e.preventDefault();
        if(nombre !== ''&& nombre.length > 3){
            const nuevoNombre ={
                id: uniqid(),
                nombre,
            }
            setListaNombres([...listaNombres,nuevoNombre]);
            setNombre('');
            setErrorApp(null);
        }else if(nombre.length < 4){
            setErrorApp('El nombre no es valido')
            return;
        }
        else if(nombre=== ''){
            setErrorApp('No haz ingresado el nombre');
            return;
        }
        
        
    }
    const deleteNombre = (id) => {
        const nuevoArray = listaNombres.filter(item => item.id !== id);
        setListaNombres(nuevoArray);
    }
    const editNombre = (item) => {
        setModoedicion(true);
        setNombre(item.nombre);
        setId(item.id);
    }
    const updateNombre = (e) =>{
        e.preventDefault();
        console.log(nombre, id)
        const nuevoArray = listaNombres.map(item => item.id === id ? {id, nombre} : item);
        setListaNombres(nuevoArray);
        setModoedicion(false);
        setNombre('');
    }


    return (
        <div className="container">
            <h2 className="text-center">Aplicación CRUD Basica</h2>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <h3 className="text-center">Listado de nombres</h3>
                    <ul className="list-group">
                        {
                            listaNombres.map(item =>
                                <li className="list-group-item " key={item.id}>
                                    {item.nombre}
                                    <button className="btn btn-outline-danger float-right m-1"
                                    onClick={() =>{deleteNombre(item.id)}}>Eliminar</button>
                                    <button className="btn btn-outline-info float-right m-1"
                                    onClick={() =>{editNombre(item)}}>Editar</button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col-sm-12 col-md-6 bg-dark">
                    <h3 className="text-center text-white">Formulario para añadir nombres</h3>
                    <form onSubmit={modoEdicion ? updateNombre: addNombre}>
                        <div className="form-group m-2 p-2">
                            <label className="text-white">Nombre</label>
                            <input 
                            onChange={(e)=> {setNombre(e.target.value)}} 
                            type="text" className="form-control" 
                            placeholder="Introduce el nombre" 
                            value={nombre}/>
                        </div>
                        <div className="text-center m-2">
                            <button 
                            type="submit" 
                            className="btn btn-success m-2"
                            >{modoEdicion ? 'Editar': 'Agregar'}</button>
                        </div>
                    </form>
                    {
                        errorApp!== null ?(
                            <div className=" text-center alert alert-danger">{errorApp}</div>
                        ):(<div></div>)
                    }
                </div>
            </div>
        </div>
        
    )
}

export default ListadoNombres;
