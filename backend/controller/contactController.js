import resend from "../config/resend.js";

export const SendMail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Change after verifying your domain
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission`,
      html: `
        <h2>New Contact Request</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Failed to send email.",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: err.message,
    });
  }
};