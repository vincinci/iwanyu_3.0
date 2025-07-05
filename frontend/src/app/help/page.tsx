import Link from 'next/link';
import { 
  QuestionMarkCircleIcon, 
  ChatBubbleLeftRightIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const faqCategories = [
  {
    id: 1,
    title: 'Getting Started',
    icon: QuestionMarkCircleIcon,
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'You can create an account by clicking the "Sign Up" button in the top right corner. Fill in your details and verify your email address to get started.',
      },
      {
        question: 'Is it free to use Iwanyu?',
        answer: 'Yes! Creating an account and browsing products on Iwanyu is completely free. You only pay when you make a purchase.',
      },
      {
        question: 'What areas do you deliver to?',
        answer: 'We currently deliver across all provinces in Rwanda. Check our delivery map during checkout for specific areas.',
      },
    ],
  },
  {
    id: 2,
    title: 'Orders & Payment',
    icon: CreditCardIcon,
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Mobile Money (MTN MoMo, Airtel Money), bank cards (Visa, Mastercard), and bank transfers.',
      },
      {
        question: 'How can I track my order?',
        answer: 'After placing an order, you\'ll receive a tracking number via SMS and email. You can also track orders in your account dashboard.',
      },
      {
        question: 'Can I cancel my order?',
        answer: 'You can cancel orders within 2 hours of placing them if they haven\'t been dispatched yet. Contact customer support for assistance.',
      },
    ],
  },
  {
    id: 3,
    title: 'Delivery & Returns',
    icon: TruckIcon,
    questions: [
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 1-3 business days within Kigali and 2-5 business days to other provinces. Express delivery is available for urgent orders.',
      },
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Products must be in original condition with packaging. Some restrictions apply.',
      },
      {
        question: 'Who pays for return shipping?',
        answer: 'If the return is due to our error or defective products, we cover return shipping. For other returns, customers are responsible for return shipping costs.',
      },
    ],
  },
  {
    id: 4,
    title: 'Vendor Information',
    icon: ShoppingBagIcon,
    questions: [
      {
        question: 'How do I become a vendor?',
        answer: 'Visit our vendor registration page, fill out the application form, and provide required documents. Our team will review and approve qualified vendors.',
      },
      {
        question: 'What are the vendor fees?',
        answer: 'We charge a small commission on each sale (5-15% depending on category) and a monthly subscription fee. No upfront costs required.',
      },
      {
        question: 'How do vendors get paid?',
        answer: 'Vendors receive payments weekly via Mobile Money or bank transfer after deducting our commission and applicable fees.',
      },
    ],
  },
];

const supportOptions = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    action: 'Start Chat',
    availability: 'Available 8AM - 8PM',
    href: '#chat',
  },
  {
    icon: PhoneIcon,
    title: 'Phone Support',
    description: 'Call us for immediate assistance',
    action: '+250 788 123 456',
    availability: 'Available 8AM - 6PM',
    href: 'tel:+250788123456',
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Support',
    description: 'Send us an email and we\'ll respond within 24 hours',
    action: 'support@iwanyu.rw',
    availability: 'Response within 24hrs',
    href: 'mailto:support@iwanyu.rw',
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mb-2">
            Help Center
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team. We're here to help!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-golden focus:border-transparent text-sm"
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-brand-golden"
              aria-label="Search help articles"
              title="Search help articles"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {supportOptions.map((option) => (
            <a
              key={option.title}
              href={option.href}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mb-3 group-hover:bg-brand-golden/10 transition-colors">
                <option.icon className="h-5 w-5 text-gray-600 group-hover:text-brand-golden" />
              </div>
              <h3 className="text-base font-semibold text-brand-charcoal mb-1">{option.title}</h3>
              <p className="text-gray-600 mb-2 text-sm">{option.description}</p>
              <div className="text-brand-golden font-medium text-sm mb-1">{option.action}</div>
              <div className="text-xs text-gray-500">{option.availability}</div>
            </a>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {faqCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <category.icon className="h-4 w-4 text-brand-golden" />
                  </div>
                  <h2 className="text-lg font-bold text-brand-charcoal">{category.title}</h2>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {category.questions.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="font-medium text-brand-charcoal text-sm">{faq.question}</span>
                      <svg
                        className="h-4 w-4 text-gray-500 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-2 pb-2 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-gradient-to-r from-brand-golden to-brand-golden/90 rounded-lg p-4 sm:p-6 text-center text-white">
          <ShieldCheckIcon className="h-8 w-8 mx-auto mb-3 text-white/90" />
          <h2 className="text-lg sm:text-xl font-bold mb-2">
            Still Need Help?
          </h2>
          <p className="text-sm text-white/90 mb-4 max-w-lg mx-auto">
            Our customer support team is always ready to assist you. Don't hesitate to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-4 sm:px-6 py-2 bg-white text-brand-golden rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@iwanyu.rw"
              className="px-4 sm:px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-brand-golden transition-colors text-sm"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
