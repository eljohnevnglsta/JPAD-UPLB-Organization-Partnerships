import React, { useEffect, useState } from 'react';
import PartnershipSummary from '../components/PartnershipSummary';
import axios from 'axios';

const userEmail = "exec@yses.org";

export default function Management() {
    // useState to store the partnerships
    const [partnerships, setPartnerships] = useState([]);
    var incoming = [];
    var outgoing = [];
    useEffect(() => {
        axios.get('http://localhost:3001/request/get/all').then((response) => {
            incoming = response.data.filter((partnership) => partnership.invitee === userEmail);
            outgoing = response.data.filter((partnership) => partnership.publisher === userEmail);
            setPartnerships(outgoing);
        }).catch((error) => {
            console.log(error.message);
        });
    }, []);

    return (
        <div className="flex w-screen h-screen">
          <div className="w-1/3 border-r border-black flex flex-col">
            <div className="border-b border-black h-16 flex items-center justify-center">
                <p className="text-3xl font-sans-apple-system font-extrabold">your partnerships</p>
            </div>
            <div className="border-b border-black h-16 flex space-x-10 items-center justify-evenly p-10">
                <div className="flex flex-col items-center justify-center" onClick={() => {setPartnerships(incoming)}}>
                    <img className="w-10 h-10" 
                        src="https://img.icons8.com/?size=100&id=eVNSdU8gTUON&format=png&color=000000" 
                        alt="Request"/>
                    <p>requests</p></div>
                <div className="flex flex-col items-center justify-center" onClick={() => {setPartnerships(outgoing)}}>
                    <img className="w-10 h-10" 
                        src="https://img.icons8.com/?size=100&id=7874&format=png&color=000000" 
                        alt="Sent"/><p>sent</p></div>
                <div className="flex flex-col items-center justify-center">
                    <img className="w-10 h-10" 
                        src="https://img.icons8.com/?size=100&id=12404&format=png&color=000000" 
                        alt="Approved"/><p>approved</p></div>
                <div className="flex flex-col items-center justify-center">
                    <img className="w-10 h-10" 
                        src="https://img.icons8.com/?size=100&id=ZLZpTTLWyuCY&format=png&color=000000" 
                        alt="Rejected"/><p>rejected</p></div>
            </div>
            <div className="flex-grow flex-col flex items-center justify-start">
                {console.log(partnerships)}
                {partnerships.map((partnership) => (
                    <PartnershipSummary key={partnership.requestId} partnership={partnership} />
                ))}
            </div>
          </div>
    
          {/* Right Section */}
          <div className="flex-grow border-l border-black flex items-center justify-center">
            <p>Main Content Area</p>
          </div>
        </div>
      );
}
