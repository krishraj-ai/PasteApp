import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';    


const initialState = {
  pastes:localStorage.getItem("pastes")? JSON.parse(localStorage.getItem("pastes")) : []
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    
    // reducers: {
        reducers: {
    addToPaste: (state,action) => {
                const paste = action.payload;
                //add a check -> if paste already exist with same title then dont create it
                const existingPaste = state.pastes.find(p => p.title === paste.title);
                if (existingPaste) {
                    toast.error("Paste with this title already exists");
                    return;
                }
                state.pastes.push(paste);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste Created Successfully");


    },
            updateToPaste: (state, action) => {
                const paste = action.payload;
                const index = state.pastes.findIndex((item) => item._id === paste._id);
                if (index >= 0) {
                    state.pastes[index] = paste;
                    localStorage.setItem("pastes", JSON.stringify(state.pastes));
                    toast.success("Paste Updated Successfully");
                }
          
                

                
    
    },
            resetAllPaste: (state, action) => {
                state.pastes = [];
                localStorage.removeItem("pastes");
   
    },
    removeFromPastes: (state,action) => {
        const pasteId = action.payload;
        console.log(pasteId);
        const index = state.pastes.findIndex((item) => item._id === pasteId);
        if (index >= 0) {
            state.pastes.splice(index, 1);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste Deleted Successsfully");
        }

    },
},
    
});

export const { addToPaste, updateToPaste, resetAllPaste, removeFromPastes } = pasteSlice.actions;
export default pasteSlice.reducer;