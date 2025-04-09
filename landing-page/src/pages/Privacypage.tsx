import BackButton from "@/components/custom/BackButton";
import LegalContainer from "@/components/custom/LegalContainer";

const privacy = [
  {
    content: "Your privacy is important to us. It is postonreddit's policy to respect your privacy regarding any information we may collect from you across our website and services we operate.",
  },
  {
    content: "We collect personal information only when necessary to provide our service. This includes your email, username, Reddit access token, and profile information obtained via Reddit. We collect this data with your knowledge and consent, and we always explain why we collect it and how it will be used.",
  },
  {
    content: "We retain collected information only as long as needed to deliver the requested service. We protect stored data using commercially acceptable practices to prevent unauthorized access, loss, or misuse.",
  },
  {
    content: "We do not share personally identifying information with the public or third parties, except when required by law or to operate our services (e.g., Supabase, Reddit API, Resend, and payment provider Creem).",
  },
  {
    content: "We act as both a data controller and data processor in compliance with applicable data protection laws, including the EU General Data Protection Regulation (GDPR).",
  },
  {
    content: "We use SimpleAnalytics to understand how users interact with our platform. This tool collects anonymous data, such as referral source, country, and device type. No personally identifiable information is collected by SimpleAnalytics.",
  },
  {
    content: "Users register to postonreddit using email and password. In the future, third-party logins may be introduced. Users can revoke our access to their Reddit profile at any time from their dashboard.",
  },
  {
    content: "You may refuse to provide personal information, with the understanding that some features may be unavailable as a result.",
  },
  {
    content: "Our site may contain links to external websites. We are not responsible for their content or privacy practices.",
  },
  {
    content: "Your continued use of postonreddit will be considered acceptance of our privacy practices. If you have questions about how we manage your data, please contact us directly.",
  },
  {
    content: "Last updated: 10 April 2025",
  },
];

export default function Privacypage() {
  return (
    <LegalContainer>
      <BackButton />
      <h1 className="text-2xl font-bold text-zinc-700">Privacy Policy</h1>
      {privacy.map((item, index) => (
        <div key={index} className="w-full flex flex-col items-start justify-start gap-1">
          <p className="text-sm text-zinc-500">{item.content}</p>
        </div>
      ))}
    </LegalContainer>
  )
}
