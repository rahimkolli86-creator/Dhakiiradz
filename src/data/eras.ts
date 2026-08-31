export interface Era {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  background: string;
  theme: {
    glow: string;
    atmosphere: "dust" | "fog" | "grain" | "clear";
    overlay: string;
  };
  characters: {
    name: string;
    role: string;
    image: string;
  }[];
  events: {
    title: string;
    description: string;
  }[];
  archive: {
    title: string;
    type: "photo" | "document" | "map";
    url: string;
  }[];
}

export const eras: Era[] = [
  {
    id: "1830",
    year: "1830",
    title: "سقوط العاصمة وبداية المقاومة",
    subtitle: "المواجهة الكبرى وبزوغ فجر المقاومة الشعبية",
    description: "في الخامس من جويلية 1830، سقطت مدينة الجزائر في يد الاحتلال الفرنسي، لتبدأ مباشرة أعنف المقاومات الشعبية في التاريخ الحديث بقيادة رجالات عظام.",
    background: "image/1830.jpg",
    theme: {
      glow: "rgba(180, 150, 100, 0.4)",
      atmosphere: "dust",
      overlay: "bg-sepia-900/40"
    },
    characters: [
      { name: "الأمير عبد القادر", role: "مؤسس الدولة الجزائرية الحديثة", image: "image/Abdelkader.jpg" },
      { name: "لالة فاطمة نسومر", role: "خولة الجزائر وقائدة المقاومة بالقبائل", image: "image/Fatma.jpg" }
    ],
    events: [
      { title: "معركة سطاوالي", description: "أول مواجهة كبرى بين الجيش الجزائري والقوات الغازية." },
      { title: "مبايعة الأمير", description: "اتفاق القبائل على تنصيب الأمير عبد القادر قائداً للمقاومة." }
    ],
    archive: [
      { title: "خريطة الجزائر 1830", type: "map", url: "image/map.jpg" },
      { title: "وثيقة الاستسلام", type: "document", url: "image/Archive1.jpg" }
    ]
  },
  {
    id: "1945",
    year: "1945",
    title: "مجازر 8 ماي وكسر الأوهام",
    subtitle: "اليوم الذي أدرك فيه الشعب أن ما أخذ بالقوة لا يسترد إلا بالقوة",
    description: "بينما كان العالم يحتفل بنهاية الحرب العالمية الثانية، كانت شوارع سطيف وقالمة وخراطة تغرق في دماء المتظاهرين المطالبين بالحرية ووعد الاستقلال الكاذب.",
    background: "image/1945.jpg",
    theme: {
      glow: "rgba(204, 8, 50, 0.3)",
      atmosphere: "grain",
      overlay: "bg-black/60"
    },
    characters: [
      { name: "فرحات عباس", role: "زعيم حركة أحباب البيان والحرية", image: "image/Ferhat.jpg" }
    ],
    events: [
      { title: "مظاهرات سطيف", description: "اندلاع شرارة الاحتجاجات السلمية التي ووجهت بمجازر بشعة." },
      { title: "إنشاء المنظمة الخاصة", description: "بداية التحضير السري للعمل المسلح كرد فعل على المجازر." }
    ],
    archive: [
      { title: "صور الناجين", type: "document", url: "image/Naji.jpg" }
    ]
  },
  {
    id: "1954",
    year: "1954",
    title: "اندلاع الثورة التحريرية",
    subtitle: "ليلة أول نوفمبر وميلاد جبهة التحرير الوطني",
    description: "في منتصف ليلة فاتح نوفمبر، دوّت رصاصات الثورة في جبال الأوراس لتعلن للعالم ميلاد أعظم ثورة تحريرية في القرن العشرين، بقيادة مجموعة من الشباب الوطنيين.",
    background: "image/1nov.jpg",
    theme: {
      glow: "rgba(31, 95, 58, 0.4)",
      atmosphere: "fog",
      overlay: "bg-black/50"
    },
    characters: [
      { name: "العربي بن مهيدي", role: "مهندس التنفيذ وعضو مجموعة الستة", image: "image/Larbi.jpg" },
      { name: "مصطفى بن بولعيد", role: "أب الثورة وقائد الأوراس", image: "image/Mustapha.jpg" }
    ],
    events: [
      { title: "ليلة أول نوفمبر", description: "تنفيذ أكثر من 30 عملية عسكرية متزامنة في ربوع الوطن." },
      { title: "بيان أول نوفمبر", description: "الوثيقة المرجعية التي حددت أهداف الثورة وشروط التفاوض." }
    ],
    archive: [
      { title: "الصفحة الأولى من البيان", type: "document", url: "image/bayan.jpg" }
    ]
  },
  {
    id: "1962",
    year: "1962",
    title: "الاستقلال والسيادة",
    subtitle: "تحقيق الحلم واستعادة السيادة الوطنية الضائعة",
    description: "بعد سبع سنوات ونصف من الحرب المدمرة، وبمباركة ملايين الشهداء، انتزع الشعب الجزائري حقه في الوجود والحرية، ليرفرف العلم الجزائري خفاقاً في سماء العاصمة.",
    background: "image/isti9lel.jpg",
    theme: {
      glow: "rgba(25, 202, 25, 0.2)",
      atmosphere: "clear",
      overlay: "bg-green-900/20"
    },
    characters: [
      { name: "أحمد بن بلة", role: "أول رئيس للجمهورية الجزائرية المستقلة", image: "image/benbela.jpg" }
    ],
    events: [
      { title: "استفتاء الاستقلال", description: "تصويت كاسح بـ 'نعم' لجزائر مستقلة وسيدة." },
      { title: "اتفاقيات إيفيان", description: "المفاوضات الشاقة التي أدت لوقف إطلاق النار والاعتراف بالاستقلال." }
    ],
    archive: [
      { title: "صور الاحتفالات", type: "photo", url: "image/623539ed571502ef2c668c686a309f18_m.jpg" }
    ]
  }
];
