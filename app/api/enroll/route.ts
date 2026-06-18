import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Check if user exists in auth
    let userId: string | null = null;

    const { data: users } =
      await supabase.auth.admin.listUsers();

    const existingUser = users.users.find(
      (u) => u.email === email
    );

    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Create user (NO password - magic link flow later)
      const { data, error } =
        await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
        });

      if (error) throw error;

      userId = data.user.id;
    }

    // 2. Create or update profile
    await supabase.from("profiles").upsert({
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      phone,
      country,
      role: "student",
    });

    // 3. Create enrollment (PENDING)
    const { data: enrollment, error: enrollError } =
      await supabase
        .from("enrollments")
        .insert({
          user_id: userId,
          course_id: courseId,
          cohort_id: cohortId,
          payment_plan: paymentPlan,
          status: "pending",
          payment_status: "pending",
        })
        .select()
        .single();

    if (enrollError) throw enrollError;

    // 4. Generate Paystack reference
    const reference = `KORVA_${Date.now()}_${enrollment.id}`;

    // update enrollment with reference
    await supabase
      .from("enrollments")
      .update({
        paystack_reference: reference,
      })
      .eq("id", enrollment.id);

    // 5. Return response
    return NextResponse.json({
      success: true,
      enrollment,
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