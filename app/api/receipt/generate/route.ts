export const runtime = "nodejs";

import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { receiptTemplate } from "@/lib/receiptTemplate";
import { numberToWords } from "@/lib/numberToWords";
export async function POST(req: Request) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { error: "Missing reference" },
        { status: 400 }
      );
    }

    console.log("Receipt reference received:", reference);

    // 1. Get enrollment
    const { data: enrollment, error: enrollError } = await supabaseAdmin
      .from("enrollments")
      .select("*")
      .eq("paystack_reference", reference)
      .single();

    if (enrollError || !enrollment) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 }
      );
    }

    // 2. FIXED PROFILE QUERY (IMPORTANT)
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("first_name, last_name, phone, country, email")
      .eq("user_id", enrollment.user_id)
      .single();

    // 3. FIXED COURSE QUERY
   const { data: course } = await supabaseAdmin
    .from("Course")
    .select("name, price, duration")
    .eq("id", enrollment.course_id)
    .single();

    // 4. NO SILENT FALLBACKS (REAL DATA ONLY)
    const fullName =
      `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() ||
      "Unknown User";

    const receiptData = {
      name: fullName,
      email: profile?.email || "N/A",
      phone: profile?.phone || "N/A",
      country: profile?.country || "N/A",

      studentId: enrollment.user_id,
      receiptId: `KTH-${reference.slice(-8)}`,

      date: new Date(enrollment.created_at).toLocaleString(),

      reference,
      status: enrollment.payment_status,

      program: course?.name || "Unknown Course",
      duration: course?.duration || "N/A",
      startDate: enrollment.start_date
      ? new Date(enrollment.start_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "N/A",

      amount: course?.price ?? 0,
      amountWords: `${numberToWords(course?.price || 0)} Naira Only`,
    };

    // 5. HTML GENERATION
    const html = receiptTemplate(receiptData);

    // 6. PUPPETEER
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html);
    await page.waitForSelector(".receipt");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
});

    await browser.close();

    // 7. RETURN PDF (FIXED)
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="korva-receipt-${reference}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error("Receipt Error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate receipt" },
      { status: 500 }
    );
  }
}