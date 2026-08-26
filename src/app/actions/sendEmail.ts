"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type FormState = {
  success: boolean;
  error: string | null;
  id?: string;
};

export async function sendEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Simple server-side validation
  if (!name || !email || !message) {
    return { success: false, error: "Please fill out all fields." };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Replace with your domain once verified on Resend
      to: [process.env.CONTACT_RECIPIENT_EMAIL || "jatoikashif706@gmail.com"],
      subject: `New Portfolio Inquiry from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-bottom: 16px;">New Contact Form Submission</h2>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="margin: 8px 0; font-weight: bold; color: #334155;">Message:</p>
          <p style="white-space: pre-wrap; color: #475569; line-height: 1.5;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message || "Failed to send message." };
    }

    return { success: true, error: null, id: data?.id };
  } catch (error) {
    console.error("Send email error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
