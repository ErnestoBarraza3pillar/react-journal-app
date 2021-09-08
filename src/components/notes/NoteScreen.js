import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleting } from "../../context/actions/Notes";

export const NoteScreen = () => {

    const { active:note } = useSelector( state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;
    const activeId = useRef( note.id )
    const dispatch = useDispatch();

    //Change the active note on screen
    useEffect(() =>{
        if (note.id !== activeId.current){
            reset ( note )
            activeId.current=note.id;
        }
    },[note, reset])

    //update the state note synchronous
    useEffect(() =>{
        dispatch( activeNote( formValues.id, { ...formValues}));

    },[formValues, dispatch])

    const hanldeDelete = ()=>{
        dispatch( startDeleting( id ));
    }
    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    name="title"
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={ body }
                    name="body"
                    onChange={ handleInputChange }
                ></textarea>
                {
                    (note.url)
                    && (
                        <div className="notes__image">
                            <img 
                                src={note.url}
                                alt="imagen"
                            />
                        </div>
                    )
                }


            </div>
            <button
                className="btn btn-danger"
                onClick={ hanldeDelete }
            >
                Delete
            </button>
        </div>
    )
}
