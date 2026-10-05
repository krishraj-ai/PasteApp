import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { removeFromPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes)
  // console.log(pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleClick(pasteId) {
    dispatch(removeFromPastes(pasteId));
    setSearchTerm(''); // Clear the search term after deletion
  }

  
  return (
    <div className='bg-slate-100 p-4'>
      <input className='p-2 rounded-2xl min-w-[400px] mt-4 bg-gray-200' type="search" placeholder='search here...' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} />

      <div className='bg-slate-200 p-4 mt-4 rounded-2xl min-h-[400px]
      flex flex-col space-evenly'>{
        filteredData.length > 0 && filteredData.map(
          (paste) => {
            return (
              <div className="border-b border-gray-300 py-2" key={paste?.id}>
                <div>
                  {
                    <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
                      {paste.title}
                    </h1>
                  }
                  <br />
                  <p className="text-gray-600">{paste.content}</p>
                </div>
                <div className="flex space-x-2 mt-2 space-evenly">
                  <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-2xl">
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                    
                  </button>
                  <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-2xl">
                    <a href={`/pastes/${paste?._id}`}>View</a>
                    
                  </button>
                  <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-2xl" onClick={() => {
                    // Share functionality through generating a link with the paste ID
                    const shareableLink = `${window.location.origin}/?pasteId=${paste._id}`;
                    //use navigator.clipboard to copy the link to clipboard
                    navigator.clipboard.writeText(shareableLink);
                    toast.success("Link Copied to clipboard");
                  }}>
                    Share
                  </button>
                  <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-2xl"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard")
                    }}>
                    Copy
                  </button>
                  <button
                    className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 border-red-600 px-4 rounded-2xl"
                    onClick={() => handleClick(paste?._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="text-sm text-black ml-2 mt-4 font-bold">
                  {/* {paste.createdAt.date}/{paste.createdAt.month} /{paste.createdAt.year} */}
                  <p className="text-sm text-black-500">
                    {new Date(paste.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
        })
      
      }

      </div>
    </div>
  )
}

export default Paste
