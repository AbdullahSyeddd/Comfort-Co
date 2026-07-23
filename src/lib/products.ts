export interface Product {
  id: string;
  title: string;
  price: number;
  size: string;
  color: string;
  image: string;
  category: string;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Egyptian Cotton Sateen Sheet Set",
    price: 149,
    size: "Queen",
    color: "Ivory",
    image: "https://placehold.co/600x750/ede8df/78716c?text=Sateen+Ivory",
    category: "Sheet Sets",
    isBestseller: true,
  },
  {
    id: "2",
    title: "Linen Blend Duvet Cover",
    price: 189,
    size: "King",
    color: "Sage",
    image: "https://placehold.co/600x750/e3e6df/78716c?text=Linen+Sage",
    category: "Duvet Covers",
    isBestseller: true,
  },
  {
    id: "3",
    title: "Brushed Cotton Flannel Sheets",
    price: 129,
    size: "Full",
    color: "Slate Blue",
    image: "https://placehold.co/600x750/dde3e8/78716c?text=Flannel+Blue",
    category: "Sheet Sets",
  },
  {
    id: "4",
    title: "Percale Weave Sheet Set",
    price: 139,
    size: "Queen",
    color: "Warm White",
    image: "https://placehold.co/600x750/f2ede4/78716c?text=Percale+White",
    category: "Sheet Sets",
    isBestseller: true,
  },
  {
    id: "5",
    title: "Silk-Trim Pillowcase Pair",
    price: 59,
    size: "Standard",
    color: "Blush",
    image: "https://placehold.co/600x750/ecdfdc/78716c?text=Pillowcase+Blush",
    category: "Pillowcases",
  },
  {
    id: "6",
    title: "Organic Cotton Fitted Sheet",
    price: 89,
    size: "King",
    color: "Charcoal",
    image: "https://placehold.co/600x750/e2e1df/78716c?text=Fitted+Charcoal",
    category: "Sheet Sets",
  },
  {
    id: "7",
    title: "Waffle Knit Coverlet",
    price: 169,
    size: "Queen",
    color: "Oatmeal",
    image: "https://placehold.co/600x750/ece6da/78716c?text=Coverlet+Oatmeal",
    category: "Coverlets",
    isBestseller: true,
  },
  {
    id: "8",
    title: "Tencel Cooling Sheet Set",
    price: 179,
    size: "King",
    color: "Dove Grey",
    image: "https://placehold.co/600x750/e6e6e6/78716c?text=Tencel+Grey",
    category: "Sheet Sets",
  },
];
export interface Category {
  name: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    name: "Sheet Sets",
    image: "https://placehold.co/500x600/ede8df/78716c?text=Sheet+Sets",
    count: products.filter((p) => p.category === "Sheet Sets").length,
  },
  {
    name: "Duvet Covers",
    image: "https://placehold.co/500x600/e3e6df/78716c?text=Duvet+Covers",
    count: products.filter((p) => p.category === "Duvet Covers").length,
  },
  {
    name: "Pillowcases",
    image: "https://placehold.co/500x600/ecdfdc/78716c?text=Pillowcases",
    count: products.filter((p) => p.category === "Pillowcases").length,
  },
  {
    name: "Coverlets",
    image: "https://placehold.co/500x600/ece6da/78716c?text=Coverlets",
    count: products.filter((p) => p.category === "Coverlets").length,
  },
];

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    location: "Verified Buyer",
    quote:
      "The softest sheets I've ever owned. Two years in and they still feel brand new after every wash.",
    rating: 5,
  },
  {
    name: "James T.",
    location: "Verified Buyer",
    quote:
      "Genuinely upgraded my sleep. Breathable, cool in summer, and the color hasn't faded at all.",
    rating: 5,
  },
  {
    name: "Amina K.",
    location: "Verified Buyer",
    quote:
      "Ordered the linen duvet cover and it exceeded expectations. Packaging was lovely too.",
    rating: 5,
  },
];