import BackButton from "@/components/custom/BackButton";
import LegalContainer from "@/components/custom/LegalContainer";

const terms = [
  {
    title: "1. Introduction",
    content:
      "By using postonreddit you confirm your acceptance of, and agree to be bound by, these terms and conditions set out by the postonreddit team.",
  },
  {
    title: "2. Agreement to Terms and Conditions",
    content:
      "This Agreement takes effect on the date on which you first use the postonreddit service.",
  },
  {
    title: "3. Refunds",
    content:
      "Due to the nature of digital products and the immediate access granted upon payment, the postonreddit service is non-refundable and non-exchangeable.",
  },
  {
    title: "4. Disclaimer",
    content:
      "It is not warranted that postonreddit will meet your specific requirements or that its operation will be uninterrupted or error-free. All express and implied warranties or conditions not stated in this Agreement (including without limitation, loss of profits, loss or corruption of data, business interruption or loss of contracts) are, to the fullest extent permitted by law, excluded and expressly disclaimed. This Agreement does not affect your statutory rights.",
  },
  {
    title: "5. Warranties and Limitation of Liability",
    content:
      "The postonreddit team does not provide any warranty, guarantee or other term as to the quality, fitness for purpose or otherwise of the software. The postonreddit team shall not be liable to you for any loss of profit or any indirect, special or consequential loss, damage, costs, expenses or other claims (whether caused by negligence or otherwise) arising out of or in connection with the use of the service. We are not responsible for delays or failures in performance due to causes beyond our reasonable control. In the event the postonreddit team is deemed liable for a breach of this Agreement, you agree that our total liability is limited to the amount actually paid by you for the service. You hereby release us from any and all obligations, liabilities, and claims exceeding this limitation.",
  },
  {
    title: "6. Responsibilities",
    content:
      "postonreddit is not responsible for how users utilize the user-generated content or for the consequences of posts made to third-party platforms such as Reddit. Users are solely responsible for ensuring they comply with the terms of use of any third-party services they interact with via postonreddit.",
  },
  {
    title: "7. Intellectual Property Rights",
    content:
      "The user retains ownership of their user-generated content. The postonreddit team retains all rights, title, and interest in and to the software, brand, and any content provided by postonreddit.",
  },
  {
    title: "8. Price Adjustments",
    content:
      "As we continue to improve postonreddit and expand its features, the one-time payment price may increase. Early users can secure access at the current price, and any discount is offered to avoid surprises from future adjustments.",
  },
  {
    title: "9. Service Availability and Termination",
    content:
      "postonreddit may occasionally experience temporary interruptions due to maintenance, updates, or technical issues. We reserve the right to suspend or terminate access to the service at any time if necessary, including but not limited to misuse or breach of these terms.",
  },
  {
    title: "10. Governing Law",
    content:
      "This Agreement is governed by the laws of the jurisdiction in which you reside.",
  },
  {
    title: "",
    content: "Last updated: 10 April 2025",
  },
];

export default function Termspage() {
  return (
    <LegalContainer>
      <BackButton />
      <h1 className="text-2xl font-bold text-zinc-700">Terms of services</h1>
      {terms.map((term, index) => (
        <div key={index} className="w-full flex flex-col items-start justify-start gap-1">
          <h2 className="text-lg font-bold text-zinc-700">{term?.title}</h2>
          <p className="text-sm text-zinc-500">{term?.content}</p>
        </div>
      ))}
    </LegalContainer>
  );
}
