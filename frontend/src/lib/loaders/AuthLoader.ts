import axios from "axios";
import store from "@src/store";
import { setUser } from "@store/slices/authSlice.ts";
import { redirect } from "react-router-dom";

async function AuthLoader(){
  try {
    const res = await axios.get('/api/v1/auth');
    store.dispatch(setUser(res.data));
    return null;
  } catch (e){
    return redirect('/')
  }
}

export default AuthLoader;