// ============================================
// Happy Accessories By Tota - Products Data
// ============================================

// Sample products data
const products = [
    // Necklaces (عقود)
    {
        id: 1,
        name: "عقد فيونكة ذهبي",
        category: "necklaces",
        categoryName: "عقود",
        description: "عقد أنيق بتصميم فيونكة كلاسيكي، مثالي للمناسبات الرسمية.",
        priceGoldPlated: 450,
        priceGold: 1200,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
        badges: ["جديد"],
        inStock: true
    },
    {
        id: 2,
        name: "عقد قلب ذهبي",
        category: "necklaces",
        categoryName: "عقود",
        description: "عقد على شكل قلب ماسي، رمز الحب والأناقة.",
        priceGoldPlated: 380,
        priceGold: 950,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        badges: [],
        inStock: true
    },
    {
        id: 3,
        name: "عقد القمر والنجوم",
        category: "necklaces",
        categoryName: "عقود",
        description: "تصميم سحري يجسد جمالية الليل والنجوم.",
        priceGoldPlated: 520,
        priceGold: 1400,
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400",
        badges: ["ذهب"],
        inStock: true
    },
    {
        id: 4,
        name: "عقد链条 ذهبي",
        category: "necklaces",
        categoryName: "عقود",
        description: "عقد بخطوط أنيقة间隙، مناسب للارتداء اليومي.",
        priceGoldPlated: 350,
        priceGold: 850,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        badges: [],
        inStock: true
    },
    
    // Earrings (حلقان)
    {
        id: 5,
        name: "حلقان كرستاله",
        category: "earrings",
        categoryName: "حلقان",
        description: "حلقانكريستاله لامعة، تضيف لمعاناً لإطلالتك.",
        priceGoldPlated: 280,
        priceGold: 700,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
        badges: ["جديد"],
        inStock: true
    },
    {
        id: 6,
        name: "حلقانcircle ذهبي",
        category: "earrings",
        categoryName: "حلقان",
        description: "حلقان بدائرة بسيطة وأنيقة.",
        priceGoldPlated: 220,
        priceGold: 550,
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400",
        badges: [],
        inStock: true
    },
    {
        id: 7,
        name: "حلقان فراشات",
        category: "earrings",
        categoryName: "حلقان",
        description: "حلقان على شكل فراشات ناعمة، مثالية للمواسم الدافئة.",
        priceGoldPlated: 320,
        priceGold: 800,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400",
        badges: [],
        inStock: true
    },
    {
        id: 8,
        name: "حلقان ت-drop",
        category: "earrings",
        categoryName: "حلقان",
        description: "حلقان طويلة بتصميمDrop، تمنحك إطلالة فاخرة.",
        priceGoldPlated: 420,
        priceGold: 1100,
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400",
        badges: ["ذهب"],
        inStock: true
    },
    
    // Bracelets (أساور)
    {
        id: 9,
        name: "سوار tennis ذهبي",
        category: "bracelets",
        categoryName: "أساور",
        description: "سوار تينيس بأناقة، يتلألأ مع كل حركة.",
        priceGoldPlated: 550,
        priceGold: 1500,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        badges: ["جديد", "ذهب"],
        inStock: true
    },
    {
        id: 10,
        name: "سوار أس.chain",
        category: "bracelets",
        categoryName: "أساور",
        description: "سوار سلسلة كلاسيكي، مناسب لجميع الأذواق.",
        priceGoldPlated: 380,
        priceGold: 950,
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400",
        badges: [],
        inStock: true
    },
    {
        id: 11,
        name: "سوار heart المفتوح",
        category: "bracelets",
        categoryName: "أساور",
        description: "سوار قلب مفتوح بتصميم عصري.",
        priceGoldPlated: 290,
        priceGold: 720,
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400",
        badges: [],
        inStock: true
    },
    
    // Rings (خواتم)
    {
        id: 12,
        name: "خاتم princess",
        category: "rings",
        categoryName: "خواتم",
        description: "خاتم ب تصميم Princess، ياقة الأميرة الناعمة.",
        priceGoldPlated: 350,
        priceGold: 900,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        badges: ["جديد"],
        inStock: true
    },
    {
        id: 13,
        name: "خاتم solitair",
        category: "rings",
        categoryName: "خواتم",
        description: "خاتم سوليتير كلاسيكي، رمز الأناقة الخالدة.",
        priceGoldPlated: 480,
        priceGold: 1300,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        badges: ["ذهب"],
        inStock: true
    },
    {
        id: 14,
        name: "خاتم infinity",
        category: "rings",
        categoryName: "خواتم",
        description: "خاتم إنفينيتي، رمز الحب الأبدي.",
        priceGoldPlated: 320,
        priceGold: 800,
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400",
        badges: [],
        inStock: true
    },
    {
        id: 15,
        name: "خاتم stackable ذهبي",
        category: "rings",
        categoryName: "خواتم",
        description: "خواتم قابلة للتجميع، لمظهر متنوع.",
        priceGoldPlated: 250,
        priceGold: 600,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        badges: [],
        inStock: true
    },
    
    // Pendants (تعاليق)
    {
        id: 16,
        name: "تعليق cross ذهبي",
        category: "pendants",
        categoryName: "تعاليق",
        description: "تعليق صليب أنيق بخامة فاخرة.",
        priceGoldPlated: 380,
        priceGold: 950,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        badges: [],
        inStock: true
    },
    {
        id: 17,
        name: "تعليق horseshoe",
        category: "pendants",
        categoryName: "تعاليق",
        description: "تعليق حدوة حصان، رمز الحظ السعيد.",
        priceGoldPlated: 290,
        priceGold: 720,
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400",
        badges: ["جديد"],
        inStock: true
    },
    {
        id: 18,
        name: "تعليق evil eye",
        category: "pendants",
        categoryName: "تعاليق",
        description: "تعليق العين الحسودة، للحماية والأناقة.",
        priceGoldPlated: 340,
        priceGold: 850,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        badges: [],
        inStock: true
    },
    {
        id: 19,
        name: "تعليق INITIAL字母",
        category: "pendants",
        categoryName: "تعاليق",
        description: "تعليق بحرفك الأول، لمسة شخصية مميزة.",
        priceGoldPlated: 420,
        priceGold: 1100,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
        badges: ["ذهب"],
        inStock: true
    }
];

// Testimonials data
const testimonials = [
    {
        id: 1,
        name: "سارة محمد",
        since: "عميلة منذ 2023",
        rating: 5,
        text: "منتجات جداً رائعة وجودة عالية جداً، الشحن كان سريع والتغليف فخم ❤️"
    },
    {
        id: 2,
        name: "نورة عبدالله",
        since: "عميلة منذ 2023",
        rating: 5,
        text: "أجمل اكسسوارات اشتريتها من هنا، التصميمات فريدة والذهب حسب الطلب كان ممتاز ❤️"
    },
    {
        id: 3,
        name: "ليلى أحمد",
        since: "عميلة منذ 2024",
        rating: 4.5,
        text: "خدمة عملاء ممتازة واستجابة سريعة. أنصح الجميع بالتسوق من هنا 👌"
    },
    {
        id: 4,
        name: "هدى علي",
        since: "عميلة منذ 2024",
        rating: 5,
        text: "الذهب حسب الطلب كان جداً أجمل من المتوقع، أن次回 مرة سأطلب غيره 💛"
    },
    {
        id: 5,
        name: "منى محمود",
        since: "عميلة منذ 2022",
        rating: 5,
        text: "أفضل متجر اكسسوارات! جودة ممتازة وأسعار معقولة جداً"
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, testimonials };
}

