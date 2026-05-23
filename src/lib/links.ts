export const externalLinks = {
  donate:
    "https://www.paypal.com/donate/?hosted_button_id=A6K97CGT6XM5N",
  projectPage:
    "https://sites.google.com/needham.k12.ma.us/pollardbuildingproject/home",
  projectFaqs:
    "https://sites.google.com/needham.k12.ma.us/pollardbuildingproject/faqs",
  costData:
    "https://info.massschoolbuildings.org/TabPub/TableauCostData.aspx",
} as const;

// Official campaign social profiles. `platform` keys the icon in
// components/social-links.tsx; `handle` is the human-readable name shown
// to screen readers. These URLs are also emitted in the Organization
// schema's `sameAs` (see lib/schema.ts).
export const socialLinks = [
  {
    platform: "facebook",
    label: "Facebook",
    handle: "Pollard Now",
    href: "https://www.facebook.com/profile.php?id=61589199175432",
  },
  {
    platform: "instagram",
    label: "Instagram",
    handle: "@pollardnow26",
    href: "https://www.instagram.com/pollardnow26",
  },
] as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/plan", label: "The Plan" },
  { href: "/committee", label: "Committee" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
