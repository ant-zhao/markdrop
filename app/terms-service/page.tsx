// src/app/terms-service/page.tsx
import Agreement, { Section } from "@/components/common/Agreement";

const termsOfService: Section[] = [
  {
    "id": "data-controller",
    "title": "Data Controller & Contact Information",
    "content": [
      "The data controller responsible for processing your personal information is MarkDrop.",
      "We operate globally and process personal data in accordance with applicable data protection laws, including the GDPR for users in the EEA and the CCPA/CPRA for residents of California.",
      "If you have any questions or requests regarding your personal data, please contact us at privacy@markdrop.app."
    ]
  },
  {
    "id": "general",
    "title": "Overview",
    "content": [
      "This Privacy Policy governs your access and use of our website, services, and applications (collectively, the 'Services').",
      "It explains the types of information we collect, how we use it, the legal basis for processing, and your rights regarding your personal data.",
      "By using our Services, you consent to the practices described in this Privacy Policy."
    ]
  },
  {
    "id": "type-of-information-collected",
    "title": "Information We Collect",
    "content": [
      "We may collect personal information such as your name, email address, phone number, billing information, and other identifiers necessary to provide our services.",
      "Non-personal information, including cookies, IP addresses, browser type, device identifiers, and usage data, may be collected automatically for analytics, security, and performance improvement purposes.",
      "Sensitive personal data (e.g., financial details, uploaded content metadata) will only be collected if explicitly provided by you and with your consent, as required under applicable laws such as GDPR."
    ]
  },
  {
    "id": "user-content",
    "title": "User Content, Copyright and Prohibited Content",
    "content": [
      "When you upload images or other content ('User Content'), you grant us a limited license to store, process, and operate on the content to provide the Services (including watermark removal).",
      "You represent and warrant that you have the necessary rights to upload and allow us to process such content. We may remove or refuse to process content that violates laws or our Terms of Service (e.g., infringing, hateful, or illegal material).",
      "Processed images and uploads may be temporarily stored in secure environments and automatically deleted after a defined retention period, except where retention is required by law or for fraud prevention."
    ]
  },
  {
    "id": "use-of-information-collected",
    "title": "How We Use Information",
    "content": [
      "We use collected information to operate, maintain, and improve our Services, and to provide personalized experiences.",
      "Information may be used to communicate important updates, respond to inquiries, provide customer support, or deliver promotional content if you have opted in.",
      "We process personal data for the following purposes and on the following legal bases (where applicable):",
      "- Account creation, login and authentication — legal basis: performance of contract / legitimate interest.",
      "- Payment processing and billing — legal basis: performance of contract; handled by PCI-DSS compliant payment processors (we do not store full card data).",
      "- Customer support and communications — legal basis: legitimate interest / consent for marketing.",
      "- Analytics and product improvement (aggregated) — legal basis: legitimate interest (with opt-out where required).",
      "- Compliance with legal obligations (e.g., tax, fraud prevention) — legal basis: legal obligation."
    ]
  },
  {
    "id": "disclosure-storage-of-information-collected",
    "title": "Data Sharing & Storage",
    "content": [
      "We do not sell your personal information to third parties.",
      "We may share personal information with trusted service providers who perform services on our behalf, such as payment processing, cloud hosting, analytics, and marketing.",
      "All subprocessors are contractually bound by data protection terms. A list of subprocessors and their roles is available at [link-to-subprocessor-list].",
      "Personal data may be disclosed to comply with legal obligations, respond to lawful requests, or protect our rights, safety, and property.",
      "Data is stored securely using appropriate technical and organizational measures, and access is restricted to authorized personnel only."
    ]
  },
  {
    "id": "international-transfers",
    "title": "International Data Transfers",
    "content": [
      "We may transfer personal data to recipients and subprocessors located outside your country, including outside the European Economic Area (EEA).",
      "Where such transfers occur, we ensure appropriate safeguards are in place, such as European Commission Standard Contractual Clauses (SCCs), adequacy decisions, or other lawful mechanisms to protect your data."
    ]
  },
  {
    "id": "security",
    "title": "Security",
    "content": [
      "We implement appropriate technical, administrative, and physical measures to safeguard your personal data against unauthorized access, loss, or misuse.",
      "All sensitive information, including payment data, is transmitted using encryption protocols such as TLS/SSL.",
      "Payment transactions are processed by PCI-DSS compliant payment processors (e.g., Stripe, PayPal). We do not store full card details or CVV codes.",
      "In the event of a personal data breach, we will follow our incident response plan and, where required, notify the relevant supervisory authority within 72 hours and affected individuals as appropriate."
    ]
  },
  {
    "id": "cookies-policy",
    "title": "Cookies & Tracking",
    "content": [
      "We use cookies, web beacons, and similar technologies to enhance user experience, analyze traffic, and deliver targeted content and advertisements.",
      "You can manage or disable cookies via your browser settings. Disabling certain cookies may affect the functionality of our Services.",
      "For users in the EEA/UK, we request explicit consent for non-essential cookies via a consent banner. You may withdraw consent at any time.",
      "Under CCPA, you have the right to opt out of the sale or sharing of your personal information, including information collected through cookies.",
      "We maintain a separate Cookie Notice describing cookie categories, purposes, and retention durations."
    ]
  },
  {
    "id": "opt-out-policy",
    "title": "Opt-Out & California Privacy Rights",
    "content": [
      "You have the right to opt out of receiving promotional or marketing communications by following unsubscribe instructions included in such emails or through your account settings.",
      "Certain communications, such as service notifications or account alerts, are necessary for the provision of our Services and cannot be opted out of.",
      "If you are a California resident, you have additional rights under the CCPA/CPRA, including the right to opt out of the sale or sharing of personal information. We honor Global Privacy Control (GPC) signals and browser-level opt-out mechanisms.",
      "To exercise these rights, please contact us at privacy@yourdomain.com or visit our 'Do Not Sell or Share My Personal Information' link."
    ]
  },
  {
    "id": "retention-deletion-of-information",
    "title": "Data Retention & Deletion",
    "content": [
      "We retain personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or to comply with legal obligations, resolve disputes, and enforce agreements.",
      "Specific retention periods: account data — up to 7 years; payment records — 7 years (for tax/accounting compliance); uploaded images — typically deleted within 30 days after processing unless required for fraud prevention or legal reasons.",
      "You may request access, correction, deletion, restriction, or portability of your data at any time by contacting privacy@yourdomain.com. Requests are verified to protect your privacy and responded to within the legally required time frame (e.g., one month under GDPR)."
    ]
  },
  {
    "id": "children-policy",
    "title": "Children's Privacy",
    "content": [
      "Our Services are not intended for children under 16 years old (or the minimum age required in your jurisdiction).",
      "We do not knowingly collect personal data from children under this age threshold. If we become aware that data has been collected from a child without parental consent, we will delete it immediately."
    ]
  },
  {
    "id": "modification",
    "title": "Modification & Effective Date",
    "content": [
      "We may update this Privacy Policy from time to time to reflect changes in legal requirements, our practices, or services.",
      "Significant changes will be communicated via the website, email notifications, or other appropriate channels at least 30 days prior to the effective date where required.",
      "This policy is effective as of [YYYY-MM-DD]. We maintain a changelog for transparency."
    ]
  },
  {
    "id": "governing-law",
    "title": "Legal Basis",
    "content": [
      "This Privacy Policy and any related disputes are governed by the laws of the applicable jurisdiction where our Services are offered.",
      "For EU residents, disputes are subject to applicable EU and local data protection laws.",
      "For California residents, rights and remedies are provided under the California Consumer Privacy Act (CCPA) and related regulations."
    ]
  },
  {
    "id": "severability",
    "title": "Severability",
    "content": [
      "If any provision of this Privacy Policy is determined to be invalid, illegal, or unenforceable under applicable law, the remaining provisions will continue in full force and effect."
    ]
  },
  {
    "id": "redressal-mechanism",
    "title": "Redressal Mechanism & Complaints",
    "content": [
      "Users may contact our Data Protection Officer (DPO) or support team regarding any complaints, inquiries, or concerns about data privacy.",
      "We will respond to all verified requests in a timely and transparent manner.",
      "Under GDPR, users may file complaints with their local supervisory authority. Under CCPA, California residents may contact the Attorney General's office or other regulatory bodies to exercise their rights."
    ]
  }
]

export default function TermsOfServicePage() {

  return (
    <div className="font-sans min-h-screen pb-12 w-full">
      <section className="pt-28 pb-8 w-full bg-gradient-to-b from-[#FFF6F2] to-[#FFFFFF]">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Terms of Service</h1>
          <div className="text-xl text-[#5b70f8] py-4">Last updated on: &nbsp;17th October, 2025</div>
        </div>
      </section>
      <Agreement title="Terms of Service" sections={termsOfService} />
    </div>
  );
}
