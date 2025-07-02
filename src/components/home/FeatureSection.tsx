import { 
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

const features = [
  {
    id: 1,
    name: "Secure Shopping",
    description: "Your data and payments are protected with enterprise-grade security",
    icon: ShieldCheckIcon,
  },
  {
    id: 2,
    name: "Fast Delivery",
    description: "Quick and reliable shipping from our verified vendor network",
    icon: TruckIcon,
  },
  {
    id: 3,
    name: "Secure Payments",
    description: "Multiple payment options with buyer protection guarantee",
    icon: CreditCardIcon,
  },
  {
    id: 4,
    name: "24/7 Support",
    description: "Round-the-clock customer service to help with any questions",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    id: 5,
    name: "Global Reach",
    description: "Connect with vendors and customers from around the world",
    icon: GlobeAltIcon,
  },
  {
    id: 6,
    name: "Trusted Community",
    description: "Join millions of satisfied customers and successful vendors",
    icon: UserGroupIcon,
  },
];

export function FeatureSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-display">
            Why Choose Iwanyu?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">                We&apos;re committed to providing the best multivendor marketplace experience
            with features designed for both buyers and sellers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
              >
                {/* Icon */}
                <div className="mx-auto w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                {/* Feature Info */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-display">
                Ready to Start Selling?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Join thousands of successful vendors on our platform. No monthly fees, 
                easy setup, and access to millions of potential customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors btn-hover">
                  Become a Vendor
                </button>
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-primary-500 hover:text-primary-600 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary-600">0%</div>
                  <div className="text-sm text-gray-500">Setup Fee</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">5%</div>
                  <div className="text-sm text-gray-500">Commission</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">24/7</div>
                  <div className="text-sm text-gray-500">Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">∞</div>
                  <div className="text-sm text-gray-500">Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
