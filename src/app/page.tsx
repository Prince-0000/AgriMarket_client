"use client"
import {Button} from '@heroui/button'; 
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Home() {
  const [data, setData] = useState<string>("");

  useEffect(()=>{
    const fetchData = async()=>{
      axios.get("http://localhost:4000/api/message")
      .then((res)=>{
        setData(String(res.data.message));
        console.log(res);
      })
      .catch((err)=>{
        console.error("Not found :", err);
      })
    
    }
    fetchData();
  },[]);
  return (
   <div className='h-screen'>
      <Button>Click me</Button>
      {data ? (
        <div>
          <p>{data}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
   </div>
  );
}
