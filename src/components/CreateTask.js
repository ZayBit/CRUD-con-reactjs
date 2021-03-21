import React , { useState , useEffect } from 'react'
import { useParams , useHistory } from 'react-router-dom';
export const CreateTask = props => {
    const [ newTask , setNewTask ] = useState({
        id: 0,
        title: '',
        description: '',
        status: false
    }),
    // actualizar o crear una tarea
        [ isUpdate , setIsUpdate ] = useState(false),
        buttonTextContent = ( isUpdate ) ? 'Actualizar' : 'Crear',
    // parametro para acutalizar la tarea
        { idParam } = useParams(),
        id_param = parseInt( idParam ),
    // history para regresar al inicio
        history = useHistory(),
    
    submit = (e) => {
        e.preventDefault();
        if ( newTask.title.trim() === '' || !!newTask.description.trim() === '' ) return;
        if ( !isUpdate ) {
            props.createNewTask( newTask )
        } else {
            props.updateTask( newTask )
        }
        history.push('/')
    },
    handleChange = e => {
        setNewTask({ ...newTask , id: (idParam) ? newTask.id : props.newID() + 1 , [e.target.name]: e.target.value , status: false })
    }
    useEffect(() => {
        // obtener la tarea mediante su id
        if ( id_param ) {
            setIsUpdate(true)
            let data = []
            const data_session = localStorage.getItem('tasks');
            if (data_session != null) {
                data = JSON.parse( data_session )
                setNewTask(...data.filter(task => task.id === id_param))
            }
            if (data.length <= 0) history.push('/');
        } else {
            setIsUpdate(false)
        }
    }, [ id_param , history ])

    return (
            <form className="task-form" onSubmit={submit}>
                <label htmlFor="input-title">Titulo</label>
                <input type="text" className="form-control" id="input-title" placeholder={ newTask.title } onChange={handleChange} name="title" autoComplete="off" defaultValue={ newTask.title }/>
                <div className="mt-3">
                    <label htmlFor="textarea">Descripcion</label>
                    <textarea className="form-control" name="description" placeholder={ newTask.description } id="textarea" onChange={handleChange} defaultValue={ newTask.description }></textarea>
                </div>
                <button type="submit" className="btn">{ buttonTextContent } <i className="bi bi-plus"></i>
                </button>
            </form>
    )
}