
import { store, persistor } from "@/store/store";
import { authService } from "@/services";
import { toast } from "sonner";
import getErrMsg from "./getErrMsg";
import { storeLogout } from "@/store/authSlice";

const handleLogout = async (finalFn, showToast = true, navigate) => {

  try {

    const response = await authService.logout();;

    if(response?.success ){
      
      store.dispatch(storeLogout());

      persistor.purge();

      if(showToast){
        toast.success(response?.message)
      }

      navigate("/")

    } else{
      store.dispatch(storeLogout())
    }
  } catch (e) {
    getErrMsg(e, showToast)
  } finally{
    if(finalFn){
      finalFn();
    }
  }
}

export default handleLogout