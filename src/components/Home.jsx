import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../Redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchparams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
  //     console.log("pasteId:", pasteId);
  // console.log("pastes:", pastes);
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);

      
        setTitle(paste.title);
        setValue(paste.content);
      

    }
  }, [pasteId]);

  function createPaste() {

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      // Update existing paste
      dispatch(updateToPaste(paste));
    } else {
      // Create new paste
      dispatch(addToPaste(paste));
    }
    setTitle("");
    setValue("");
    setSearchparams({});
  }

  return (
    <div className=" bg-slate-100 place-content-between">
      <input
        className="p-2 rounded-2xl bg-slate-200 mb-2 mr-2 w-[80%] placeholder:text-slate-400 pl-3"
        type="text"
        placeholder="Enter Title Here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={createPaste}
        className="p-2 rounded-2xl bg-blue-700 text-white mt-2"
      >
        {pasteId ? "Update My Paste" : "Create My Paste"}
      </button>

      <div className="mt-2 rounded-2xl bg-slate-200 p-2">
        <textarea
          value={value}
          placeholder="Enter Content Here ..."
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          cols={100}
          name=""
          id=""
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
