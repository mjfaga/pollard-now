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

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/plan", label: "The Plan" },
  { href: "/committee", label: "Committee" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
