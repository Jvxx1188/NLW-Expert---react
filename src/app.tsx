import { useState } from 'react'
import logo from './assets/Logo.svg'
import { Newnotecard } from './components/new-note-card'
import { NoteCard } from './components/note-cards'

interface Notes {
  id : string
  date : Date
  content : string
}
export function App() {
const [search,setSearch] = useState('')
 const [notes,setNotes] = useState<Notes[]>(()=>{
  const storage = localStorage.getItem('notes') 
  if(storage){
    return JSON.parse(storage)
  }
  return []
 })
 function OnNoteCreated(content : string){
  const newNote = {id : crypto.randomUUID() ,date:new Date(),content}
  const notesArray = [newNote,...notes]
  setNotes(notesArray)
  localStorage.setItem('notes',JSON.stringify(notesArray))
 }  
 function onNoteDeleted(id : string){
  console.log(id)
  const notesarray = notes.filter((note) =>{
    return note.id !== id
  })
  setNotes(notesarray)
  localStorage.setItem('notes',JSON.stringify(notesarray))
 }
 function handleSearch(event : React.ChangeEvent<HTMLInputElement>){
  setSearch(event.target.value)
 } 

 const filteredNotes = search !== '' ?  notes.filter((note)=>{
  return note.content.toLowerCase().includes(search.toLowerCase())
 }) : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-4'>
      <img className='' src={logo} alt="" />
      <form>
        <input type="text" 
        placeholder='Buscar em suas Notas'
        className='w-full outline-none bg-transparent placeholder:bg-opacity-70 font-bold text-3xl'    
        onChange={handleSearch} />
        
      </form >
      <div className='h-px w-full bg-slate-700'/>

         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
          <Newnotecard onNoteCreated={OnNoteCreated}/>
          {filteredNotes.map((note)=>{
            return <NoteCard key={note.id} onNoteDeleted={onNoteDeleted} note={note}/>
          })}
          </div>
     </div>
  )
}