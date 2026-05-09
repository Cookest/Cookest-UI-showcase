"use client";

import { useState, FormEvent } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Toggle,
  Divider,
  Alert,
  Tooltip,
} from "@cookest/ui";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { ExampleCliHint } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

type Tab = "login" | "signup";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function LoginFormPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign up fields
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const resetForm = () => {
    setErrors({});
    setSuccess(false);
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    resetForm();
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    if (!loginEmail.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginEmail)) newErrors.email = "Enter a valid email";
    if (!loginPassword.trim()) newErrors.password = "Password is required";
    else if (loginPassword.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    if (!signupName.trim()) newErrors.name = "Name is required";
    if (!signupEmail.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupEmail)) newErrors.email = "Enter a valid email";
    if (!signupPassword.trim()) newErrors.password = "Password is required";
    else if (signupPassword.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (signupPassword !== signupConfirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agreeTerms) newErrors.terms = "You must agree to the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div>
      <Breadcrumb />
      <ExampleCliHint components={["Input", "Button", "Toggle", "Card", "Alert", "Divider", "Tooltip"]} />
      <div
        className="flex items-center justify-center py-12 px-4 min-h-screen"
      >
      <div className="w-full max-w-[440px]">
        {/* Logo Area */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: 56,
              height: 56,
              background: "var(--ck-primary)",
              color: "#fff",
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            Ck
          </div>
          <div className="flex flex-col items-center gap-1">
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--ck-heading)",
              }}
            >
              Cookest
            </h1>
            <p style={{ color: "var(--ck-text-muted)", fontSize: "0.875rem" }}>
              Your personal cooking companion
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6">
            <Alert variant="success" title={tab === "login" ? "Welcome back!" : "Account created!"} dismissible onDismiss={() => setSuccess(false)}>
              {tab === "login"
                ? "You have been successfully logged in. Redirecting to your kitchen..."
                : "Your account has been created. Check your email to verify."}
            </Alert>
          </div>
        )}

        <Card padding="lg">
          <CardBody>
            <div className="flex flex-col gap-6">
              {/* Tab Switcher */}
              <div
                className="flex rounded-xl p-1"
                style={{ background: "var(--ck-surface)" }}
              >
                <button
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: tab === "login" ? "var(--ck-bg)" : "transparent",
                    color: tab === "login" ? "var(--ck-heading)" : "var(--ck-text-muted)",
                    boxShadow: tab === "login" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => switchTab("login")}
                >
                  Log In
                </button>
                <button
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: tab === "signup" ? "var(--ck-bg)" : "transparent",
                    color: tab === "signup" ? "var(--ck-heading)" : "var(--ck-text-muted)",
                    boxShadow: tab === "signup" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => switchTab("signup")}
                >
                  Sign Up
                </button>
              </div>

              {/* Login Form */}
              {tab === "login" && (
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <Input
                    label="Email"
                    placeholder="chef@cookest.app"
                    iconLeft={<Mail size={18} />}
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    error={errors.email}
                    fullWidth
                  />

                  <div className="flex flex-col gap-1">
                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      iconLeft={<Lock size={18} />}
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      error={errors.password}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                    />
                    <div className="flex justify-end">
                      <Tooltip content={showPassword ? "Hide password" : "Show password"} position="left">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconLeft={showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Toggle
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      label="Remember me"
                      toggleSize="sm"
                    />
                    <button
                      type="button"
                      className="text-sm font-medium"
                      style={{
                        color: "var(--ck-primary)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button variant="primary" size="lg" fullWidth loading={loading} type="submit">
                    Log In
                  </Button>
                </form>
              )}

              {/* Sign Up Form */}
              {tab === "signup" && (
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Gordon Ramsay"
                    iconLeft={<User size={18} />}
                    value={signupName}
                    onChange={(e) => {
                      setSignupName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    error={errors.name}
                    fullWidth
                  />

                  <Input
                    label="Email"
                    placeholder="chef@cookest.app"
                    iconLeft={<Mail size={18} />}
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    error={errors.email}
                    fullWidth
                  />

                  <div className="flex flex-col gap-1">
                    <Input
                      label="Password"
                      placeholder="At least 8 characters"
                      iconLeft={<Lock size={18} />}
                      value={signupPassword}
                      onChange={(e) => {
                        setSignupPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      error={errors.password}
                      helperText="Use 8+ characters with a mix of letters and numbers"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                    />
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconLeft={showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Input
                      label="Confirm Password"
                      placeholder="Re-enter your password"
                      iconLeft={<Lock size={18} />}
                      value={signupConfirmPassword}
                      onChange={(e) => {
                        setSignupConfirmPassword(e.target.value);
                        if (errors.confirmPassword)
                          setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }}
                      error={errors.confirmPassword}
                      fullWidth
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconLeft={showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Toggle
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                      }}
                      label="I agree to the Terms of Service and Privacy Policy"
                      toggleSize="sm"
                    />
                    {errors.terms && (
                      <p style={{ color: "var(--ck-error, #ef4444)", fontSize: "0.8rem", marginLeft: 4 }}>
                        {errors.terms}
                      </p>
                    )}
                  </div>

                  <Button variant="primary" size="lg" fullWidth loading={loading} type="submit">
                    Create Account
                  </Button>
                </form>
              )}

              {/* Social Divider */}
              <Divider label="or continue with" />

              {/* Social Login Buttons */}
              <div className="flex gap-3">
                <Button variant="secondary" fullWidth iconLeft={
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/>
                  </svg>
                }>
                  Google
                </Button>
                <Button variant="secondary" fullWidth iconLeft={
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                }>
                  GitHub
                </Button>
              </div>

              {/* Footer Text */}
              <p
                className="text-center"
                style={{ color: "var(--ck-text-muted)", fontSize: "0.8rem" }}
              >
                By continuing, you agree to Cookest&apos;s{" "}
                <span style={{ color: "var(--ck-primary)", cursor: "pointer" }}>Terms of Service</span>
                {" "}and{" "}
                <span style={{ color: "var(--ck-primary)", cursor: "pointer" }}>Privacy Policy</span>.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
      </div>
    </div>
  );
}
