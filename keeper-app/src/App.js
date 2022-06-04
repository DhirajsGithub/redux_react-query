import React, { useState } from 'react'
import CreateArea from './components/CreateArea'
import Footer from './components/Footer'
import Header from './components/Header'
import Note from './components/Note'
import Notes from './components/Notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const addNote = (newNote) =>{
    console.log(newNote)
    setNotes((prevNotes)=>{
      return [
        ...prevNotes, newNote
      ]
    })
  }

  const deleteItemHere = (id)=>{
    setNotes((prevNotes)=>{
      return prevNotes.filter((noteItem, index)=>{
        return index != id
      })
    })
  }


  return (
    <div>
        <Header />
        <Footer />
        <CreateArea addNote = {addNote} />
        {notes.map((noteItem, index)=>{
          return <Note id={index} key ={index} title={noteItem.title} content = {noteItem.content}  deleteItem= {deleteItemHere}  />
        })}

        {/* {Notes.map(note=> <Note key = {note.key} title = {note.title} content = {note.content}/>
        )} */}
       


    </div>
  )
}

export default App