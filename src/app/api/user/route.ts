import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
      const json = await request.json();
  
      const feedback = await db.user.create({
        data: json,
      });
  
      let json_response = {
        status: "success",
        data: {
          feedback,
        },
      };
      return new NextResponse(JSON.stringify(json_response), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        let error_response = {
          status: "fail",
          message: "Feedback with title already exists",
        };
        return new NextResponse(JSON.stringify(error_response), {
          status: 409,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      let error_response = {
        status: "error",
        message: error.message,
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  export async function GET() {
    
    const feedbacks = await db.user.findMany();
  
    let json_response = {
      status: "success",
      results: feedbacks.length,
      feedbacks,
    };
    return NextResponse.json(json_response);
  }
  
  