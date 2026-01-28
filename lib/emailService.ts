import nodemailer from "nodemailer";

export async function sendMail(to: string, subject: string, text: string) {
  try {
    console.log('📧 Gmail E-mail verzenden naar:', to);
    console.log('📧 Onderwerp:', subject);
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // gebruik STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('🔧 Gmail SMTP transporter geconfigureerd');

    const info = await transporter.sendMail({
      from: `"Fatbikehulp" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      headers: {
        'X-Mailer': 'Fatbikehulp Reparatie App',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
        'Reply-To': process.env.SMTP_USER || '',
        'Return-Path': process.env.SMTP_USER || '',
        'X-Spam-Check': 'Pass',
        'X-Auto-Response-Suppress': 'All',
        'Precedence': 'bulk',
        'List-Unsubscribe': '<mailto:unsubscribe@fatbikehulp.nl>',
        'X-Report-Abuse': 'Please report abuse to abuse@fatbikehulp.nl',
        'Message-ID': `<${Date.now()}.${Math.random().toString(36).substr(2, 9)}@fatbikehulp.nl>`,
      } as any,
    });

    console.log("✅ Gmail E-mail verzonden:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Gmail SMTP-fout:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function sendHtmlMail(to: string, subject: string, html: string) {
  try {
    console.log('📧 Gmail HTML E-mail verzenden naar:', to);
    console.log('📧 Onderwerp:', subject);
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // gebruik STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('🔧 Gmail SMTP transporter geconfigureerd');

    const info = await transporter.sendMail({
      from: `"Fatbikehulp" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      headers: {
        'X-Mailer': 'Fatbikehulp Reparatie App',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
        'Reply-To': process.env.SMTP_USER || '',
        'Return-Path': process.env.SMTP_USER || '',
        'Content-Type': 'text/html; charset=UTF-8',
        'X-Spam-Check': 'Pass',
        'X-Auto-Response-Suppress': 'All',
        'Precedence': 'bulk',
        'List-Unsubscribe': '<mailto:unsubscribe@fatbikehulp.nl>',
        'X-Report-Abuse': 'Please report abuse to abuse@fatbikehulp.nl',
        'Message-ID': `<${Date.now()}.${Math.random().toString(36).substr(2, 9)}@fatbikehulp.nl>`,
      } as any,
    });

    console.log("✅ Gmail HTML E-mail verzonden:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Gmail SMTP-fout:", error);
    return { success: false, error: (error as Error).message };
  }
}
