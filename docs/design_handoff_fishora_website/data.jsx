// Product data for Fishora
const CATEGORIES = [
  { id: 'fish', name: 'Fresh Fish', nameBn: 'তাজা মাছ', icon: '🐟' },
  { id: 'meat', name: 'Halal Meat', nameBn: 'হালাল মাংস', icon: '🥩' },
  { id: 'eggs', name: 'Eggs', nameBn: 'ডিম', icon: '🥚' },
  { id: 'prawns', name: 'Prawns & Shrimp', nameBn: 'চিংড়ি', icon: '🦐' },
  { id: 'dried', name: 'Dried Fish', nameBn: 'শুঁটকি', icon: '🐠' },
];

const PRODUCTS = [
  // Fish
  { id: 1, cat: 'fish', name: 'Rui Fish', nameBn: 'রুই মাছ', price: 350, unit: 'kg', img: null, badge: 'Popular' },
  { id: 2, cat: 'fish', name: 'Katla Fish', nameBn: 'কাতলা মাছ', price: 400, unit: 'kg', img: null },
  { id: 3, cat: 'fish', name: 'Ilish Fish', nameBn: 'ইলিশ মাছ', price: 1200, unit: 'kg', img: null, badge: 'Premium' },
  { id: 4, cat: 'fish', name: 'Pangash Fish', nameBn: 'পাঙ্গাশ মাছ', price: 250, unit: 'kg', img: null },
  { id: 5, cat: 'fish', name: 'Tilapia Fish', nameBn: 'তেলাপিয়া মাছ', price: 200, unit: 'kg', img: null },
  { id: 6, cat: 'fish', name: 'Koi Fish', nameBn: 'কই মাছ', price: 500, unit: 'kg', img: null, badge: 'Fresh' },
  { id: 7, cat: 'fish', name: 'Shing Fish', nameBn: 'শিং মাছ', price: 700, unit: 'kg', img: null },
  { id: 8, cat: 'fish', name: 'Magur Fish', nameBn: 'মাগুর মাছ', price: 600, unit: 'kg', img: null },
  // Meat
  { id: 10, cat: 'meat', name: 'Beef (Bone-in)', nameBn: 'গরুর মাংস (হাড়সহ)', price: 700, unit: 'kg', img: null, badge: 'Halal' },
  { id: 11, cat: 'meat', name: 'Beef (Boneless)', nameBn: 'গরুর মাংস (হাড়ছাড়া)', price: 850, unit: 'kg', img: null, badge: 'Halal' },
  { id: 12, cat: 'meat', name: 'Mutton', nameBn: 'খাসির মাংস', price: 1100, unit: 'kg', img: null, badge: 'Premium' },
  { id: 13, cat: 'meat', name: 'Chicken (Whole)', nameBn: 'মুরগি (গোটা)', price: 250, unit: 'kg', img: null },
  { id: 14, cat: 'meat', name: 'Chicken Breast', nameBn: 'মুরগির বুকের মাংস', price: 350, unit: 'kg', img: null },
  // Eggs
  { id: 20, cat: 'eggs', name: 'Deshi Eggs', nameBn: 'দেশি ডিম', price: 140, unit: 'dozen', img: null, badge: 'Farm Fresh' },
  { id: 21, cat: 'eggs', name: 'Broiler Eggs', nameBn: 'ব্রয়লার ডিম', price: 120, unit: 'dozen', img: null },
  { id: 22, cat: 'eggs', name: 'Duck Eggs', nameBn: 'হাঁসের ডিম', price: 180, unit: 'dozen', img: null },
  // Prawns
  { id: 30, cat: 'prawns', name: 'Galda Prawn', nameBn: 'গলদা চিংড়ি', price: 900, unit: 'kg', img: null, badge: 'Premium' },
  { id: 31, cat: 'prawns', name: 'Bagda Prawn', nameBn: 'বাগদা চিংড়ি', price: 1100, unit: 'kg', img: null },
  { id: 32, cat: 'prawns', name: 'Small Shrimp', nameBn: 'ছোট চিংড়ি', price: 450, unit: 'kg', img: null },
  // Dried
  { id: 40, cat: 'dried', name: 'Shutki (Loitta)', nameBn: 'শুঁটকি (লইট্টা)', price: 600, unit: 'kg', img: null },
  { id: 41, cat: 'dried', name: 'Shutki (Chela)', nameBn: 'শুঁটকি (চেলা)', price: 800, unit: 'kg', img: null },
  { id: 42, cat: 'dried', name: 'Shutki (Rupchanda)', nameBn: 'শুঁটকি (রূপচাঁদা)', price: 1500, unit: 'kg', img: null, badge: 'Premium' },
];

window.CATEGORIES = CATEGORIES;
window.PRODUCTS = PRODUCTS;
