"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  Toggle,
  Select,
  Modal,
  Divider,
  Alert,
  Tooltip,
} from "@cookest/ui";
import { Camera, Plus, Trash2, AlertTriangle, Save, X } from "lucide-react";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "it", label: "Italian" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "pt", label: "Portuguese" },
];

const cuisineOptions = [
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mexican", label: "Mexican" },
  { value: "thai", label: "Thai" },
  { value: "french", label: "French" },
  { value: "indian", label: "Indian" },
  { value: "mediterranean", label: "Mediterranean" },
];

const unitOptions = [
  { value: "metric", label: "Metric (g, ml, °C)" },
  { value: "imperial", label: "Imperial (oz, cups, °F)" },
  { value: "both", label: "Show both" },
];

const allDietaryTags = [
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Low-Carb",
  "Keto",
  "Paleo",
  "Halal",
  "Kosher",
  "Pescatarian",
  "Whole30",
];

export default function SettingsPanelPage() {
  // Profile
  const [name, setName] = useState("Marco Bianchi");
  const [email, setEmail] = useState("marco@cookest.app");
  const [bio, setBio] = useState(
    "Roman cuisine specialist with 15 years of experience. Passionate about authentic Italian cooking and sustainable ingredients."
  );

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Preferences
  const [language, setLanguage] = useState("en");
  const [cuisine, setCuisine] = useState("italian");
  const [darkMode, setDarkMode] = useState(false);
  const [units, setUnits] = useState("metric");

  // Dietary
  const [dietaryTags, setDietaryTags] = useState([
    "Gluten-Free",
    "Dairy-Free",
    "Pescatarian",
  ]);
  const [addTagModalOpen, setAddTagModalOpen] = useState(false);
  const [selectedNewTag, setSelectedNewTag] = useState("");

  // Danger zone
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Save state
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const availableTags = allDietaryTags.filter((t) => !dietaryTags.includes(t));
  const addTagOptions = availableTags.map((t) => ({ value: t, label: t }));

  const removeTag = (tag: string) => {
    setDietaryTags((prev) => prev.filter((t) => t !== tag));
  };

  const addTag = () => {
    if (selectedNewTag && !dietaryTags.includes(selectedNewTag)) {
      setDietaryTags((prev) => [...prev, selectedNewTag]);
    }
    setSelectedNewTag("");
    setAddTagModalOpen(false);
  };

  const handleSave = () => {
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-8 pb-28">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--ck-heading)",
          }}
        >
          Settings
        </h1>
        <p style={{ color: "var(--ck-text-muted)", fontSize: "1rem", lineHeight: 1.6 }}>
          Manage your profile, preferences, and account settings.
        </p>
      </div>

      {/* Success Alert */}
      {saved && (
        <Alert
          variant="success"
          title="Settings saved"
          dismissible
          onDismiss={() => setSaved(false)}
        >
          Your preferences have been updated successfully.
        </Alert>
      )}

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--ck-heading)" }}>
            Profile
          </h2>
          <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
            Your public profile information
          </p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-6">
            {/* Avatar with edit overlay */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar
                  src="https://i.pravatar.cc/150?img=68"
                  alt={name}
                  size="xl"
                />
                <Tooltip content="Change photo" position="right">
                  <button
                    className="absolute bottom-0 right-0 flex items-center justify-center rounded-full"
                    style={{
                      width: 32,
                      height: 32,
                      background: "var(--ck-primary)",
                      color: "#fff",
                      border: "3px solid var(--ck-bg)",
                      cursor: "pointer",
                    }}
                  >
                    <Camera size={14} />
                  </button>
                </Tooltip>
              </div>
              <div className="flex flex-col gap-1">
                <p style={{ fontWeight: 600, color: "var(--ck-heading)" }}>{name}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--ck-text-muted)" }}>
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </div>

            {/* Bio textarea */}
            <div className="flex flex-col gap-1.5">
              <label
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--ck-heading)",
                }}
              >
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full rounded-xl px-4 py-3"
                style={{
                  background: "var(--ck-surface)",
                  border: "1px solid var(--ck-border)",
                  color: "var(--ck-text)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  resize: "vertical",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <p style={{ fontSize: "0.75rem", color: "var(--ck-text-muted)" }}>
                {bio.length}/280 characters
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Notifications Card */}
      <Card>
        <CardHeader>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--ck-heading)" }}>
            Notifications
          </h2>
          <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
            Choose how you want to be notified
          </p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-1">
            <div
              className="flex items-center justify-between px-3 py-3 rounded-lg"
              style={{ background: emailNotifs ? "var(--ck-surface)" : "transparent" }}
            >
              <Toggle
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                label="Email Notifications"
                description="Receive recipe recommendations and updates via email"
                toggleSize="md"
              />
            </div>
            <div
              className="flex items-center justify-between px-3 py-3 rounded-lg"
              style={{ background: pushNotifs ? "var(--ck-surface)" : "transparent" }}
            >
              <Toggle
                checked={pushNotifs}
                onChange={(e) => setPushNotifs(e.target.checked)}
                label="Push Notifications"
                description="Get instant alerts for new recipes and comments"
                toggleSize="md"
              />
            </div>
            <div
              className="flex items-center justify-between px-3 py-3 rounded-lg"
              style={{ background: weeklyDigest ? "var(--ck-surface)" : "transparent" }}
            >
              <Toggle
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                label="Weekly Digest"
                description="A curated summary of trending recipes every Monday"
                toggleSize="md"
              />
            </div>
            <div
              className="flex items-center justify-between px-3 py-3 rounded-lg"
              style={{ background: marketing ? "var(--ck-surface)" : "transparent" }}
            >
              <Toggle
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                label="Marketing Emails"
                description="Product updates, new features, and special offers"
                toggleSize="md"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Preferences Card */}
      <Card>
        <CardHeader>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--ck-heading)" }}>
            Preferences
          </h2>
          <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
            Customize your Cookest experience
          </p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Language"
                options={languageOptions}
                value={language}
                onChange={setLanguage}
                searchable
              />
              <Select
                label="Favorite Cuisine"
                options={cuisineOptions}
                value={cuisine}
                onChange={setCuisine}
                searchable
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <Select
                label="Measurement Units"
                options={unitOptions}
                value={units}
                onChange={setUnits}
              />
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{
                  background: "var(--ck-surface)",
                  border: "1px solid var(--ck-border)",
                  minHeight: 48,
                }}
              >
                <Toggle
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  label="Dark Mode"
                  toggleSize="md"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Dietary Restrictions Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--ck-heading)" }}>
                Dietary Restrictions
              </h2>
              <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
                Recipes will be filtered based on your dietary preferences
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              iconLeft={<Plus size={16} />}
              onClick={() => setAddTagModalOpen(true)}
            >
              Add
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          {dietaryTags.length === 0 ? (
            <div
              className="flex flex-col items-center gap-3 py-8"
              style={{ color: "var(--ck-text-muted)" }}
            >
              <p style={{ fontSize: "0.9rem" }}>No dietary restrictions set</p>
              <Button
                variant="ghost"
                size="sm"
                iconLeft={<Plus size={16} />}
                onClick={() => setAddTagModalOpen(true)}
              >
                Add your first restriction
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {dietaryTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={
                    tag === "Vegan" || tag === "Vegetarian"
                      ? "success"
                      : tag === "Gluten-Free" || tag === "Dairy-Free" || tag === "Nut-Free"
                      ? "warning"
                      : "info"
                  }
                  size="md"
                  removable
                  onRemove={() => removeTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Add Tag Modal */}
      <Modal
        open={addTagModalOpen}
        onClose={() => {
          setAddTagModalOpen(false);
          setSelectedNewTag("");
        }}
        title="Add Dietary Restriction"
        size="sm"
        footer={
          <div className="flex gap-3 justify-end">
            <Button
              variant="ghost"
              onClick={() => {
                setAddTagModalOpen(false);
                setSelectedNewTag("");
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={addTag} disabled={!selectedNewTag}>
              Add Restriction
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <p style={{ color: "var(--ck-text-muted)", fontSize: "0.875rem" }}>
            Select a dietary restriction to add to your profile. Recipes will be filtered accordingly.
          </p>
          <Select
            label="Dietary Restriction"
            options={addTagOptions}
            value={selectedNewTag}
            onChange={setSelectedNewTag}
            placeholder="Choose a restriction..."
            searchable
          />
        </div>
      </Modal>

      {/* Danger Zone */}
      <Card variant="outlined">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} style={{ color: "var(--ck-error, #ef4444)" }} />
            <h2
              style={{
                fontSize: "1.15rem",
                fontWeight: 600,
                color: "var(--ck-error, #ef4444)",
              }}
            >
              Danger Zone
            </h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontWeight: 500, color: "var(--ck-heading)", fontSize: "0.95rem" }}>
                Delete Account
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
                Permanently delete your account and all associated data. This action cannot be
                undone.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              iconLeft={<Trash2 size={16} />}
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Account"
        size="sm"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              iconLeft={<Trash2 size={16} />}
              onClick={() => setDeleteModalOpen(false)}
            >
              Yes, Delete My Account
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <Alert variant="error" title="This action is irreversible">
            All your recipes, meal plans, and personal data will be permanently deleted.
          </Alert>
          <p style={{ color: "var(--ck-text)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            Are you sure you want to delete your account? You will lose access to:
          </p>
          <ul
            className="flex flex-col gap-1 pl-5"
            style={{ color: "var(--ck-text-muted)", fontSize: "0.85rem", listStyleType: "disc" }}
          >
            <li>127 saved recipes</li>
            <li>14 custom meal plans</li>
            <li>Your cooking history and preferences</li>
          </ul>
        </div>
      </Modal>

      {/* Save Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 px-6 py-4 z-40"
        style={{
          background: "var(--ck-bg)",
          borderTop: "1px solid var(--ck-border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ maxWidth: 600, width: "100%" }}
        >
          <p style={{ color: "var(--ck-text-muted)", fontSize: "0.85rem" }}>
            {saved ? "✓ All changes saved" : "Unsaved changes"}
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" iconLeft={<X size={16} />}>
              Discard
            </Button>
            <Button
              variant="primary"
              size="lg"
              loading={saving}
              iconLeft={<Save size={18} />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
