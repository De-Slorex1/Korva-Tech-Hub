import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = body.event;

    // We only care about successful payments
    if (event !== "charge.success") {
      return NextResponse.json({ received: true });
    }

    const data = body.data;

    const reference = data.reference;
    const status = data.status;
    const amount = data.amount / 100;

    if (status !== "success") {
      return NextResponse.json({ received: true });
    }

    // 1. Find payment/enrollment using reference
    const { data: enrollment, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("paystack_reference", reference)
      .single();

    if (error || !enrollment) {
      console.error("Enrollment not found for reference:", reference);
      return NextResponse.json({ received: true });
    }

    // 2. Update enrollment → ACTIVE
    await supabase
      .from("enrollments")
      .update({
        status: "active",
        payment_status: "paid",
      })
      .eq("id", enrollment.id);

    // 3. Create payment record (optional but important)
    await supabase.from("payments").insert({
      enrollment_id: enrollment.id,
      amount,
      status: "success",
      reference,
    });

    console.log("Payment confirmed & enrollment activated");

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}