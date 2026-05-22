export const PHONE = '01357-187246'
export const WHATSAPP = '8801357187246'
export const LOCATION = 'Bishwas Super Market, College Road, Ishwardi, Pabna'
export const HOURS = '8 AM – 9 PM Daily'

export const CATEGORIES = [
  { id: 'all', name: 'All Products', nameBn: 'সকল পণ্য', count: 15 },
  { id: 'fish', name: 'Fresh Fish', nameBn: 'তাজা মাছ', count: 6,
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1B5E20, #43A047)' },
  { id: 'meat', name: 'Halal Meat', nameBn: 'হালাল মাংস', count: 4,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #B71C1C, #E53935)' },
  { id: 'eggs', name: 'Farm Eggs', nameBn: 'ডিম', count: 3,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #E65100, #FF9800)' },
  { id: 'prawns', name: 'Prawns & Shrimp', nameBn: 'চিংড়ি', count: 2,
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
    gradient: 'linear-gradient(135deg, #0D47A1, #1976D2)' },
  { id: 'combo', name: 'Combo Deals', nameBn: 'কম্বো অফার', count: 6,
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #4A148C, #7B1FA2)' },
]

export const PRODUCTS = [
  {
    id: 1, name: 'Ilish Fish', nameBn: 'ইলিশ মাছ', category: 'fish',
    price: 1200, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80',
    badge: 'Premium', freshness: "Today's Catch", rating: 4.9,
    source: 'Padma River',
    description: 'The crown jewel of Bengali cuisine — silver-scaled, oil-rich, and unforgettable.',
  },
  {
    id: 2, name: 'Rui Fish', nameBn: 'রুই মাছ', category: 'fish',
    price: 350, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a0?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular', freshness: "Today's Catch", rating: 4.7,
    source: 'River Fresh',
    description: 'A Bengali staple — mild, versatile, and perfect for everyday cooking.',
  },
  {
    id: 3, name: 'Katla Fish', nameBn: 'কাতলা মাছ', category: 'fish',
    price: 500, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=600&q=80',
    badge: 'Fresh', freshness: 'Morning Catch', rating: 4.6,
    source: 'River Fresh',
    description: 'Rich, flavorful fish ideal for celebratory curries and festive meals.',
  },
  {
    id: 4, name: 'Koi Fish', nameBn: 'কই মাছ', category: 'fish',
    price: 500, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=600&q=80',
    badge: 'Fresh', freshness: "Today's Catch", rating: 4.6,
    source: 'Farm Fresh',
    description: 'A beloved Bengali delicacy — rich flavor, perfect for koi macher jhol.',
  },
  {
    id: 5, name: 'Pangash Fish', nameBn: 'পাঙ্গাশ মাছ', category: 'fish',
    price: 280, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=600&q=80',
    badge: 'Value', freshness: 'Farm Fresh', rating: 4.4,
    source: 'Farm Raised',
    description: 'Affordable and nutritious — a household essential for every Bengali family.',
  },
  {
    id: 6, name: 'Tilapia', nameBn: 'তেলাপিয়া', category: 'fish',
    price: 350, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular', freshness: 'Farm Fresh', rating: 4.5,
    source: 'Farm Raised',
    description: 'Clean, mild-flavored fish — perfect for frying, grilling, and light curries.',
  },
  {
    id: 7, name: 'Beef (Bone-in)', nameBn: 'গরুর মাংস (হাড়সহ)', category: 'meat',
    price: 700, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
    badge: 'Halal', freshness: 'Morning Cut', rating: 4.7,
    source: '100% Halal',
    description: 'Premium quality halal beef with bone, freshly processed and hygienically packed.',
  },
  {
    id: 8, name: 'Beef (Boneless)', nameBn: 'গরুর মাংস (হাড়ছাড়া)', category: 'meat',
    price: 850, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=600&q=80',
    badge: 'Halal', freshness: 'Morning Cut', rating: 4.8,
    source: '100% Halal',
    description: 'Boneless halal beef — ready for biriyani, curry, or grilling.',
  },
  {
    id: 9, name: 'Mutton', nameBn: 'খাসির মাংস', category: 'meat',
    price: 1100, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=600&q=80',
    badge: 'Premium', freshness: 'Fresh Today', rating: 4.8,
    source: '100% Halal',
    description: 'Tender, premium quality halal mutton — perfect for biriyani and special occasions.',
  },
  {
    id: 10, name: 'Chicken', nameBn: 'মুরগি', category: 'meat',
    price: 250, weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular', freshness: 'Farm Fresh', rating: 4.6,
    source: '100% Halal',
    description: 'Naturally raised, halal chicken from trusted local farms.',
  },
  {
    id: 11, name: 'Deshi Eggs', nameBn: 'দেশি ডিম', category: 'eggs',
    price: 180, weight: '12 pcs',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    badge: 'Organic', freshness: 'Farm Fresh', rating: 4.9,
    source: 'Village Farm',
    description: '100% organic free-range eggs — rich yolks from traditional village farms.',
  },
  {
    id: 12, name: 'Broiler Eggs', nameBn: 'ব্রয়লার ডিম', category: 'eggs',
    price: 140, weight: '12 pcs',
    image: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?auto=format&fit=crop&w=600&q=80',
    badge: 'Value', freshness: 'Farm Fresh', rating: 4.5,
    source: 'Local Farm',
    description: 'Affordable everyday eggs — fresh from trusted poultry farms.',
  },
  {
    id: 13, name: 'Duck Eggs', nameBn: 'হাঁসের ডিম', category: 'eggs',
    price: 240, weight: '12 pcs',
    image: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?auto=format&fit=crop&w=600&q=80',
    badge: 'Premium', freshness: 'Farm Fresh', rating: 4.7,
    source: 'Village Farm',
    description: 'Rich, nutritious duck eggs from traditional Bangladeshi farms.',
  },
  {
    id: 14, name: 'Bagda Prawn', nameBn: 'বাগদা চিংড়ি', category: 'prawns',
    price: 900, weight: '500g',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
    badge: 'Premium', freshness: 'Fresh Today', rating: 4.8,
    source: 'Bay of Bengal',
    description: 'Jumbo Bagda prawns — sweet, succulent, and exceptional quality.',
  },
  {
    id: 15, name: 'Galda Prawn', nameBn: 'গলদা চিংড়ি', category: 'prawns',
    price: 800, weight: '500g',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
    badge: 'Fresh', freshness: 'Fresh Today', rating: 4.7,
    source: 'River Fresh',
    description: 'Fresh Galda prawns from local rivers — perfect for prawn malai curry.',
  },
]

export const COMBOS = [
  {
    id: 101, name: 'Family Fish Pack', nameBn: 'ফ্যামিলি ফিশ প্যাক',
    price: 950, originalPrice: 1100, save: 150,
    items: ['Rui Fish 2kg', 'Katla Fish 1kg', 'Tilapia 1kg'],
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 102, name: 'Protein Boost Combo', nameBn: 'প্রোটিন বুস্ট কম্বো',
    price: 1350, originalPrice: 1600, save: 250,
    items: ['Beef Boneless 1kg', 'Chicken Breast 1kg', 'Deshi Eggs 1 dozen'],
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 103, name: 'Wedding Starter Pack', nameBn: 'ওয়েডিং স্টার্টার প্যাক',
    price: 4500, originalPrice: 5200, save: 700,
    items: ['Beef Boneless 3kg', 'Mutton 2kg', 'Rui Fish 3kg', 'Galda Prawn 1kg'],
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 104, name: 'Weekend BBQ Pack', nameBn: 'উইকেন্ড বিবিকিউ প্যাক',
    price: 1800, originalPrice: 2100, save: 300,
    items: ['Beef Boneless 1.5kg', 'Chicken (Whole) 1kg', 'Galda Prawn 500g'],
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 105, name: 'Budget Fish Combo', nameBn: 'বাজেট ফিশ কম্বো',
    price: 700, originalPrice: 850, save: 150,
    items: ['Pangash 2kg', 'Tilapia 1kg', 'Broiler Eggs 1 dozen'],
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 106, name: 'Premium Seafood Box', nameBn: 'প্রিমিয়াম সিফুড বক্স',
    price: 3200, originalPrice: 3800, save: 600,
    items: ['Ilish Fish 1kg', 'Bagda Prawn 1kg', 'Galda Prawn 500g', 'Koi Fish 1kg'],
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
  },
]

export const SERVICES = [
  { title: 'Wholesale Orders', titleBn: 'পাইকারি অর্ডার',
    desc: 'Bulk pricing for restaurants, hotels & retailers. Special rates on large quantity orders.' },
  { title: 'Wedding & Events', titleBn: 'বিয়ে ও অনুষ্ঠান',
    desc: 'Fresh fish & meat supply for weddings, parties and ceremonies. We handle large-scale catering orders.' },
  { title: 'Clean, Cut & Process', titleBn: 'পরিষ্কার, কাটা ও প্রক্রিয়াজাত',
    desc: 'Expert fish & meat processing — cleaned, scaled, cut to your specifications. Ready to cook.' },
  { title: 'Pre-Orders', titleBn: 'প্রি-অর্ডার',
    desc: 'Pre-order for any event or occasion. Guaranteed freshness & timely delivery for your special day.' },
]

export const TESTIMONIALS = [
  {
    id: 1, name: 'Fatema Rahman', nameBn: 'ফাতেমা রহমান',
    role: 'Home Chef · Ishwardi',
    text: "Fishora's hilsha is the freshest I've ever had. My family can taste the difference — it reminds us of the fish straight from Padma river.",
    rating: 5, initials: 'FR',
  },
  {
    id: 2, name: 'Rahim Ahmed', nameBn: 'রহিম আহমেদ',
    role: 'Restaurant Owner · Pabna',
    text: 'We switched our entire supply chain to Fishora. Consistent quality, always halal, and reliable delivery every single time.',
    rating: 5, initials: 'RA',
  },
  {
    id: 3, name: 'Nusrat Jahan', nameBn: 'নুসরাত জাহান',
    role: 'Health-conscious Mother · Ishwardi',
    text: 'Finally, a store that understands food safety. Everything is 100% halal and fresh. I trust Fishora completely for my family\'s protein needs.',
    rating: 5, initials: 'NJ',
  },
]

export const TRUST = [
  { title: '100% Halal', titleBn: 'সম্পূর্ণ হালাল', icon: 'shield' },
  { title: 'Fresh Daily', titleBn: 'প্রতিদিন তাজা', icon: 'sunrise' },
  { title: 'Nationwide Delivery', titleBn: 'সারাদেশে ডেলিভারি', icon: 'truck' },
  { title: 'Expert Processing', titleBn: 'দক্ষ প্রক্রিয়াজাতকরণ', icon: 'snowflake' },
  { title: 'Fair Pricing', titleBn: 'ন্যায্য মূল্য', icon: 'heart' },
]
