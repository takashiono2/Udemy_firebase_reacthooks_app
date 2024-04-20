import React,{ useEffect } from 'react';
import styles from './App.module.css';
import {useSelector, useDispatch} from "react-redux";
import { selectUser, login, logout} from "./features/userSlice";
import { auth } from "./firebase";
import Feed from './components/Feed';
import Auth from './components/Auth';

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unSub = auth.onAuthStateChanged(authuser=>{
      if(authuser){
        dispatch(
          login({
            uid: authuser.uid,
            photoUrl: authuser.photoURL,
            displayName: authuser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  },[dispatch]);

  return (
    <>
    {user.uid ? (
      <div className={styles.app}>
        <Feed/>
      </div>
    ) : (
      <Auth/>
    )}
    </>
  );
}

export default App;
