import { createClient } from "@supabase/supabase-js";

// Detect if Supabase configurations are present
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;



const isValidHttpUrl = (url: any): boolean => {
  if (typeof url !== "string") return false;
  const trimmed = url.trim();
  return trimmed.startsWith("http://") || trimmed.startsWith("https://");
};

export const hasSupabaseCreds = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  isValidHttpUrl(supabaseUrl) &&
  supabaseAnonKey.trim() !== ""
);



(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);


export const supabase = hasSupabaseCreds
  ? createClient(
      supabaseUrl.trim(),
      supabaseAnonKey.trim()
    )
  : null;

// Initial Mock Datasets for the Educational Local Sandbox
const INITIAL_ADMINS = [
  { id: 'admin-1', email: 'rahimelchikour@gmail.com', role: 'super_admin', created_at: new Date().toISOString() },
  { id: 'admin-2', email: 'rahim@example.com', role: 'super_admin', created_at: new Date().toISOString() },
  { id: 'admin-3', email: 'editor@shaheed.dz', role: 'editor', created_at: new Date().toISOString() },
  { id: 'admin-4', email: 'reviewer@shaheed.dz', role: 'reviewer', created_at: new Date().toISOString() }
];

const INITIAL_CHARACTERS = [
  {
    id: 'char-1',
    name: 'العربي بن مهيدي',
    role: 'حكيم الثورة وعضو لجنة التنسيق والتنفيذ',
    biography: 'من أبرز قادة الثورة التحريرية، قاد معركة الجزائر التاريخية بكل حكمة. اشتهر بمقولته الأسطورية: "ألقوا بالثورة إلى الشارع سيحتضنها الشعب". اغتيل تحت التعذيب رافضاً الإدلاء بأي سر ومات مبتسماً كالبطل الخالد.',
    image: 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80&w=400&h=600&fit=crop',
    status: 'approved',
    created_at: new Date().toISOString()
  },
  {
    id: 'char-2',
    name: 'حسيبة بن بوعلي',
    role: 'أيقونة النضال النسوي الجزائري في القصبة',
    biography: 'انخرطت في صفوف الفدائيين في ورش عمل صنع القنابل بالقصبة. رفضت الاستسلام وفضلت الاستشهاد تحت أنقاض المنزل المفجر في أزقة القصبة العتيقة رفقة علي لابوانت وعمر الصغير.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=600&fit=crop',
    status: 'approved',
    created_at: new Date().toISOString()
  },
  {
    id: 'char-3',
    name: 'مصطفى بن بولعيد',
    role: 'أب الثورة وقائد المنطقة العسكرية الأولى (الأوراس)',
    biography: 'مهندس انطلاق أول رصاصة مجيدة، ونقطة الارتكاز المالي والعسكري للثورة. اتسم بروح قيادية منقطعة النظير ونبل أخلاق شهد له بها الأعداء قبل الرفقاء.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=600&fit=crop',
    status: 'approved',
    created_at: new Date().toISOString()
  }
];

const INITIAL_BATTLES = [
  {
    id: 'battle-1',
    title: 'معركة معقل الجرف الكبرى',
    year: '1955',
    regionId: 'DZ-05',
    description: 'ملحمة كبرى قادها مجاهدو الأوراس دامت عدة أيام كبدت العدو الفرنسي خسائر فادحة في الأنفس والعتاد الحربي، وهدمت أسطورة تفوقه العددي.',
    status: 'approved',
    created_at: new Date().toISOString()
  },
  {
    id: 'battle-2',
    title: 'هجمات الشمال القسنطيني',
    year: '1955',
    regionId: 'DZ-25',
    description: 'أكبر هجوم عسكري منظم فك الحصار المفروض على منطقة الأوراس، تدارس شمولية الثورة وأثبت التفاف الشعب حول جيش التحرير.',
    status: 'approved',
    created_at: new Date().toISOString()
  },
  {
    id: 'battle-3',
    title: 'معركة الجزائر (القصبة)',
    year: '1957',
    regionId: 'DZ-16',
    description: 'حرب عصابات حضرية طاحنة بين الفدائيين الأحرار وقوات النخبة والمظليين للجنرال ماسو، دولّت القضية الجزائرية عالمياً.',
    status: 'approved',
    created_at: new Date().toISOString()
  }
];

const INITIAL_ARCHIVES = [
  {
    id: 'arc-1',
    title: 'بيان أول نوفمبر التاريخي',
    caption: 'النسخة الأصلية لنداء الثورة الأول الموزع سرياً ليلة تفجير الكفاح المسلح.',
    type: 'document',
    url: 'https://preview.redd.it/0l8pbyg90ax51.jpg?width=640&crop=smart&auto=webp&s=cb5404bd0e6c6fecc4ae19391ab1057e62d46e3d',
    description: 'مستند أرشيفي نادر يحدد معالم ومخرجات الثورة التحريرية التأسيسية وأسس جبهة التحرير الوطني.',
    status: 'approved',
    created_at: new Date().toISOString()
  },
  {
    id: 'arc-2',
    title: 'مجموعة مجاهدين في الأوراس',
    caption: 'صورة نادية لأولى المجموعات العسكرية الضاربة في الجبال الصخرية.',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80&w=800&fit=crop',
    description: 'رعيل ثوري يمثل تضامن وترابط المقاتلين الجزائريين في قلب الغابات والأودية الصعب اختراقها.',
    status: 'approved',
    created_at: new Date().toISOString()
  }
];

const INITIAL_CONTRIBUTIONS = [
  {
    id: 'contrib-1',
    title: 'صورة نادرة للشهيد العقيد عميروش في جرجرة',
    content: 'أود المساهمة بهذه الصورة الأرشيفية للشهيد الرمز وهو يخطط لعملية تكتيكية مع جنوده في جبال القبائل الشامخة عام 1958.',
    type: 'photo',
    submitter_name: 'أحمد بن يسعد',
    submitter_email: 'ahmed.y@archive.dz',
    file_url: 'https://picsum.photos/seed/kab1/1000/800?grayscale',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString() // 5 hours ago
  },
  {
    id: 'contrib-2',
    title: 'رسالة نادرة مرسلة لديدوش مراد قبل استشهاده',
    content: 'وثيقة مكتوبة بخط اليد تعود لديسمبر 1954 للتنسيق العسكري والتمويني في منطقة الشمال القسنطيني.',
    type: 'document',
    submitter_name: 'نادية بلقاسمي',
    submitter_email: 'nadia.b@revolution.dz',
    file_url: 'https://picsum.photos/seed/const1/800/600?grayscale',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
  },
  {
    id: 'contrib-3',
    title: 'شهادة حية مسجلة لبطلة التمريض يمينة بوعتورة',
    content: 'تسجيل نادر يحكي كيفية إسعاف الجرحى الفدائيين في الغابات والمغارات المعزولة تحت القصف.',
    type: 'story',
    submitter_name: 'منير بوعتورة',
    submitter_email: 'mounir@history.dz',
    file_url: '',
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString() // 3 days ago
  }
];

const getLocalStorage = (key: string, initialData: any) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Local storage emulation bridge for sandbox
export const localDb = {
  admins: {
    list: () => getLocalStorage('sandbox_admins', INITIAL_ADMINS),
    add: (admin: any) => {
      const list = getLocalStorage('sandbox_admins', INITIAL_ADMINS);
      const newAdmin = { id: `admin-${Date.now()}`, created_at: new Date().toISOString(), ...admin };
      list.push(newAdmin);
      setLocalStorage('sandbox_admins', list);
      return newAdmin;
    },
    delete: (id: string) => {
      const list = getLocalStorage('sandbox_admins', INITIAL_ADMINS);
      const filtered = list.filter((a: any) => a.id !== id);
      setLocalStorage('sandbox_admins', filtered);
    },
    getByEmail: (email: string) => {
      const list = getLocalStorage('sandbox_admins', INITIAL_ADMINS);
      return list.find((a: any) => a.email.toLowerCase() === email.toLowerCase());
    }
  },
  characters: {
    list: () => getLocalStorage('sandbox_characters', INITIAL_CHARACTERS),
    add: (char: any) => {
      const list = getLocalStorage('sandbox_characters', INITIAL_CHARACTERS);
      const newChar = { id: `char-${Date.now()}`, created_at: new Date().toISOString(), ...char };
      list.push(newChar);
      setLocalStorage('sandbox_characters', list);
      return newChar;
    },
    update: (id: string, updates: any) => {
      const list = getLocalStorage('sandbox_characters', INITIAL_CHARACTERS);
      const index = list.findIndex((c: any) => c.id === id);
      if (index !== -1) {
        list[index] = { ...list[index], ...updates };
        setLocalStorage('sandbox_characters', list);
      }
    },
    delete: (id: string) => {
      const list = getLocalStorage('sandbox_characters', INITIAL_CHARACTERS);
      const filtered = list.filter((c: any) => c.id !== id);
      setLocalStorage('sandbox_characters', filtered);
    }
  },
  battles: {
    list: () => getLocalStorage('sandbox_battles', INITIAL_BATTLES),
    add: (battle: any) => {
      const list = getLocalStorage('sandbox_battles', INITIAL_BATTLES);
      const newBattle = { id: `battle-${Date.now()}`, created_at: new Date().toISOString(), ...battle };
      list.push(newBattle);
      setLocalStorage('sandbox_battles', list);
      return newBattle;
    },
    update: (id: string, updates: any) => {
      const list = getLocalStorage('sandbox_battles', INITIAL_BATTLES);
      const index = list.findIndex((b: any) => b.id === id);
      if (index !== -1) {
        list[index] = { ...list[index], ...updates };
        setLocalStorage('sandbox_battles', list);
      }
    },
    delete: (id: string) => {
      const list = getLocalStorage('sandbox_battles', INITIAL_BATTLES);
      const filtered = list.filter((b: any) => b.id !== id);
      setLocalStorage('sandbox_battles', filtered);
    }
  },
  archives: {
    list: () => getLocalStorage('sandbox_archives', INITIAL_ARCHIVES),
    add: (arc: any) => {
      const list = getLocalStorage('sandbox_archives', INITIAL_ARCHIVES);
      const newArc = { id: `arc-${Date.now()}`, created_at: new Date().toISOString(), ...arc };
      list.push(newArc);
      setLocalStorage('sandbox_archives', list);
      return newArc;
    },
    update: (id: string, updates: any) => {
      const list = getLocalStorage('sandbox_archives', INITIAL_ARCHIVES);
      const index = list.findIndex((a: any) => a.id === id);
      if (index !== -1) {
        list[index] = { ...list[index], ...updates };
        setLocalStorage('sandbox_archives', list);
      }
    },
    delete: (id: string) => {
      const list = getLocalStorage('sandbox_archives', INITIAL_ARCHIVES);
      const filtered = list.filter((a: any) => a.id !== id);
      setLocalStorage('sandbox_archives', filtered);
    }
  },
  contributions: {
    list: () => getLocalStorage('sandbox_contributions', INITIAL_CONTRIBUTIONS),
    add: (contrib: any) => {
      const list = getLocalStorage('sandbox_contributions', INITIAL_CONTRIBUTIONS);
      const newContrib = { id: `contrib-${Date.now()}`, created_at: new Date().toISOString(), status: 'pending', ...contrib };
      list.push(newContrib);
      setLocalStorage('sandbox_contributions', list);
      return newContrib;
    },
    updateStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => {
      const list = getLocalStorage('sandbox_contributions', INITIAL_CONTRIBUTIONS);
      const index = list.findIndex((c: any) => c.id === id);
      if (index !== -1) {
        list[index].status = status;
        setLocalStorage('sandbox_contributions', list);
      }
    }
  }
};

// Generates the SQL script to configure everything in real Supabase
export const DDL_SETUP_SCRIPT = `-- ==========================================
-- ذاكرة الجزائر: SUPABASE DDL SCHEMA & RBAC
-- Copy and run this in your Supabase SQL Editor
-- ==========================================

-- 1. Create Admins Table
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'editor', 'reviewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable RLS on Admins
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 2. Create Characters Table
CREATE TABLE IF NOT EXISTS public.characters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  biography TEXT NOT NULL,
  image TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Characters
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

-- 3. Create Battles Table
CREATE TABLE IF NOT EXISTS public.battles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  region_id TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Battles
ALTER TABLE public.battles ENABLE ROW LEVEL SECURITY;

-- 4. Create Archives Table
CREATE TABLE IF NOT EXISTS public.archives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('photo', 'document', 'audio')),
  url TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Archives
ALTER TABLE public.archives ENABLE ROW LEVEL SECURITY;

-- 5. Create Contributions Table
CREATE TABLE IF NOT EXISTS public.contributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('photo', 'document', 'story')),
  submitter_name TEXT NOT NULL,
  submitter_email TEXT NOT NULL,
  file_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Contributions
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;


-- ==================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==================================================

-- Core read helpers
CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql;

-- Admins Table Policies
CREATE POLICY "Super Admins can manage admins table" 
  ON public.admins FOR ALL 
  USING (
    EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Admins can view their own record" 
  ON public.admins FOR SELECT 
  USING (id = auth.uid());

-- Public tables READ-ONLY to world, modifying ONLY for staff
CREATE POLICY "Read approved characters" 
  ON public.characters FOR SELECT 
  USING (status = 'approved' OR public.is_admin());

CREATE POLICY "Manage characters" 
  ON public.characters FOR ALL 
  USING (
    EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

-- Battles Table Policies
CREATE POLICY "Read public battles" 
  ON public.battles FOR SELECT 
  USING (status = 'approved' OR public.is_admin());

CREATE POLICY "Manage battles" 
  ON public.battles FOR ALL 
  USING (
    EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

-- Archives Table Policies
CREATE POLICY "Read public archives" 
  ON public.archives FOR SELECT 
  USING (status = 'approved' OR public.is_admin());

CREATE POLICY "Manage archives" 
  ON public.archives FOR ALL 
  USING (
    EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

-- Contributions Tables Policies
CREATE POLICY "Admins can manage contributions" 
  ON public.contributions FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Anyone can submit contributions" 
  ON public.contributions FOR INSERT 
  WITH CHECK (true);


-- ==================================================
-- STORAGE CREATION (Please create storage buckets)
-- Buckets: characters, documents, archives, audio, maps
-- ==================================================
-- Make sure to set bucket public access and policies to allow reading for all 
-- and uploads/deletes only for authenticated admins!

-- INSERT INITIAL SUPER ADMIN
-- Note: Replace with actual auth.uid() if created via dashboard auth, 
-- or insert after user registers:
-- INSERT INTO public.admins (id, email, role) VALUES ('<USER_UUID>', 'rahimelchikour@gmail.com', 'super_admin');
`;

