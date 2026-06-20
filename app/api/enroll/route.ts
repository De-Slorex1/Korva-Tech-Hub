import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      firstName,
      lastName,
      phone,
      country,
      courseId,
      cohortId,
      paymentPlan,
    } = body;

    if (!email || !courseId || !paymentPlan) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Create auth user
    const { data: newUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
      });

    if (createError) {
      return NextResponse.json(
        { success: false, error: createError.message },
        { status: 400 }
      );
    }

    const userId = newUser.user.id;

    // 2. Create profile (IMPORTANT FIX: user_id is the key)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        phone,
        country,
        email,
        role: "student",
      });

    if (profileError) throw profileError;

    // 3. Create enrollment
    const { data: enrollment, error: enrollError } =
      await supabaseAdmin
        .from("enrollments")
        .insert({
          user_id: userId,
          course_id: courseId,
          cohort_id: cohortId || null,
          payment_plan: paymentPlan,
          status: "pending",
          payment_status: "pending",
          start_date: new Date(),
        })
        .select()
        .single();

    if (enrollError) throw enrollError;

    // 4. Paystack reference
    const reference = `KORVA_${Date.now()}_${enrollment.id}`;

    await supabaseAdmin
      .from("enrollments")
      .update({ paystack_reference: reference })
      .eq("id", enrollment.id);

    return NextResponse.json({
      success: true,
      enrollment,
      reference,
    });
  } catch (error: any) {
    console.error("Enroll Error:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}