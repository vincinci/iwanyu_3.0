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
    <section className="py-6 bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Why Choose Iwanyu?
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Features designed for buyers and sellers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                {/* Icon */}
                <div className="mx-auto w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center mb-2">
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                
                {/* Feature Info */}
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1">
                  {feature.name}
                </h3>
                <p className="text-xs text-gray-500 leading-tight hidden sm:block">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-6 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              Ready to Start Selling?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Join thousands of vendors. No setup fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors">
                Become a Vendor
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:border-gray-400 transition-colors">
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex justify-center gap-6 mt-4 text-center">
              <div>
                <div className="text-lg font-bold text-yellow-600">0%</div>
                <div className="text-xs text-gray-500">Setup Fee</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">5%</div>
                <div className="text-xs text-gray-500">Commission</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">24/7</div>
                <div className="text-xs text-gray-500">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
