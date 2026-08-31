export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'image' | 'audio';
  thumbnail: string;
  file_url: string;
  audio_url?: string;
  image_url?: string;
  year: string;
  region_id: string;
  source: string;
  tags: string[];
  views: number;
  downloads: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  
  // Custom frontend enhancement fields
  pages?: number;      // specific to PDF items
  duration?: string;   // specific to Audio items
  file_size?: string;  // e.g. "2.4 MB" or "1.8 MB"
}

export const WILAYAS_LIST = [
  { id: 'DZ-05', name: 'المنطقة الأولى: الأوراس (Aurès)' },
  { id: 'DZ-25', name: 'المنطقة الثانية: الشمال القسنطيني (Nord-Constantinois)' },
  { id: 'DZ-15', name: 'المنطقة الثالثة: القبائل (Kabylie)' },
  { id: 'DZ-16', name: 'المنطقة الرابعة: العاصمة وضواحيها (Algérois)' },
  { id: 'DZ-31', name: 'المنطقة الخامسة: الوهراني (Oranie)' }
];

export const HISTORICAL_PERIODS = [
  { id: 'pre-1954', name: 'الحركة الوطنية والتحضير للثورة (قبل 1954)' },
  { id: '1954-1956', name: 'اندلاع الكفاح المسالح والولادة (1954 - 1956)' },
  { id: '1956-1959', name: 'التنظيم الدبلوماسي والمواجهة الحضرية (1956 - 1959)' },
  { id: '1959-1962', name: 'تقرير المصير، المفاوضات والسيادة الكاملة (1959 - 1962)' }
];

export const INITIAL_LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'lib-1',
    title: 'بيان أول نوفمبر 1954 (المنشور التأسيسي الأول)',
    description: 'المستند التاريخي الذي أرسى معالم الثورة التحريرية وألقى بها للشارع لكي يحتضنها الشعب. يفرز الأهداف الاستراتيجية لاستعادة السيادة الوطنية الكاملة وإعادة بناء الدولة الجزائرية في إطار المبادئ الإسلامية، الموجه لجبهة التحرير الوطني وجيش التحرير الوطني والملقى سرياً ليلة الدخول المسلح في كافة ربوع القطر.',
    type: 'pdf',
    thumbnail: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=400&fit=crop',
    file_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Proclamation_du_1er_novembre_1954.pdf',
    year: '1954',
    region_id: 'DZ-16',
    source: 'متحف المجاهد الوطني بالجزائر العاصمة',
    tags: ['البيان التأسيسي', 'أول نوفمبر', 'جبهة التحرير', 'مخطوطة'],
    views: 4520,
    downloads: 1890,
    status: 'approved',
    created_at: '2026-06-01T10:00:00Z',
    pages: 2,
    file_size: '1.2 MB'
  },
  {
    id: 'lib-2',
    title: 'قرارات وميثاق مؤتمر الصومام التاريخي 1956',
    description: 'النسخة الكاملة لوثيقة الصومام التي تمت صياغتها بريادة القائد المفكر عبان رمضان وكريم بلقاسم في أوزلاقن بوادي الصومام. تمخضت عن إعادة رسم الخريطة العسكرية لست ولايات تاريخية، وعينت مجالس قيادية عسكرية ومدنية محكمة، بالإضافة إلى وضع المبدأين الشهيرين: أولوية العمل السياسي على العمل العسكري والداخل على الخارج.',
    type: 'pdf',
    thumbnail: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=400&fit=crop',
    file_url: 'https://example.com/charte-de-soummam.pdf',
    year: '1956',
    region_id: 'DZ-15',
    source: 'مركز الأرشيف الوطني المرتب ببلدية بئر خادم',
    tags: ['مؤتمر الصومام', 'ميثاق تكتيكي', 'الولاية الثالثة', 'مجلس الثورة'],
    views: 3120,
    downloads: 980,
    status: 'approved',
    created_at: '2026-06-02T11:00:00Z',
    pages: 24,
    file_size: '4.8 MB'
  },
  {
    id: 'lib-3',
    title: 'مذكرات اتفاقيات إيفيان الرسمية والتصريحات المشتركة 1962',
    description: 'الوثيقة السياسية الدبلوماسية المبرمة في مدينة إيفيان الفرنسية، والموقعة من رئيس الوفد المفاوض الجزائري كريم بلقاسم، والتي أقرت الوقف الشامل للقتال عبر التراب الجزائري فورياً، صامدة في وجه محاولات التقسيم الإقليمي للصحراء الكبرى وتمهيداً للنطق بالاستقلال والسيادة السياسية المطلقة.',
    type: 'pdf',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&fit=crop',
    file_url: 'https://example.com/accords-evian.pdf',
    year: '1962',
    region_id: 'DZ-16',
    source: 'أرشيف مركز جنيف للدراسات الدبلوماسية وعبر الهيئة التفاوضية المؤقتة',
    tags: ['اتفاقيات إيفيان', 'وقف إطلاق النار', 'الوفد المفاوض', 'الاستقلال'],
    views: 5210,
    downloads: 2450,
    status: 'approved',
    created_at: '2026-06-03T12:00:00Z',
    pages: 48,
    file_size: '9.3 MB'
  },
  {
    id: 'lib-4',
    title: 'مراسلات القادة الستة السريين من داخل معتقل (جنيف - إيفيان)',
    description: 'باقة من الخطابات السرية والمشفرة المتبادلة بين أحمد بن بلة ورفاقه المعتقلين في حصن (Aulnoy) وبين قيادة الحكومة المؤقتة بالقاهرة وتونس، لتنسيق الخط التفاوضي الصامد ومنع حدوث انشقاق عسكري أو سياسي في صفوف الحكومة والشعب الثائر.',
    type: 'pdf',
    thumbnail: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=400&fit=crop',
    file_url: 'https://example.com/prison-letters.pdf',
    year: '1959',
    region_id: 'DZ-16',
    source: 'المتحف المركزي للجيش الوطني الشعبي، المحمدية',
    tags: ['مراسلات سرية', 'سجن الأحرار', 'أحمد بن بلة', 'رعيل الثورة'],
    views: 1840,
    downloads: 410,
    status: 'approved',
    created_at: '2026-06-04T09:12:00Z',
    pages: 6,
    file_size: '1.7 MB'
  },
  {
    id: 'lib-5',
    title: 'الصورة التاريخية للزعماء الستة مفجري الثورة بنوفمبر',
    description: 'اللقطة التاريخية الرمزية الشهيرة والملتقطة باللونين الأبيض والأسود في الجزائر العاصمة قبل موعد التفجير بأيام قليلة، والتي تخلد اجتماع الرواد الخمسة أعضاء لجنة الـ 22 الساعية للتنفيذ وتوحيد البيت الثوري بمشاركة كريم بلقاسم، وفيها القادة: مصطفى بن بولعيد، ديدوش مراد، العربي بن مهيدي، رابح بيطاط، كريم بلقاسم، ومحمد بوضياف.',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80&w=800&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80&w=1200&fit=crop',
    file_url: 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80',
    year: '1954',
    region_id: 'DZ-16',
    source: 'وكالة الأنباء الجزائرية الرسمية (أرشيف)',
    tags: ['منفذو الثورة', 'القادة الستة', 'العاصمة', 'رصاصة أول نوفمبر'],
    views: 7840,
    downloads: 3900,
    status: 'approved',
    created_at: '2026-06-05T14:30:00Z'
  },
  {
    id: 'lib-6',
    title: 'مجموعة القادة الملهمين في مؤتمر الصومام بنواحي إفري',
    description: 'صورة نادرة تذكارية تعرض قادة الوفود التاريخية المجتمعين وسط غابات جرجرة ووادي الصومام الكثيفة. وتظهر فيها أسماء بارزة كالشهيد العقيد عميروش وزيغود يوسف وعبان رمضان مستندين على قمم الجبال ومخططين لهيكلة الجيش وتوزيع المهام العسكرية الحاسمة.',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&fit=crop',
    file_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80',
    year: '1956',
    region_id: 'DZ-15',
    source: 'مجلة المجاهد المطبوعة بتونس والمنبثقة من وزارة الإعلام الجزائرية المؤقتة',
    tags: ['الصومام', 'رجال الثورة', 'قبائل جرجرة', 'الشهيد عميروش'],
    views: 4620,
    downloads: 1200,
    status: 'approved',
    created_at: '2026-06-06T11:20:00Z'
  },
  {
    id: 'lib-7',
    title: 'بطلات الفداء والتمريض لجيش التحرير في ساحات المعارك',
    description: 'صورة توثق تضامن وبطولة حرائر الجزائر في سفوح الأوراس ومخابئ جبل شلية الشاهقة. نرى فيها الممرضات المتطوعات وهن يقمن بتقديم العلاج والإنقاذ العاجل للمجاهدين المصابين بنيران وبطائرات الاستعمار البغيض بالرغم من الحصار الشامل وقلة المؤن الطبية.',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&fit=crop',
    file_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80',
    year: '1957',
    region_id: 'DZ-05',
    source: 'أرشيف صوري خاص لعائلات فدائيات الأوراس',
    tags: ['ممرضات الثورة', 'الأوراس', 'الفداء النسائي', 'مخابئ الجبال'],
    views: 5930,
    downloads: 1670,
    status: 'approved',
    created_at: '2026-06-07T16:45:00Z'
  },
  {
    id: 'lib-8',
    title: 'صوت الإعلان والافتتاح التاريخي لبث إذاعة صوت الجزائر الأبية',
    description: 'التسجيل النادر والفريد الذي هز وجدان فرنسا وعملاءها، بالمنبر الصادح العالي "صوت الجزائر الحرة المكافحة، صوت جبهة التحرير الوطني يوجه خطابه إليكم من قلب الميدان الباسل..."، والذي تم بثه عبر محطات متنقلة وشريكة لإسماع صوت قضيتنا لفرنسا والدول الكبرى ودحض مزاعم الاستعمار.',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?q=80&w=400&fit=crop',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    year: '1956',
    region_id: 'DZ-31',
    source: 'مؤسسة الإذاعة والتراكم الصوتي العام للدولة الجزائرية',
    tags: ['الإذاعة السرية', 'صوت الجزائر المكافحة', 'تعبئة الجماهير', 'أصوات الثورة'],
    views: 9120,
    downloads: 4210,
    status: 'approved',
    created_at: '2026-06-08T08:00:00Z',
    duration: '03:45'
  },
  {
    id: 'lib-9',
    title: 'نشيد قسماً الوطني الخالد باللحن العسكري الحماسي الأول',
    description: 'النشيد السيمفوني الذي جسده عمراء الثورة الكبار بألحان الموسيقار المصري العبقري محمد فوزي، المأخوذ عن الأشعار الصارخة الحية التي كتبها شاعر المليون ونصف المليون شهيد مفدي زكريا بدمائه على لوحة وعماد سجن سركاجي الرهيب رداً على غطرسة المستعمر.',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&fit=crop',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    year: '1955',
    region_id: 'DZ-16',
    source: 'الأرشيف الصوتي التاريخي لجبهة التحرير الوطني',
    tags: ['النشيد الوطني', 'قسماً', 'مفدي زكريا', 'سجن سركاجي'],
    views: 11450,
    downloads: 6920,
    status: 'approved',
    created_at: '2026-06-09T09:30:00Z',
    duration: '02:24'
  },
  {
    id: 'lib-10',
    title: 'خطاب هواري بومدين الحماسي على خط الحدود العتيد',
    description: 'الخطاب النادر الصادح الموجه لصفوف إطارات وقادة فيلق جيش التحرير المرابط في خطي شال وموريس المكهربين والمفخخين. يدعوهم فيه لمواصلة الضغط العسكري الصارم والإبقاء على فوهات البنادق مشتعلة صيانة للحقوق وحماية للشعب ضد مكائد الانشقاق والدعايات الفرنسية المغرضة.',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=400&fit=crop',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    year: '1960',
    region_id: 'DZ-05',
    source: 'الأرشيف السمعي البصري لمديرية الإيصال بوزارة الدفاع الوطني',
    tags: ['خطابات قتالية', 'الرئيس بومدين', 'جيش التحرير', 'خط شال وموريس'],
    views: 6510,
    downloads: 1840,
    status: 'approved',
    created_at: '2026-06-10T10:15:00Z',
    duration: '05:12'
  }
];
