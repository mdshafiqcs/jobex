import { storeLogout } from "@/store/authSlice";
import { store } from "@/store/store";
import { toast } from "sonner";


const getErrMsg = (error, showToast) => {

  let msg = "";

  console.log(error);

  if(error?.message ){
    msg =  error.message || "Something went wrong";
  } else {
    msg = "Something went wrong";
  }

  if(error?.statusCode === 401){
    store.dispatch(storeLogout());
  } else {
    if(showToast){
      toast.error(msg);
    }
  }

  return msg;

}




export default getErrMsg;