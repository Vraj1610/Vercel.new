import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
const [title,setTitle] = useState('');
const [value,setValue] = useState('');
const [searchParams,setSearchParams] = useSearchParams();
const pasteId = searchParams.get("pasteId")
const dispatch = useDispatch();
const allPastes = useSelector((state)=> state.paste.pastes);

useEffect(() => {
  if(pasteId){
    const paste = allPastes.find((p) => p._id===pasteId);
  
    if (paste) { // Only set title and content if paste exists
      setTitle(paste.title);
      setValue(paste.content);
    } else {
      console.warn(`No paste found with ID ${pasteId}`);
      setTitle(''); // Clear fields if no paste is found
      setValue('');
    }

  }
}, [pasteId])

function createPaste(){

  const paste = {
    title : title,
    content: value,
    _id: pasteId || 
          Date.now().toString(36),
    createdAt: new Date().toISOString(), 
        }
        

  if(pasteId){//update

   dispatch(updateToPastes(paste));

  }else{// create
     dispatch(addToPastes(paste));
  }

  //after creation or updation
  setTitle('');
  setValue('');
  setSearchParams({});

}

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
      <input 
      className='p-1 rounded-2xl mt-2 w-[66%] pl-4'
      type="text" placeholder='Enter title here'
      value={title}
      onChange={(e)=>{setTitle(e.target.value)}}
      />

      <button className='p-2 rounded-2xl m-2' onClick={createPaste}>
       {
       pasteId ? "Update Paste" : "Create My Paste"
       }
      </button>
      
    </div>
    <div className='mt-8'>
      <textarea
      className='rounded-2xl mt-4 min-w-[500px] p-4'
      value={value}
      placeholder='Enter content here'
      onChange={(e)=>setValue(e.target.value)}
      rows={20}
      />
    </div>
    </div>
  )
}

export default Home
