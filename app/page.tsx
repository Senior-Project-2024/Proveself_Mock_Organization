'use client'
import axios from "axios";

import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{

    axios.get("http://localhost:4000/auth/whoAmI", {
      withCredentials : true
    }).then((res : any)=>{
      console.log(res)
    })
    
  },[])
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <button className="border border-black p-4 rounded-md">
        Login ProveSelf
      </button>
    </main>
  );
}
