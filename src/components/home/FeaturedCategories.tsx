import Link from "next/link";
import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ShoppingBagIcon,
  HomeIcon,
  HeartIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  MusicalNoteIcon
} from "@heroicons/react/24/outline";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest gadgets and tech",
    icon: DevicePhoneMobileIcon,
    itemCount: "15,234",
    href: "/categories/electronics",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Computers",
    description: "Laptops, desktops & more",
    icon: ComputerDesktopIcon,
    itemCount: "8,567",
    href: "/categories/computers",
    color: "bg-indigo-500",
  },
  {
    id: 3,
    name: "Fashion",
    description: "Clothing & accessories",
    icon: ShoppingBagIcon,
    itemCount: "25,891",
    href: "/categories/fashion",
    color: "bg-pink-500",
  },
  {
    id: 4,
    name: "Home & Garden",
    description: "Furniture & decor",
    icon: HomeIcon,
    itemCount: "12,456",
    href: "/categories/home-garden",
    color: "bg-green-500",
  },
  {
    id: 5,
    name: "Health & Beauty",
    description: "Wellness products",
    icon: HeartIcon,
    itemCount: "9,123",
    href: "/categories/health-beauty",
    color: "bg-red-500",
  },
  {
    id: 6,
    name: "Books",
    description: "Physical & digital books",
    icon: BookOpenIcon,
    itemCount: "18,765",
    href: "/categories/books",
    color: "bg-amber-500",
  },
  {
    id: 7,
    name: "Tools",
    description: "Hardware & equipment",
    icon: WrenchScrewdriverIcon,
    itemCount: "6,789",
    href: "/categories/tools",
    color: "bg-gray-500",
  },
  {
    id: 8,
    name: "Music",
    description: "Instruments & audio",
    icon: MusicalNoteIcon,
    itemCount: "4,321",
    href: "/categories/music",
    color: "bg-purple-500",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-display">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of product categories from trusted vendors worldwide
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center">
                  {/* Icon */}
                  <div className={`mx-auto w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Category Info */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {category.description}
                  </p>
                  <div className="text-xs text-primary-600 font-medium">
                    {category.itemCount} items
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center px-8 py-3 text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
