import { createContext, useContext, useState } from "react";
import MySnackBar from "../components/MySnackBar";

   export const ToastContext = createContext({})

   export const ToastProvide = ({children})=>{
    const [open, setOpen] = useState(false);
    const [massage, setMassage] = useState("");

      function showHideToast(massage) {
        setOpen(true)
        setMassage(massage)
        setTimeout(() => {
          setOpen(false)
        }, 2000);
      }

    return (
            <ToastContext.Provider value={{showHideToast : showHideToast}}>
                <MySnackBar open={open} massage={massage}/>
                {children}
            </ToastContext.Provider>
     )
   }

   export const useToast = ()=>{
    return useContext(ToastContext)
   }
