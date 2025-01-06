import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = "contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.error("Validation failed: Missing fields");
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Message: message,
          },
        }),
      }
    );

    const airtableResponse = await response.json();

    if (!response.ok) {
      console.error("Airtable error:", airtableResponse);
      return NextResponse.json(
        { error: airtableResponse.error || "Failed to submit data." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Your message has been sent!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
