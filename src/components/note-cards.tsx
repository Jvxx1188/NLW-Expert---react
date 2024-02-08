import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface noteProps {
  note: {
    date: Date,
    content: string
  }
}
export function NoteCard({ note }: noteProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md text-left bg-slate-800 p-5 flex flex-col gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date,{locale :ptBR,addSuffix: true})}</span>
        <p className='text-sm leading-6 text-slate-400'>{note.content}</p>

        <div className='absolute bottom-0 w-full right-0 left-0 h-2/4 bg-gradient-to-b from-transparent to-black/60 pointer-events-none'></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60' />
        <Dialog.Content className='z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700'>
          
          <div className='flex flex-1 flex-col gap-3 p-5'>
          <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date,{locale :ptBR,addSuffix: true})}</span>
          <p className='text-sm leading-6 text-slate-400'>{note.content}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}