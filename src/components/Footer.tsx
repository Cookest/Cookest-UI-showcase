"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="mt-20 border-t py-12"
      style={{ borderColor: "var(--ck-border)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                style={{ background: "linear-gradient(135deg, var(--ck-primary), #5a7a3d)" }}
              >
                Ck
              </div>
              <span className="font-semibold text-sm" style={{ color: "var(--ck-heading)" }}>
                Cookest UI
              </span>
            </div>
            <p className="text-xs leading-relaxed m-0" style={{ color: "var(--ck-text-muted)" }}>
              Production-ready components for modern food & cooking applications.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--ck-heading)" }}>
              Resources
            </h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <FooterLink href="/getting-started">Getting Started</FooterLink>
              <FooterLink href="/tokens">Design Tokens</FooterLink>
              <FooterLink href="/design-principles">Design Principles</FooterLink>
              <FooterLink href="/changelog">Changelog</FooterLink>
            </ul>
          </div>

          {/* Examples */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--ck-heading)" }}>
              Examples
            </h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <FooterLink href="/examples/recipe-card">Recipe Card</FooterLink>
              <FooterLink href="/examples/dashboard">Dashboard</FooterLink>
              <FooterLink href="/examples/login-form">Login Form</FooterLink>
              <FooterLink href="/examples">View All</FooterLink>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--ck-heading)" }}>
              Community
            </h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <FooterLink href="https://github.com/Cookest/cookest-ui-components-library" external>
                GitHub
              </FooterLink>
              <FooterLink href="https://github.com/Cookest/docs" external>
                Documentation
              </FooterLink>
              <FooterLink href="https://www.npmjs.com/package/@cookest/ui" external>
                npm
              </FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-6 border-t flex items-center justify-between flex-wrap gap-4"
          style={{ borderColor: "var(--ck-border)" }}
        >
          <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>
            © {new Date().getFullYear()} Cookest. MIT License.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
              Built with
            </span>
            <span className="text-xs" style={{ color: "var(--ck-primary)" }}>♥</span>
            <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
              and good taste
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs no-underline flex items-center gap-1 transition-colors hover:underline"
          style={{ color: "var(--ck-text-muted)" }}
        >
          {children}
          <ExternalLink size={10} />
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        className="text-xs no-underline transition-colors hover:underline"
        style={{ color: "var(--ck-text-muted)" }}
      >
        {children}
      </Link>
    </li>
  );
}
