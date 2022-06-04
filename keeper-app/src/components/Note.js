import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';


const Note = (props) => {

  const handleDelete = ()=>{
    props.deleteItem(props.id)
  }

  return (
    <div className='note'>
    <h1>{props.title}</h1>
    <p>{props.content}</p>
    <DeleteIcon className='btn' onClick={handleDelete}>Delete</DeleteIcon>
    </div>
  )
}

export default Note