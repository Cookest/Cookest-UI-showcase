"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Input,
  Select,
  Toggle,
  Divider,
  Progress,
} from "@cookest/ui";
import { Check, CreditCard, MapPin, Package, User } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={onChange}
        className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all"
        style={{
          borderColor: checked ? "var(--ck-primary)" : "var(--ck-border)",
          background: checked ? "var(--ck-primary)" : "transparent",
        }}
      >
        {checked && <Check size={11} className="text-white" strokeWidth={3} />}
      </div>
      <span style={{ color: "var(--ck-text)" }}>{label}</span>
    </label>
  );
}

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "jp", label: "Japan" },
];

export default function CheckoutPage() {
  // Contact
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Delivery
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("us");

  // Add-ons
  const [premiumSpices, setPremiumSpices] = useState(false);
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [expressDelivery, setExpressDelivery] = useState(false);

  // Payment
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  // UI
  const [loading, setLoading] = useState(false);

  const addOns =
    (premiumSpices ? 5 : 0) + (giftWrapping ? 3 : 0) + (expressDelivery ? 8 : 0);
  const subtotal = 39;
  const delivery = expressDelivery ? 0 : 5.99;
  const total = subtotal + delivery + addOns;

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const SectionHeading = ({
    icon,
    title,
    step,
  }: {
    icon: React.ReactNode;
    title: string;
    step: number;
  }) => (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
        style={{ background: "var(--ck-primary)", color: "#fff" }}
      >
        {step}
      </div>
      <div className="flex items-center gap-2">
        <span style={{ color: "var(--ck-primary)" }}>{icon}</span>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ck-heading)" }}>
          {title}
        </h2>
      </div>
    </div>
  );

  return (
    <div>
      <Breadcrumb />
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-0">
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--ck-heading)",
            marginBottom: "1.5rem",
          }}
        >
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left — Form */}
          <div className="flex-[3] flex flex-col gap-6">
            {/* Section 1 — Contact */}
            <Card>
              <CardBody>
                <SectionHeading icon={<User size={16} />} title="Contact Information" step={1} />
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First name"
                      placeholder="Gordon"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      fullWidth
                    />
                    <Input
                      label="Last name"
                      placeholder="Ramsay"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      fullWidth
                    />
                  </div>
                  <Input
                    label="Email"
                    placeholder="chef@cookest.app"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                  <Input
                    label="Phone"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                  />
                </div>
              </CardBody>
            </Card>

            {/* Section 2 — Delivery */}
            <Card>
              <CardBody>
                <SectionHeading icon={<MapPin size={16} />} title="Delivery Address" step={2} />
                <div className="flex flex-col gap-4">
                  <Input
                    label="Street address"
                    placeholder="123 Culinary Lane"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="City"
                      placeholder="New York"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      fullWidth
                    />
                    <Input
                      label="ZIP / Postal code"
                      placeholder="10001"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      fullWidth
                    />
                  </div>
                  <Select
                    label="Country"
                    options={countryOptions}
                    value={country}
                    onChange={setCountry}
                    searchable
                  />
                </div>
              </CardBody>
            </Card>

            {/* Section 3 — Order Options */}
            <Card>
              <CardBody>
                <SectionHeading icon={<Package size={16} />} title="Order Options" step={3} />
                <div className="flex flex-col gap-4">
                  <Checkbox
                    label="Add premium spice kit  +$5"
                    checked={premiumSpices}
                    onChange={() => setPremiumSpices((v) => !v)}
                  />
                  <Divider />
                  <Checkbox
                    label="Gift wrapping & personalised card  +$3"
                    checked={giftWrapping}
                    onChange={() => setGiftWrapping((v) => !v)}
                  />
                  <Divider />
                  <Checkbox
                    label="Express delivery (next-day)  +$8"
                    checked={expressDelivery}
                    onChange={() => setExpressDelivery((v) => !v)}
                  />
                </div>
              </CardBody>
            </Card>

            {/* Section 4 — Payment */}
            <Card>
              <CardBody>
                <SectionHeading
                  icon={<CreditCard size={16} />}
                  title="Payment Details"
                  step={4}
                />
                <div className="flex flex-col gap-4">
                  <Input
                    label="Card number"
                    placeholder="4242 4242 4242 4242"
                    iconLeft={<CreditCard size={16} />}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    fullWidth
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry date"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      fullWidth
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      fullWidth
                    />
                  </div>
                  <div
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{
                      background: "var(--ck-surface)",
                      border: "1px solid var(--ck-border)",
                    }}
                  >
                    <Toggle
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      label="Save card details for next time"
                      toggleSize="sm"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right — Order Summary */}
          <div className="flex-[2] flex flex-col gap-4">
            <Card>
              <CardHeader>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ck-heading)" }}>
                  Order Summary
                </h2>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col gap-4">
                  {/* Item */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: "var(--ck-surface)" }}
                    >
                      🥘
                    </div>
                    <div className="flex-1">
                      <p style={{ fontWeight: 600, color: "var(--ck-heading)", fontSize: "0.875rem" }}>
                        Gourmet Meal Kit — Family Box
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
                        4 meals · serves 2–4
                      </p>
                      <Badge variant="success" size="sm" className="mt-1">
                        In stock
                      </Badge>
                    </div>
                    <p style={{ fontWeight: 700, color: "var(--ck-heading)", fontSize: "0.875rem" }}>
                      $39.00
                    </p>
                  </div>

                  <Divider />

                  {/* Add-ons */}
                  {premiumSpices && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--ck-text-muted)" }}>Premium spice kit</span>
                      <span style={{ color: "var(--ck-text)" }}>+$5.00</span>
                    </div>
                  )}
                  {giftWrapping && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--ck-text-muted)" }}>Gift wrapping</span>
                      <span style={{ color: "var(--ck-text)" }}>+$3.00</span>
                    </div>
                  )}
                  {expressDelivery && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--ck-text-muted)" }}>Express delivery</span>
                      <span style={{ color: "var(--ck-text)" }}>+$8.00</span>
                    </div>
                  )}

                  <Divider />

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--ck-text-muted)" }}>Subtotal</span>
                      <span style={{ color: "var(--ck-text)" }}>
                        ${(subtotal + addOns).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--ck-text-muted)" }}>Delivery</span>
                      <span style={{ color: "var(--ck-text)" }}>
                        {expressDelivery ? (
                          <span style={{ color: "var(--ck-primary)" }}>Included</span>
                        ) : (
                          `$${delivery.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  </div>

                  <Divider />

                  <div className="flex justify-between">
                    <span style={{ fontWeight: 700, color: "var(--ck-heading)" }}>Total</span>
                    <span style={{ fontWeight: 700, color: "var(--ck-heading)", fontSize: "1.1rem" }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs" style={{ color: "var(--ck-text-muted)" }}>
                      <span>Checkout progress</span>
                      <span>3 of 4 steps</span>
                    </div>
                    <Progress value={75} size="sm" color="primary" />
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    iconLeft={<CreditCard size={16} />}
                    onClick={handlePlaceOrder}
                  >
                    Place Order — ${total.toFixed(2)}
                  </Button>
                  <p
                    className="text-center text-xs"
                    style={{ color: "var(--ck-text-muted)" }}
                  >
                    🔒 Secured by 256-bit SSL encryption
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
