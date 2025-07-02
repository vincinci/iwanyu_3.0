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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-display">
            Help Center
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions or get in touch with our support team. We're here to help!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-4 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-yellow-500"
              aria-label="Search help articles"
              title="Search help articles"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {supportOptions.map((option) => (
            <a
              key={option.title}
              href={option.href}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mb-4 group-hover:bg-yellow-200 transition-colors">
                <option.icon className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-3 text-sm">{option.description}</p>
              <div className="text-yellow-600 font-semibold text-sm mb-2">{option.action}</div>
              <div className="text-xs text-gray-500">{option.availability}</div>
            </a>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {faqCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {category.questions.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="font-medium text-gray-900 text-sm sm:text-base">{faq.question}</span>
                      <svg
                        className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-3 pb-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 sm:p-8 lg:p-12 text-center text-white">
          <ShieldCheckIcon className="h-12 w-12 mx-auto mb-4 text-yellow-100" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-display">
            Still Need Help?
          </h2>
          <p className="text-lg text-yellow-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Our customer support team is always ready to assist you. Don't hesitate to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-yellow-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@iwanyu.rw"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-yellow-600 transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
