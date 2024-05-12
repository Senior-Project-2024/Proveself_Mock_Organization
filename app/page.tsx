'use client'
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import { useToast } from '@chakra-ui/react'
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams()
  const toast = useToast()
  const toastIdRef = useRef<any>(null)
  const [isAuthProveSelf, setIsAuthProveSelf] = useState<boolean>(false)
  const [currentDomain, setCurrentDomain] = useState<string>("");
  const [tokenAPI, setTokenAPI] = useState<string>("")
  const [templateCode, setTemplateCode] = useState<string>("");
  const [publickey, setPublickey] = useState<string>("");
  const [evidenceURL, setEvidenceURL] = useState<string>("https://portfolio-pj-meaw.vercel.app/") 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(()=>{
    setCurrentDomain(window.location.origin)
    console.log(searchParams.get('userId'))
    console.log(searchParams.get('publickey'))
    if(searchParams.get('userId') && searchParams.get('publickey')){
      setIsAuthProveSelf(true);
      setPublickey(searchParams.get('publickey') ?? "")
    }else{
      setIsAuthProveSelf(false);
    }

  },[])

  async function mintBadge(){
    toastIdRef.current = toast({
      title: 'Logining...',
      description: "Loading",
      status: 'loading',
      duration: 30000,
      isClosable: true,
    })
    try{
      await axios.get(`http://localhost:4000/badges/mint?publickey=${publickey}&templateCode=${templateCode}&evidenceURL=${evidenceURL}`, {
        headers : {
          Authorization : `Bearer ${tokenAPI}`
        }
      })
      toast.update(toastIdRef.current,{
        title: 'Issue Badge successful.',
        description: "You've Issue Badge successful.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }catch(err : any){
      toast.update(toastIdRef.current,{
        title: 'Issue Badge Fail.',
        description: err.response.data.message ?? "You can see on log",
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
      console.log(err);
    }
  }

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-4">
      {
        isAuthProveSelf && 
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-col">
            <p className="text-[16px]">Token API</p>
            <input type="text" value={tokenAPI} onChange={(e)=>setTokenAPI(e.target.value)} className="border border-black p-2 outline-none rounded-md text-[14px] font-normal w-[700px]"  />
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col">
              <p className="text-[16px]">TemplateCode</p>
              <input type="text" value={templateCode} onChange={(e)=>setTemplateCode(e.target.value)} className="border border-black p-2 outline-none rounded-md text-[14px] font-normal w-[400px]"  />
            </div>
            <div className="flex flex-col">
              <p className="text-[16px]">Evidence URL</p>
              <input type="text" value={evidenceURL} onChange={(e)=>setEvidenceURL(e.target.value)} className="border border-black p-2 outline-none rounded-md text-[14px] font-normal w-[400px]"  />
            </div>
          </div>
        </div>
      }
      {
        isAuthProveSelf ?
        <button className="border border-black p-4 rounded-md flex items-center gap-2" onClick={()=>{mintBadge()}}>
          {
            isLoading &&
            <svg aria-hidden="true" className="w-7 h-7 text-gray-300 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          }
          <p className="text-[22px] font-medium">Issue Badge</p>
        </button>
        :
        // <Link href={"http://localhost:4000/auth/thirdParty?redirectURL=" + currentDomain}>
        <Link href={"http://localhost:4000/auth/thirdParty?redirectURL=" + currentDomain}>
          <button className="border border-black p-4 rounded-md " >
            <p className="text-[22px] font-medium">Login ProveSelf</p>
          </button>
        </Link>

      }
    </main>
  );
}
