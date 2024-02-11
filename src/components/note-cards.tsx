import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {X} from 'lucide-react'
interface noteProps {
  note: {
    id : string,
    date: Date,
    content: string
  }
  onNoteDeleted : (id: string) => void
}
export function NoteCard({ note ,onNoteDeleted}: noteProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md text-left bg-slate-800 p-5 flex flex-col gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date,{locale :ptBR,addSuffix: true})}</span>
        <p className=' text-sm leading-6 text-slate-400'>{note.content}</p>

        <div className='absolute bottom-0 w-full right-0 left-0 h-2/4 bg-gradient-to-b from-transparent to-black/60 pointer-events-none'></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60 backdrop-blur-[2px]' />
        <Dialog.Content className='flex flex-col inset-0   md:rounded-md overflow-hidden z-10 fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700'>
          <Dialog.Close className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-50'>
            <X className='size-5'/>
          </Dialog.Close>
          <div className='flex flex-1 flex-col gap-3 p-5'>
          <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date,{locale :ptBR,addSuffix: true})}</span>
          <p className='text-sm leading-6 text-slate-400'>{note.content}</p>
          </div>

          <button onClick={()=>onNoteDeleted(note.id)} className='w-full font-medium bg-slate-800 text-sm py-4 text-slate-300 outline-none group'>Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota?</span> </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}