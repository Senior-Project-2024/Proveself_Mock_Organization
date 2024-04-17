'use client'
import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthProveSelf, setIsAuthProveSelf] = useState<boolean>(false)
  const myDomain = "http://localhost:3000"
  useEffect(()=>{

    axios.get("http://localhost:4000/auth/whoAmI", {
      withCredentials : true
    }).then((res : any)=>{
      console.log(res)
      if(res.data.user){
        setIsAuthProveSelf(true)
      }else{
        setIsAuthProveSelf(false)
      }
    })

  },[])

  return (
    <main className="w-full h-screen flex justify-center items-center">
      {
        isAuthProveSelf ?
        <button className="border border-black p-4 rounded-md">
          Mint
        </button>
        :
        <Link href={"http://localhost:4000/auth/thirdParty?redirectURL=" + myDomain}>
          <button className="border border-black p-4 rounded-md" >
            Login ProveSelf
          </button>
        </Link>

      }
    </main>
  );
}
