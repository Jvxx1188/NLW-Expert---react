import logo from './assets/Logo.svg'
import { Newnotecard } from './components/new-note-card'
import { NoteCard } from './components/note-cards'

const note = {
  date : new Date(),
  content : 'hello'
}
export function App() {
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img className='' src={logo} alt="" />
      <form>
        <input type="text" 
        placeholder='Buscar em suas Notas'
        className='w-full outline-none bg-transparent placeholder:bg-opacity-70 font-bold text-3xl'        />
      </form >
      <div className='h-px w-full bg-slate-700'/>

         <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
          <Newnotecard/>
            <NoteCard note={note}/>
            <NoteCard note={note} />
            <NoteCard note={note}/>
          </div>
     </div>
  )
}