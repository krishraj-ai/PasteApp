
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { Copy } from "lucide-react";

const ViewPaste = () => {
const {id} = useParams();

    // const [title, setTitle] = useState("");
    // const [value, setValue] = useState("");
    // const [searchParams, setSearchparams] = useSearchParams();
    // const pasteId = searchParams.get("pasteId");
    // const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);
  
  //const paste = allpastes.filter((p) => p._id === id)[0];

const paste = allpastes.find((p) => String(p._id) === String(id));
    // useEffect(() => {
    //     if (pasteId) {
    //         const paste = allpastes.find((p) => p._id === pasteId);
    //         if (paste) {
    //             setTitle(paste.title);
    //             setValue(paste.content);
    //         }
    //     }
    // }, [pasteId]);

    // function createPaste() {
    //     const paste = {
    //         title: title,
    //         content: value,
    //         _id: pasteId || Date.now().toString(36),
    //         createdAt: new Date().toISOString(),
    //     };
    //     if (pasteId) {
    //         dispatch(updateToPaste(paste));
    //     } else {
    //         dispatch(addToPaste(paste));
    //     }
    //     setTitle("");
    //     setValue("");
    //     setSearchparams({});
  // }
    if (!paste) {
      return (
        <div className="flex min-h-[70vh] items-center justify-center">
          <h2 className="text-2xl font-bold text-red-600">Paste not found</h2>
        </div>
      );
    }

    return (
      <div className=" bg-slate-100 place-content-between">
        <input
          className="p-2 rounded-2xl bg-slate-200 mb-2 mr-2 w-[80%] placeholder:text-slate-400 pl-3"
          type="text"
          placeholder="Enter Title Here"
          value={paste.title}
          disabled // Disable the input if pasteId exists
          // onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button
          onClick={createPaste}
          className="p-2 rounded-2xl bg-blue-700 text-white mt-2"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}

        {/* <div className="mt-2 rounded-2xl bg-slate-200 p-2">
          <textarea
            value={paste.content}
            disabled//={!!pasteId} // Disable the textarea if pasteId exists
            placeholder="Enter Content Here ..."
            // onChange={(e) => setValue(e.target.value)}
            rows={10}
            cols={100}
            name=""
            id=""
            //provide copy button to copy the content of the textarea to clipboard


          ></textarea>
        </div> */}
        <div className="mt-2 rounded-2xl bg-slate-200 p-2">
          <textarea
            value={paste.content}
            disabled
            placeholder="Enter Content Here ..."
            rows={10}
            cols={100}
            className="w-full rounded-lg p-2"
          />

          <button
            onClick={() => {
              navigator.clipboard.writeText(paste.content);
              toast.success("Content copied!");
            }}
            className="mt-2 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Copy size={18} />
            {/* Copy */}
          </button>
        </div>
      </div>
    );
}

export default ViewPaste
