import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {name,username,email,password} = body;
        
        //check email if already exist
        const existingUserByEmail = await db.user.findUnique({
            where : {email:email}
        })
        if(existingUserByEmail){
            return NextResponse.json({
                user:null,
                message:"User with this email already exist"
            },
            {status:409})
        }
        //check email if already exist
        const existingUserByUsername = await db.user.findUnique({
            where : {username:username}
        })
        if(existingUserByUsername){
            return NextResponse.json({
                user:null,
                message:"User with this username already exist"
            },
            {status:409})
        }
        const hashPassword = await hash(password,10);
        const newUser = await db.user.create({
            data :{
                name,
                username,
                email,
                password : hashPassword
            }
        });
        return NextResponse.json(body);
    } catch(error) {
        console.log(error)
    }
}