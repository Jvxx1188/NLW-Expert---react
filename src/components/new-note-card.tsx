import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

let speecRecognition : SpeechRecognition | null;

interface NewnotecardProps {
  onNoteCreated :  (content : string) => void
}
export function Newnotecard({onNoteCreated} : NewnotecardProps){
const [shouldShowOnBoarding,setShouldShowOnBoarding] = useState(true) 
const [content,setContent] = useState('')
const [recording,setRecording] = useState(false)

function handleBack(event : React.ChangeEvent< HTMLTextAreaElement>){
  //SE NÃO TEM NADA NO TEXTO VOLTA PARA A PAGINA DE ESCOLHA
  if(!event.target.value)  setShouldShowOnBoarding(true)
  setContent(event.target.value)
}
function handleSaveNote(event :React.FormEvent){
  event.preventDefault()
  if(!content){return console.log('sem conteudo', content)}
  onNoteCreated(content)
  toast.success('Nota Salva')
  setContent('')
  setShouldShowOnBoarding(true)
}
function handleStartRecording(){
  
  //verificar se o navegador tem esse suporte
  //se não achar speechrecognition in window ele pula pra proxima busca até não ter mais nada e dar false
  const IsSpeechRecognitionAvailabe = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  if(!IsSpeechRecognitionAvailabe) return alert('seu navegador não suporta essa tecnologia')
  //iniciar
  setRecording(true)
  setShouldShowOnBoarding(false)
const SpeedRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

 speecRecognition = new SpeedRecognitionAPI()
//configurações do speechrecognition
speecRecognition.lang = 'pt-BR'
speecRecognition.continuous = true
speecRecognition.interimResults = true
speecRecognition.maxAlternatives = 1
speecRecognition.onresult = (event) =>{
console.log(event.results)

const content = Array.from(event.results)
 .map((result) => result[0])
 .map((result) => result.transcript)
 .join('')
 setContent(content)
}
speecRecognition.onerror = (err) =>{
  console.error(err)
}
speecRecognition.start()
}

function handleStopRecording(){
  setRecording(false)
  if(speecRecognition != null){
    speecRecognition.stop()
  }
  if(content == '') setShouldShowOnBoarding(true)
}

   return(
<Dialog.Root>
      <Dialog.Trigger className='rounded-md text-left bg-slate-700 flex p-5 flex-col gap-3 space-y-3  overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
       
         <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
         <p className='text-sm flex-1 leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente</p>
      
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60 backdrop-blur-[2px] ' />
        <Dialog.Content className='flex flex-col inset-0 md:rounded-md overflow-hidden z-10 fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700'>
          <Dialog.Close onClick={()=> setShouldShowOnBoarding(true)} className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-50'>
            <X className='size-5'/>
          </Dialog.Close>
          
        <form className="flex flex-col flex-1">
          
          <div className='flex flex-1 flex-col gap-3 p-5 text-sm font-medium '>
          <span className=' text-slate-300'>Adicionar nota</span>
          {shouldShowOnBoarding ? (
             <p className= 'leading-6 text-slate-400'>Comece <span onClick={handleStartRecording} className="text-lime-400 hover:underline  hover:cursor-pointer">gravando uma nota em áudio </span>ou se preferir <span onClick={()=>setShouldShowOnBoarding(false)} className="text-lime-400 hover:underline hover:cursor-pointer">utilize apenas texto</span></p>
          ) : (
            <textarea value={content} autoFocus onChange={handleBack} className="resize-none flex-1 bg-transparent outline-none leading-6 font-light text-slate-300" placeholder="Comece a digitar seu texto..."></textarea>
            )}
          </div>
          
          {
           recording ? (
             <button onClick={handleStopRecording} type="button"className='w-full flex flex-row items-center gap-2 justify-center bg-slate-800 text-sm py-4 duration-150 text-slate-100 outline-none group hover:text-slate-950'><div className='size-3 rounded-full bg-red-500 animate-pulse'/> Gravando (toque p/ interromper)</button>
           ) : 
          (
            <button onClick={handleSaveNote} type="button"className='w-full  bg-lime-500 text-sm py-4 text-slate-950 outline-none group'>Salvar</button>
          )
          }
            
        </form>
       
        
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    ) 
}