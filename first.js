import React, { useState,useEffect } from "react"
import ReactDOM from "react-dom/client"
import useFetch from "./useFetch"
function Header(){
  return (
    <>
   <div className="top"> <h1 id="main"> Github Profile Viewer</h1></div>
    </>
  )
}
function Fun(){
    console.log("first");
    // const {profile,count,setcount,getdata,getnamedata}=useFetch();
    console.log("second");
    const [profile,setprofile]=useState([]);
    const [count ,setcount]=useState("");
    const [name,setname]=useState("master");

    async function getdata(count){
        let num=Math.floor(Math.random()*10000);
        console.log("render");
        const data=await(fetch(`https://api.github.com/users?since=${num}&per_page=${count}`));
        const data2=await(data.json());
        setprofile(data2);
    }
    // for name
    async function getnamedata(name){
       try{ console.log("render profile name");
        const data3=await(fetch(` https://api.github.com/users/${name}`)
      );
        const data4=await(data3.json());
        const arr=[];
        if(!data3.ok)
        {
          throw new Error(`Erro:${data3.status}:${data3.statusText}`)
        }
        arr.push(data4)
        console.log(arr)
        console.log(arr.length)
        setprofile(arr);
       }
       catch(error){
        alert('Fetch error: ' + error.message);
          console.log(error.message)
       }
    }

    useEffect(()=>getdata(count),[]);
    // useEffect(()=>getnamedata(name),[]);

    return(
        <>
        <Header/>
        <div className="search"> 
            <input type="text" placeholder="Type here..." onChange={(e)=>setcount(Number(e.target.value))}></input>
            <button onClick={()=>getdata(Number(count))}>Search</button>
        </div>
{/* name search field  */}
        <div className="search"> 
            <input type="text" placeholder="Enter Name..." onChange={(e)=>setname(e.target.value)}></input>
            <button onClick={()=>getnamedata(name)}>Search</button>
        </div>

        
      <div id="pro">{
        profile.map((val)=>{ 
          if(val.status==="404")
            { 
               return(<h1 style={{textAlign:"center", marginLeft:"33rem" , marginTop:"10rem"}}>Data Not Found</h1>)
            }
            else
            {return(
             
                <div id="card">  
               <img src={val.avatar_url}/>
                <h3 className="pad">{val.login}</h3>
                <a className="pad"href={val.html_url} target="_blank">Github</a>
                </div>
            )}
        })
      }</div>
        
        </>
    )
}

const rot=ReactDOM.createRoot(document.getElementById("root"));
rot.render(<Fun/>);



