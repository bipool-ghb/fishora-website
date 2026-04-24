export const CATEGORIES = [
  { id: 'fish',   name: 'Fresh Fish',      nameBn: 'তাজা মাছ',    icon: '🐟', color: '#1976D2' },
  { id: 'meat',   name: 'Halal Meat',      nameBn: 'হালাল মাংস',  icon: '🥩', color: '#C62828' },
  { id: 'eggs',   name: 'Eggs',            nameBn: 'ডিম',          icon: '🥚', color: '#F9A825' },
  { id: 'prawns', name: 'Prawns & Shrimp', nameBn: 'চিংড়ি',       icon: '🦐', color: '#E65100' },
  { id: 'dried',  name: 'Dried Fish',      nameBn: 'শুঁটকি',       icon: '🐠', color: '#6D4C41' },
  { id: 'deals',  name: 'Combo Deals',     nameBn: 'কম্বো অফার',   icon: '🎁', color: '#0D7C66' },
]

export const PRODUCTS = [
  // Fish
  { id: 1,  cat: 'fish',   name: 'Rui Fish',            nameBn: 'রুই মাছ',                   price: 350,  unit: 'kg',    badge: 'Popular' },
  { id: 2,  cat: 'fish',   name: 'Katla Fish',           nameBn: 'কাতলা মাছ',                 price: 400,  unit: 'kg'   },
  { id: 3,  cat: 'fish',   name: 'Ilish Fish',           nameBn: 'ইলিশ মাছ',                  price: 1200, unit: 'kg',   badge: 'Premium' },
  { id: 4,  cat: 'fish',   name: 'Pangash Fish',         nameBn: 'পাঙ্গাশ মাছ',               price: 250,  unit: 'kg'   },
  { id: 5,  cat: 'fish',   name: 'Tilapia Fish',         nameBn: 'তেলাপিয়া মাছ',             price: 200,  unit: 'kg'   },
  { id: 6,  cat: 'fish',   name: 'Koi Fish',             nameBn: 'কই মাছ',                    price: 500,  unit: 'kg',   badge: 'Fresh'   },
  { id: 7,  cat: 'fish',   name: 'Shing Fish',           nameBn: 'শিং মাছ',                   price: 700,  unit: 'kg'   },
  { id: 8,  cat: 'fish',   name: 'Magur Fish',           nameBn: 'মাগুর মাছ',                 price: 600,  unit: 'kg'   },
  // Meat
  { id: 10, cat: 'meat',   name: 'Beef (Bone-in)',       nameBn: 'গরুর মাংস (হাড়সহ)',        price: 700,  unit: 'kg',   badge: 'Halal'   },
  { id: 11, cat: 'meat',   name: 'Beef (Boneless)',      nameBn: 'গরুর মাংস (হাড়ছাড়া)',      price: 850,  unit: 'kg',   badge: 'Halal'   },
  { id: 12, cat: 'meat',   name: 'Mutton',               nameBn: 'খাসির মাংস',                price: 1100, unit: 'kg',   badge: 'Premium' },
  { id: 13, cat: 'meat',   name: 'Chicken (Whole)',      nameBn: 'মুরগি (গোটা)',              price: 250,  unit: 'kg'   },
  { id: 14, cat: 'meat',   name: 'Chicken Breast',       nameBn: 'মুরগির বুকের মাংস',        price: 350,  unit: 'kg'   },
  // Eggs
  { id: 20, cat: 'eggs',   name: 'Deshi Eggs',           nameBn: 'দেশি ডিম',                  price: 140,  unit: 'dozen', badge: 'Farm Fresh' },
  { id: 21, cat: 'eggs',   name: 'Broiler Eggs',         nameBn: 'ব্রয়লার ডিম',               price: 120,  unit: 'dozen' },
  { id: 22, cat: 'eggs',   name: 'Duck Eggs',            nameBn: 'হাঁসের ডিম',                price: 180,  unit: 'dozen' },
  // Prawns
  { id: 30, cat: 'prawns', name: 'Galda Prawn',          nameBn: 'গলদা চিংড়ি',               price: 900,  unit: 'kg',   badge: 'Premium' },
  { id: 31, cat: 'prawns', name: 'Bagda Prawn',          nameBn: 'বাগদা চিংড়ি',              price: 1100, unit: 'kg'   },
  { id: 32, cat: 'prawns', name: 'Small Shrimp',         nameBn: 'ছোট চিংড়ি',                price: 450,  unit: 'kg'   },
  // Dried
  { id: 40, cat: 'dried',  name: 'Shutki (Loitta)',      nameBn: 'শুঁটকি (লইট্টা)',           price: 600,  unit: 'kg'   },
  { id: 41, cat: 'dried',  name: 'Shutki (Chela)',       nameBn: 'শুঁটকি (চেলা)',              price: 800,  unit: 'kg'   },
  { id: 42, cat: 'dried',  name: 'Shutki (Rupchanda)',   nameBn: 'শুঁটকি (রূপচাঁদা)',         price: 1500, unit: 'kg',   badge: 'Premium' },
  // Combo Deals
  {
    id: 50, cat: 'deals',
    name: 'Family Fish Pack',         nameBn: 'ফ্যামিলি ফিশ প্যাক',
    price: 950,  originalPrice: 1100, unit: 'pack',  badge: 'Save ৳150',
    includes: ['Rui Fish 2kg', 'Katla Fish 1kg', 'Tilapia 1kg'],
    includesBn: ['রুই মাছ ২ কেজি', 'কাতলা মাছ ১ কেজি', 'তেলাপিয়া ১ কেজি'],
  },
  {
    id: 51, cat: 'deals',
    name: 'Protein Boost Combo',      nameBn: 'প্রোটিন বুস্ট কম্বো',
    price: 1350, originalPrice: 1600, unit: 'pack',  badge: 'Save ৳250',
    includes: ['Beef Boneless 1kg', 'Chicken Breast 1kg', 'Deshi Eggs 1 dozen'],
    includesBn: ['গরুর মাংস ১ কেজি', 'মুরগির বুক ১ কেজি', 'দেশি ডিম ১ ডজন'],
  },
  {
    id: 52, cat: 'deals',
    name: 'Wedding Starter Pack',     nameBn: 'ওয়েডিং স্টার্টার প্যাক',
    price: 4500, originalPrice: 5200, unit: 'pack',  badge: 'Save ৳700',
    includes: ['Beef Boneless 3kg', 'Mutton 2kg', 'Rui Fish 3kg', 'Galda Prawn 1kg'],
    includesBn: ['গরুর মাংস ৩ কেজি', 'খাসির মাংস ২ কেজি', 'রুই মাছ ৩ কেজি', 'গলদা চিংড়ি ১ কেজি'],
  },
  {
    id: 53, cat: 'deals',
    name: 'Weekend BBQ Pack',         nameBn: 'উইকেন্ড বিবিকিউ প্যাক',
    price: 1800, originalPrice: 2100, unit: 'pack',  badge: 'Save ৳300',
    includes: ['Beef Boneless 1.5kg', 'Chicken (Whole) 1kg', 'Galda Prawn 500g'],
    includesBn: ['গরুর মাংস ১.৫ কেজি', 'মুরগি ১ কেজি', 'গলদা চিংড়ি ৫০০ গ্রাম'],
  },
  {
    id: 54, cat: 'deals',
    name: 'Budget Fish Combo',        nameBn: 'বাজেট ফিশ কম্বো',
    price: 700,  originalPrice: 850,  unit: 'pack',  badge: 'Save ৳150',
    includes: ['Pangash 2kg', 'Tilapia 1kg', 'Broiler Eggs 1 dozen'],
    includesBn: ['পাঙ্গাশ ২ কেজি', 'তেলাপিয়া ১ কেজি', 'ব্রয়লার ডিম ১ ডজন'],
  },
  {
    id: 55, cat: 'deals',
    name: 'Premium Seafood Box',      nameBn: 'প্রিমিয়াম সিফুড বক্স',
    price: 3200, originalPrice: 3800, unit: 'pack',  badge: 'Save ৳600',
    includes: ['Ilish Fish 1kg', 'Bagda Prawn 1kg', 'Galda Prawn 500g', 'Koi Fish 1kg'],
    includesBn: ['ইলিশ মাছ ১ কেজি', 'বাগদা চিংড়ি ১ কেজি', 'গলদা চিংড়ি ৫০০ গ্রাম', 'কই মাছ ১ কেজি'],
  },
]
