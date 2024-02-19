import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.js";
import { useDispatch } from 'react-redux'
import { signinUser } from "../redux/user/userSlice.js"
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const user = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = user.user;
      const userInfo = {
        displayName,
        email,
        photoURL
      };

      const response = await fetch('/api/v1/user/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      if (response.ok) {
        const loggedInUser = await response.json();
        const currentUser = loggedInUser.data
        dispatch(signinUser(currentUser));
        navigate('/')
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

  return (
    <button
      type='button'
      onClick={loginWithGoogle}
      className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 w-full max-w-md my-2'
    >Continue with google</button>
  )
}

export default OAuth