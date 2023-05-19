import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col,Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";


const key='d8231544d8c6412ab15356c261b497d4'
export default function SecPage(){

     const location=useLocation()
    const {name,lat,lon,formatted,city,state}=location.state

    const[latitude,setLatitude]=useState('');
    const[longitude,setLongitude]=useState('');
    const[address,setAddress]=useState('')
    const[directions,setDirections]=useState([])
  
   

    const geoLocation=()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude)
                }
            )

        }
    }
    geoLocation()

    
    


  function hello(){
const b=`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=d8231544d8c6412ab15356c261b497d4`
 fetch(b)
 .then(response => 
  response.json())
  .then(result=>{
    if (result.features) {
      let faddress=result.features[0].properties.formatted
    setAddress(faddress);
    } 
    

  }
  )

  }
  hello()




useEffect(()=>{
  axios.get(`https://api.geoapify.com/v1/routing?waypoints=${latitude},${longitude}|${lat},${lon}&mode=drive&apiKey=d8231544d8c6412ab15356c261b497d4`)
  .then((res)=>{
    let pp=res.data.features[0].properties.legs[0].steps

    setDirections(pp)
})

},[])


   return(
        <div padding={40}>
            <Row>
                <Col>
                <Card style={{width:'27rem',padding:20,height:'auto',overflow:'hidden',margin:30,border:'2px solid gray'}}>
                <Card.Text style={{borderBottom:'2px solid gray',fontSize:"1.5rem"}}><b>{name}</b></Card.Text>
                <Card.Text><b>User Latitude :</b> {latitude}</Card.Text>
                <Card.Text><b>User Longitude : </b> {longitude}</Card.Text>
                <Card.Text style={{borderBottom:'2px solid gray',paddingBottom:'1rem'}}><b>User Formatted Address : </b>{address}</Card.Text>
                <Card.Text><b>Hospital Latitude : </b> {lat}</Card.Text>
                <Card.Text><b>Hospital Longitude : </b>{lon}</Card.Text>
                <Card.Text style={{borderBottom:'2px solid gray',paddingBottom:'1rem'}}><b>Hospital Formatted Address : </b>{formatted}</Card.Text>
                <Card.Text style={{display:'flex'}}><b>Hospital State :  </b>{state}</Card.Text>
                <Card.Text style={{display:'flex'}}><b>Hospital City :  </b>{city}</Card.Text>
                </Card>

                </Col>
                <Col>
                  <Card style={{width:'27rem',padding:20,height:'auto',overflow:'hidden',margin:30,border:'1.5px solid gray'}}>
                     {
                      directions.map((direction)=>{
                        return(
                          <div>
                            <li>{direction.instruction.text}</li>
                            
                          </div>
                        )
                      })
                     }
                  </Card>
                </Col>
            </Row>
            
        </div>
    )

}