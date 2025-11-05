import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const mailer = async (to, otp) => {
  // ❗️XATO joy: Siz ` ``` ` o‘rniga oddiy backtick (`) ishlatishingiz kerak.
  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Your OTP</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; padding: 16px !important; }
        .otp { font-size: 28px !important; letter-spacing: 6px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table class="container" width="600" cellpadding="0" cellspacing="0" role="presentation"
            style="width:600px;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(20,20,40,0.08);">
            <tr>
              <td style="padding:28px 36px 12px 36px;text-align:left;">
                <h1 style="margin:0;font-size:20px;color:#0f1724;">Your One-Time Passcode (OTP)</h1>
                <p style="margin:8px 0 0 0;color:#475569;font-size:14px;line-height:1.4;">
                  Use the code below to complete your sign in. This code is valid for <strong>10 minutes</strong>.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 36px;text-align:center;">
                <div style="display:inline-block;background:#f8fafc;border-radius:10px;padding:18px 28px;">
                  <p style="margin:0 0 10px 0;font-size:13px;color:#6b7280;">One-time passcode</p>
                  <div class="otp"
                    style="font-family:'Courier New',Courier,monospace;font-size:34px;letter-spacing:8px;color:#0b1220;font-weight:700;">
                    ${otp}
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 36px 28px 36px;text-align:left;">
                <p style="margin:0 0 12px 0;color:#374151;font-size:13px;line-height:1.5;">
                  If you didn't request this code, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 36px 28px 36px;border-top:1px solid #eef2f7;font-size:12px;color:#94a3b8;">
                <p style="margin:0;">
                  <strong style="color:#0b1220;">Sirojiddin Oyosboyev</strong> — Security team<br/>
                  Contact us: <a href="mailto:support@example.com" style="color:#0b74ff;text-decoration:none;">support@example.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `; // 👈 E’tibor bering, bu yerda oddiy backtick ishlatilgan, ``` emas!

  try {
    const info = await transporter.sendMail({
      from: `"Sirojiddin Oyosboyev" <${process.env.GOOGLE_EMAIL}>`,
      to,
      subject: "Your OTP code",
      html,
    });
    console.log("✅ OTP email sent to:", to);
    return info;
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
    throw err;
  }
};


export const orderMailer = async (to, message) => {
  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Order Status</title>
  </head>
  <body style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
    <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:8px;">
      <h2 style="color:#0b1220;">Your Order Status</h2>
      <p>${message}</p>
      <p>If you didn't make this order, ignore this email.</p>
    </div>
  </body>
  </html>
  `;
  try {
    const info = await transporter.sendMail({
      from: `"Sirojiddin Oyosboyev" <${process.env.GOOGLE_EMAIL}>`,
      to,
      subject: "Your ORDER STATUS",
      html,
    });
    console.log("✅ Order email sent to:", to);
    return info;
  } catch (err) {
    console.error("❌ Order email failed:", err.message);
    throw err;
  }
};
