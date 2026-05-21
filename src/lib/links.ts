export const externalLinks = {
  donate:
    "https://www.paypal.com/donate/?hosted_button_id=A6K97CGT6XM5N",
  volunteer:
    "https://docs.google.com/forms/d/e/1FAIpQLSf_sIRBg5Y8XeTedLGLJg7D68Jz394aj_ZviYHAoHsgVYxvlA/viewform?usp=sharing&ouid=110605582613024291422",
  projectPage:
    "https://sites.google.com/needham.k12.ma.us/pollardbuildingproject/home",
  projectFaqs:
    "https://sites.google.com/needham.k12.ma.us/pollardbuildingproject/faqs",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/plan", label: "The Plan" },
  { href: "/committee", label: "Committee" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
