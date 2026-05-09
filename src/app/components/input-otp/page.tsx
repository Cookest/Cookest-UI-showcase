"use client";

import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function InputOTPPage() {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Input OTP"
        description="An accessible one-time password input with individual character slots. Built on input-otp."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="6-Digit OTP"
          description="Standard 6-digit one-time password field for verification."
          code={`<InputOTP maxLength={6} value={otp} onChange={setOtp}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-sm font-medium mb-1" style={{ color: "var(--ck-heading)" }}>Verify your Cookest account</p>
              <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>We sent a 6-digit code to chef@example.com</p>
            </div>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(v) => { setOtp(v); if (v === "123456") setVerified(true); }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {otp.length > 0 && (
              <p className="text-xs" style={{ color: verified ? "var(--ck-primary)" : "var(--ck-text-muted)" }}>
                {verified ? "✓ Verified! (try 123456)" : `Entered: ${otp.length}/6 digits`}
              </p>
            )}
          </div>
        </Playground>

        <Playground
          title="4-Digit PIN"
          description="Shorter OTP for PIN entry — for recipe lock screens."
          code={`<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`}
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm" style={{ color: "var(--ck-text-muted)" }}>Enter your 4-digit recipe collection PIN</p>
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "maxLength", type: "number", description: "Total number of characters the OTP input accepts." },
            { name: "value", type: "string", description: "Controlled value of the OTP input." },
            { name: "onChange", type: "(value: string) => void", description: "Callback when the value changes." },
            { name: "InputOTPSlot", type: "{ index: number }", description: "Each individual character slot. Must have an index." },
            { name: "InputOTPSeparator", type: "—", description: "A visual separator (dash) between slot groups." },
          ]}
        />
      </div>
    </div>
  );
}
