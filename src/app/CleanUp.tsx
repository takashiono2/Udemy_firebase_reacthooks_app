import React, { useState, useEffect } from 'react'

const CleanUp: React.FC = () => {
  const [currentNum, setCurrentNum] = useState(0);
  const incrementNum = () => {
    console.log("Mouse event invoke!");
    setCurrentNum((preNumber) => {
      return preNumber + 1;
    })
  }

  useEffect(() => {
    console.log("useEffect in CleaUp invoked");
    window.addEventListener("mousedown", incrementNum)
    return ()=>{
      console.log("cleaup invoke!");
      window.removeEventListener("mousedown", incrementNum);
    }
  }, []);
  return <div>{currentNum}</div>;
};
export default CleanUp;
