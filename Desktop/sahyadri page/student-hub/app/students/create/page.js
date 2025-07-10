"use client"

import React from "react";
import {useState} from "react";
import InputField from "@/app/components/InputField";
import {supabase} from "@/app/lib/supabase";
import {User2Icon, Share} from "lucide-react";

export default function CreateStudent() {
    const [name,setName]=useState("")
    const [age,setAge]=useState(0)
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState(0)
    const [address,setAddress]=useState("")
    const [gender,setGender]=useState("")
    const [usn,setusn]=useState("")

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-blue-500">CreateStudent</h1>
            <h1  className="ml-2" ><User2Icon size={20}/></h1>
            <InputField
            type={"text"}
            value={name}
            placeholder={"Student Name"}
            onChange={(e) => {
                setName(e.target.value)
            }}/>
            <InputField
            type={"text"}
            value={usn}
            placeholder={"Student USN"}
            onChange={(e) => {
                setusn(e.target.value)
            }}/>
            <InputField
            type={"number"}
            value={age}
            placeholder={"Student Age"}
            onChange={(e) => {
                setAge(e.target.value)
            }}/>
            <InputField
            type={"email"}
            value={email}
            placeholder={"Student email"}
            onChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <InputField
            type={"text"}
            value={address}
            placeholder={"Student address"}
            onChange={(e) => {
                setAddress(e.target.value)
            }}/>
            <InputField
            type={"text"}
            value={phone}
            placeholder={"Student Phone"}
            onChange={(e) => {
                setPhone(e.target.value)
            }}/>
            <InputField
            type={"text"}
            value={gender}
            placeholder={"Student gender"}
            onChange={(e) => {
                setGender(e.target.value)
            }}/>

            <button
            onClick={async(event)=> {
                if(usn=="" ||name=="" ||email=="" ||age=="" ||address=="" ||phone=="" ||gender=="")
                {
                    alert('All field are mandatory')
                    return;
                }
                else{
                    try {
                    const {data, error} = await supabase.from('Student').insert({
                        name:name,
                        usn:usn,
                        phone:phone,
                        email:email,
                        adddress:address,
                        age:age,
                        gender:gender,
                    }).select()
                    if (error !=null) {
                        throw error
                    }
                    alert(`Student Profile Created \n ${JSON.stringify(data)}`)
                }catch(e){
                    alert(`Error : ${JSON.stringify(e)}`)
                }
            }
            }}
            className="flex flex-row bg-green-800 text-white text-lg p-3 rounded-md shadow space-x-2">
                Create Profile
                <Share size={20} className="ml-2"/>
                </button>
        </div>  
    )
}