const services = [
  {
    id: 1,
    title: "Professional Logo Design",
    category: "Design",
    description: "I will create a modern, professional logo for your brand with unlimited revisions.",
    price: 50,
    rating: 4.8,
    reviews: 124,
    deliveryDays: 3,
    seller: "designpro99",
    image: "https://picsum.photos/seed/1/400/250"
  },
  {
    id: 2,
    title: "Brand Identity Package",
    category: "Design",
    description: "Complete brand identity including logo, color palette, and typography guidelines.",
    price: 150,
    rating: 4.7,
    reviews: 89,
    deliveryDays: 5,
    seller: "creativestudio",
    image: "https://picsum.photos/seed/2/400/250"
  },
  {
    id: 3,
    title: "React Website Development",
    category: "Development",
    description: "Build a modern, responsive website using React with clean code and best practices.",
    price: 300,
    rating: 4.9,
    reviews: 156,
    deliveryDays: 10,
    seller: "devmaster",
    image: "https://picsum.photos/seed/3/400/250"
  },
  {
    id: 4,
    title: "WordPress Site Setup",
    category: "Development",
    description: "Professional WordPress site setup with plugins, theme customization, and security.",
    price: 120,
    rating: 4.5,
    reviews: 67,
    deliveryDays: 4,
    seller: "wpexpert",
    image: "https://picsum.photos/seed/4/400/250"
  },
  {
    id: 5,
    title: "REST API Development",
    category: "Development",
    description: "Build scalable RESTful APIs with Node.js/Express, authentication, and documentation.",
    price: 200,
    rating: 4.6,
    reviews: 112,
    deliveryDays: 7,
    seller: "apidev",
    image: "https://picsum.photos/seed/5/400/250"
  },
  {
    id: 6,
    title: "SEO Blog Article Writing",
    category: "Writing",
    description: "High-quality, SEO-optimized blog articles tailored to your target audience.",
    price: 30,
    rating: 4.7,
    reviews: 203,
    deliveryDays: 2,
    seller: "contentwriter",
    image: "https://picsum.photos/seed/6/400/250"
  },
  {
    id: 7,
    title: "Product Description Copy",
    category: "Writing",
    description: "Compelling product descriptions that convert visitors into customers.",
    price: 25,
    rating: 4.4,
    reviews: 78,
    deliveryDays: 1,
    seller: "copywriter",
    image: "https://picsum.photos/seed/7/400/250"
  },
  {
    id: 8,
    title: "Resume & Cover Letter",
    category: "Writing",
    description: "Professional resume and cover letter writing that lands interviews.",
    price: 40,
    rating: 4.8,
    reviews: 145,
    deliveryDays: 2,
    seller: "hrconsultant",
    image: "https://picsum.photos/seed/8/400/250"
  },
  {
    id: 9,
    title: "Social Media Management",
    category: "Marketing",
    description: "Complete social media strategy and management for your brand.",
    price: 80,
    rating: 4.5,
    reviews: 91,
    deliveryDays: 3,
    seller: "socialmarketer",
    image: "https://picsum.photos/seed/9/400/250"
  },
  {
    id: 10,
    title: "Google Ads Campaign",
    category: "Marketing",
    description: "Optimized Google Ads campaigns to maximize ROI and leads.",
    price: 100,
    rating: 4.6,
    reviews: 134,
    deliveryDays: 5,
    seller: "ppcspecialist",
    image: "https://picsum.photos/seed/10/400/250"
  },
  {
    id: 11,
    title: "Email Marketing Setup",
    category: "Marketing",
    description: "Email marketing strategy and automation setup with high conversion rates.",
    price: 60,
    rating: 4.3,
    reviews: 56,
    deliveryDays: 3,
    seller: "emailexpert",
    image: "https://picsum.photos/seed/11/400/250"
  },
  {
    id: 12,
    title: "UI/UX Mobile App Design",
    category: "Design",
    description: "Beautiful and intuitive UI/UX design for mobile applications.",
    price: 250,
    rating: 4.9,
    reviews: 187,
    deliveryDays: 8,
    seller: "uiuxdesigner",
    image: "https://picsum.photos/seed/12/400/250"
  }
];

const savedServices = [];
const hiredServices = [];

module.exports = {
  services,
  savedServices,
  hiredServices
};
