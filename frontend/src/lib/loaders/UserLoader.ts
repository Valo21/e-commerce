import store from "@src/store";
import axios from "axios";
import { setUser } from "@store/slices/authSlice.ts";

async function UserLoader(){
  try {
    const res = await axios.get('/api/v1/auth');
    store.dispatch(setUser(res.data));
  } catch (e) { /* empty */ }
  return null;
}
export default UserLoader;