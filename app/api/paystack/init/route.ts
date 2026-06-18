import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { enrollmentId, email } = await req.json();

    if (!enrollmentId || !email) {
      return NextResponse.json(
        { error: "Missing enrollmentId or email" },
        { status: 400 }
      );
    }

    // 1. Get enrollment + course
    const { data: enrollment, error: enrollError } =
      await supabase
        .from("enrollments")
        .select(`
          *,
          courses (*)
        `)
        .eq("id", enrollmentId)
        .single();

    if (enrollError || !enrollment) {
      throw new Error("Enrollment not found");
    }

    const course = enrollment.courses;

    if (!course) {
      throw new Error("Course not found");
    }

    // 2. Determine amount
    let amount = course.price_full;

    if (enrollment.payment_plan === "installment") {
      amount = course.price_installment;
    }

    if (enrollment.payment_plan === "scholarship") {
      return NextResponse.json({
        message: "Scholarship does not require payment",
      });
    }

    // 3. Generate reference
    const reference = `KORVA_${Date.now()}_${enrollmentId}`;

    // 4. Save reference to enrollment
    await supabase
      .from("enrollments")
      .update({
        paystack_reference: reference,
      })
      .eq("id", enrollmentId);

    // 5. Initialize Paystack payment
    const paystackRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount * 100, // Paystack uses kobo
          reference,
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        }),
      }
    );

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      throw new Error(paystackData.message);
    }

    return NextResponse.json({
      success: true,
      authorization_url: paystackData.data.authorization_url,
      reference,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}