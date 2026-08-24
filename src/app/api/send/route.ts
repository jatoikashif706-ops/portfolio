import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 1. Basic Server-side Input Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // 2. Check if Resend is configured
    if (!resend) {
      console.log("Contact form submission (Resend not configured):", { name, email, message });
      return NextResponse.json(
        { 
          success: true, 
          message: "Message received! (Email service not configured in development)" 
        },
        { status: 200 }
      );
    }

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
    if (!recipient) {
      return NextResponse.json(
        { error: "Server configuration missing recipient email." },
        { status: 500 }
      );
    }

    // 3. Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>", // Replace with your verified domain in production
      to: [recipient],
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
        <h2 style="color: #0f172a; margin-bottom: 16px;">New Contact Form Submission</h2>
        <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="margin: 8px 0; font-weight: bold; color: #334155;">Message:</p>
        <p style="white-space: pre-wrap; color: #475569; line-height: 1.5;">${message}</p>
      </div>`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending email." },
      { status: 500 }
    );
  }
}
