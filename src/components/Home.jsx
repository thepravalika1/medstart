
import React from "react";
import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from "react-bootstrap"
import '../App.css'
import { useNavigate } from "react-router-dom";


const A_API='https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=place:5133b1a3a448965340598912fa8107533240f00101f90161e7940000000000c002099203104b616d617265646479206d616e64616c&limit=20&apiKey=d8231544d8c6412ab15356c261b497d4';
//const H_API='https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=place:51488a4fa0399f534059bb7c3b8a9e6f3140f00101f90100e4950000000000c00209920313536563756e64657261626164206d616e64616c&limit=20&apiKey=d8231544d8c6412ab15356c261b497d4'

function Home(){
    const [hospitals,setHospitals]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        axios.get(A_API).then((response)=>{
            console.log(response.data.features)
            setHospitals(response.data.features)
        })

    },[])
    
    return(
        <div className="cards" style={{padding:40}}>
            {hospitals.map((hospital)=>{   
            return(
                <div key={hospital.properties.name}>
                
                <Card onClick={()=>navigate(`/hospital/properties/${hospital.properties.name}`,{state:hospital.properties})} style={{width:'30rem',padding:20,height:'auto',overflow:'hidden',margin:10,border:'1px solid gray'}}>
                   <Card.Text style={{borderBottom:'1px solid gray'}}><h5>{hospital.properties.name}</h5></Card.Text>
                    <Card.Text>{hospital.properties.address_line2}</Card.Text>
                </Card>
                </div>
            )
            })}
            

        </div>
        


        
    )
}
export default Home;



