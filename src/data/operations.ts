export interface Operation {
  id: string;
  title: string;
  codeName: string;
  date: string;
  location: string;
  commander: string;
  objective: string;
  outcome: string;
  description: string;
  classification: "SECRET" | "TOP_SECRET" | "CLASSIFIED";
  coordinates?: { x: number, y: number };
}

export const operations: Operation[] = [
  {
    id: "north-constantine",
    title: "هجومات الشمال القسنطيني",
    codeName: "عملية 20 أوت",
    date: "20 أوت 1955",
    location: "الشمال القسنطيني - الولاية الثانية",
    commander: "زيغود يوسف",
    objective: "فك الحصار عن الأوراس وتدويل القضية الجزائرية",
    outcome: "نجاح باهر - منعرج حاسم في مسار الثورة",
    description: "هجومات شاملة استهدفت المراكز العسكرية والشرطية والمنشآت الحيوية الاستعمارية في 26 مدينة وقرية بالشمال القسنطيني.",
    classification: "TOP_SECRET",
    coordinates: { x: 75, y: 35 }
  },
  {
    id: "soummam-congress",
    title: "مؤتمر الصومام",
    codeName: "إعادة الهيكلة",
    date: "20 أوت 1956",
    location: "إيفري - الولاية الثالثة (القبائل)",
    commander: "عبان رمضان / العربي بن مهيدي",
    objective: "تنظيم الثورة عسكرياً وسياسياً وتوحيد القيادة",
    outcome: "تأسيس المجلس الوطني للثورة ولجنة التنسيق والتنفيذ",
    description: "لقاء تاريخي حدد أولويات الثورة (أولوية السياسي على العسكري والداخل على الخارج).",
    classification: "SECRET",
    coordinates: { x: 55, y: 30 }
  },
  {
    id: "battle-of-algiers",
    title: "معارك الفدائيين في القصبة",
    codeName: "القنبلة",
    date: "1956 - 1957",
    location: "القصبة - الجزائر العاصمة",
    commander: "ياسف سعدي / علي لابوانت",
    objective: "نقل الرعب لقلب المستعمر وجلب أنظار الإعلام العالمي",
    outcome: "تضحيات جسيمة وفضح وحشية الاستعمار (التعذيب)",
    description: "سلسلة من العمليات الفدائية المعقدة ضد الأهداف الحيوية للاحتلال في العاصمة.",
    classification: "SECRET",
    coordinates: { x: 50, y: 25 }
  }
];
