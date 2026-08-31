import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { supabase, hasSupabaseCreds, localDb } from '/lib/supabase';
import { wilayas as defaultWilayas } from '../data/wilayas';

// Import Custom Admin Subcomponents
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import StatsCards from '../components/admin/StatsCards';
import ContributionsTable from '../components/admin/ContributionsTable';
import CharacterManager from '../components/admin/CharacterManager';
import BattleManager from '../components/admin/BattleManager';
import ArchiveManager from '../components/admin/ArchiveManager';
import WilayaManager from '../components/admin/WilayaManager';
import UsersManager from '../components/admin/UsersManager';
import SupabaseConsole from '../components/admin/SupabaseConsole';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // User metadata from session
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // States for registries collections
  const [characters, setCharacters] = useState<any[]>([]);
  const [battles, setBattles] = useState<any[]>([]);
  const [archives, setArchives] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [wilayaData, setWilayaData] = useState<any[]>([]);

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    const storedEmail = localStorage.getItem('admin_email');
    const storedRole = localStorage.getItem('admin_role');

    if (!token || !storedEmail) {
      navigate('/admin/login');
      return;
    }

    try {
      if (hasSupabaseCreds && supabase) {
        // Real Supabase Check
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          localStorage.clear();
          navigate('/admin/login');
          return;
        }

        const { data: adminUser, error: dbError } = await supabase
          .from('admins')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (dbError || !adminUser) {
          setAuthorized(false);
          setLoading(false);
          return;
        }

        setRole(adminUser.role);
        setEmail(session.user.email || '');
      } else {
        // Local Sandbox credentials check
        const allowedAdmins = localDb.admins.list();
        const found = allowedAdmins.find((a: any) => a.email.toLowerCase() === storedEmail.toLowerCase());

        if (!found) {
          setAuthorized(false);
          setLoading(false);
          return;
        }

        setRole(found.role);
        setEmail(found.email);
      }

      setAuthorized(true);
      // Fill collections
      loadData();
    } catch (err) {
      console.error(err);
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

         const loadData = async () => {
  setIsRefreshing(true);

  // CHARACTERS
  if (hasSupabaseCreds && supabase) {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('ERROR loading characters:', error);
      setCharacters([]);
    } else {
      console.log('CHARACTERS FROM SUPABASE:', data);
      console.log('CHARACTERS COUNT:', data?.length ?? 0);
      setCharacters(data || []);
    }
  } else {
    const localCharacters = localDb.characters.list();
    console.log('CHARACTERS FROM LOCAL DB:', localCharacters);
    setCharacters(localCharacters);
  }

  
    // BATTLES
     
if (hasSupabaseCreds && supabase) {
  const { data, error } = await supabase
    .from('battles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading battles from Supabase:', error);
    setBattles([]);
  } else {
    console.log('Battles loaded from Supabase:', data);
    setBattles(data || []);
  }
} else {
  setBattles(localDb.battles.list());
}
  // ARCHIVES
if (hasSupabaseCreds && supabase) {
  const { data, error } = await supabase
    .from('digital_library')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading digital library:', error);
    setArchives([]);
  } else {
    const mappedArchives = (data || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      caption: item.description || '',
      type: item.type,
      url:
        item.image_url ||
        item.file_url ||
        item.audio_url ||
        item.thumbnail ||
        '',
      description: item.description || '',
      created_at: item.created_at,

      source: item.source,
      year: item.year,
      regionId: item.region_id,
      periodId: item.period_id,
      tags: item.tags,
      featured: item.featured,
      pages: item.pages,
      duration: item.duration,
      fileSize: item.file_size,
      status: item.status,

      thumbnail: item.thumbnail,
      file_url: item.file_url,
      image_url: item.image_url,
      audio_url: item.audio_url
    }));

    setArchives(mappedArchives);
  }
} else {
  setArchives(localDb.archives.list());
}

  // CONTRIBUTIONS
  setContributions(localDb.contributions.list());

  // ADMINS
  setAdmins(localDb.admins.list());

  // WILAYAS
  const localWilayas = localStorage.getItem('sandbox_edited_wilayas');

  if (localWilayas) {
    setWilayaData(JSON.parse(localWilayas));
  } else {
    localStorage.setItem(
      'sandbox_edited_wilayas',
      JSON.stringify(defaultWilayas)
    );
    setWilayaData(defaultWilayas);
  }

  setTimeout(() => {
    setIsRefreshing(false);
  }, 600);
};
 
  const handleLogout = async () => {
    if (hasSupabaseCreds && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.clear();
    navigate('/admin/login');
  };

  // CHARACTERS HANDLERS
  const handleAddCharacter = async (char: any) => {
  if (hasSupabaseCreds && supabase) {
    const { data, error } = await supabase
      .from('characters')
      .insert([
  {
    ...char,
    status: 'approved'
  }
])
      .select()
      .single();

    if (error) {
      console.error('Error adding character:', error);
      return;
    }

    console.log('Character added to Supabase:', data);
  } else {
    localDb.characters.add(char);
  }

  await loadData();
};

const handleUpdateCharacter = async (id: string, updates: any) => {
  if (hasSupabaseCreds && supabase) {
    const { data, error } = await supabase
      .from('characters')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating character:', error);
      return;
    }

    console.log('Character updated in Supabase:', data);
  } else {
    localDb.characters.update(id, updates);
  }

  await loadData();
};

const handleDeleteCharacter = async (id: string) => {
  if (hasSupabaseCreds && supabase) {
    const { error } = await supabase
      .from('characters')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting character:', error);
      return;
    }

    console.log('Character deleted from Supabase:', id);
  } else {
    localDb.characters.delete(id);
  }

  await loadData();
};

  // BATTLES HANDLERS
    const handleAddBattle = async (battle: any) => {
  console.log('BATTLE RECEIVED:', battle);

  if (hasSupabaseCreds && supabase) {
    const { data, error } = await supabase
      .from('battles')
      .insert({
        title: battle.title,
        year: battle.year,
        region_id: battle.region_id,
        description: battle.description,
        status: battle.status || 'approved',
        image: battle.image || null,
        sources: battle.sources || [],
        details: battle.details || [],
        related_battles: battle.related_battles || [],
        hero_image: battle.hero_image || null ,
        event_type: battle.event_type || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding battle:', error);
      alert(`فشل إضافة المعركة:\n${error.message}`);
      return;
    }

    console.log('Battle added to Supabase:', data);
  } else {
    localDb.battles.add(battle);
  }

  await loadData();
};  

   const handleUpdateBattle = async (id: string, updates: any) => {
  if (hasSupabaseCreds && supabase) {
    const supabaseUpdates = {
      ...updates,
      ...(updates.region_id !== undefined && {
        region_id: updates.region_id
      })
    };

    delete supabaseUpdates.region_id;

    const { data, error } = await supabase
      .from('battles')
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating battle:', error);
      return;
    }

    console.log('Battle updated in Supabase:', data);
  } else {
    localDb.battles.update(id, updates);
  }

  await loadData();
};


const handleDeleteBattle = async (id: string) => {
  if (hasSupabaseCreds && supabase) {
    const { error } = await supabase
      .from('battles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting battle:', error);
      return;
    }

    console.log('Battle deleted from Supabase:', id);
  } else {
    localDb.battles.delete(id);
  }

  await loadData();
};

// ARCHIVE HANDLERS
const handleAddArchive = async (item: any) => {
  try {
    if (!hasSupabaseCreds || !supabase) {
      console.error("Supabase غير متاح");
      return;
    }

    const file = item.file;

    if (!file) {
      alert("لم يتم اختيار ملف");
      return;
    }

    // تحديد الـ bucket حسب نوع الملف
    let bucket = "";

    if (item.type === "photo") {
      bucket = "library-images";
    } else if (item.type === "document") {
      bucket = "library-pdfs";
    } else if (item.type === "audio") {
      bucket = "library-audios";
    } else {
      alert("نوع الملف غير معروف");
      return;
    }

    // اسم فريد للملف
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const filePath = `${fileName}`;

    console.log("Uploading:", {
      bucket,
      filePath,
      type:
  item.type === 'image'
    ? 'photo'
    : item.type === 'pdf'
    ? 'document'
    : 'audio',
      file
    });

    // رفع الملف إلى Storage
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      alert(`فشل رفع الملف: ${uploadError.message}`);
      return;
    }

    // الحصول على الرابط العام
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    console.log("Public URL:", publicUrl);

    // تحديد العمود المناسب للرابط
    let file_url = null;
    let image_url = null;
    let audio_url = null;

    if (item.type === "photo") {
      image_url = publicUrl;
    }

    if (item.type === "document") {
      file_url = publicUrl;
    }

    if (item.type === "audio") {
      audio_url = publicUrl;
    }

    // إضافة السجل إلى digital_library
    const { data, error } = await supabase
      .from("digital_library")
      .insert([
        {
          title: item.title,
          description: item.description || null,
          type:
  item.type === 'photo'
    ? 'image'
    : item.type === 'document'
    ? 'pdf'
    : 'audio',
          source: item.source || null,
          year: item.year || null,
          region_id: item.regionId || null,
          period_id: item.periodId || null,

          thumbnail: image_url || file_url || audio_url,

          file_url,
          image_url,
          audio_url,

          file_size: file.size,
          duration: item.duration || null,
          pages: item.pages || null,

          views: 0,
          downloads: 0,

          tags: item.tags
            ? item.tags
                .split(",")
                .map((tag: string) => tag.trim())
                .filter(Boolean)
            : [],

          featured: item.featured || false,
          status: item.status || "approved"
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);

      // إذا فشل إدخال قاعدة البيانات نحاول حذف الملف الذي رفعناه
      await supabase.storage
        .from(bucket)
        .remove([filePath]);

      alert(`فشل حفظ السجل: ${error.message}`);
      return;
    }

    console.log("Archive added successfully:", data);

    // إعادة تحميل البيانات
    await loadData();

    alert("تمت إضافة الملف إلى المكتبة الرقمية بنجاح");

  } catch (error) {
    console.error("Unexpected archive error:", error);
    alert("حدث خطأ غير متوقع أثناء إضافة الملف");
  }
};

const handleUpdateArchive = async (id: string, updates: any) => {
  if (hasSupabaseCreds && supabase) {
    const { data, error } = await supabase
      .from('digital_library')
      .update({
        title: updates.title,
        description: updates.description || null,
        type: updates.type,
        source: updates.source || null,
        year: updates.year || null,
        region_id: updates.regionId || null,
        period_id: updates.periodId || null,

        thumbnail: updates.thumbnail || null,
        file_url: updates.file_url || null,
        image_url: updates.image_url || null,
        audio_url: updates.audio_url || null,

        file_size: updates.fileSize || null,
        duration: updates.duration || null,
        pages: updates.pages || null,

        tags: updates.tags || [],
        featured: updates.featured || false,
        status: updates.status || 'approved'
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating archive:', error);
      return;
    }

    console.log('Archive updated in Supabase:', data);
  } else {
    localDb.archives.update(id, updates);
  }

  await loadData();
};


const handleDeleteArchive = async (id: string) => {
  if (hasSupabaseCreds && supabase) {
    const { error } = await supabase
      .from('digital_library')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting archive:', error);
      return;
    }

    console.log('Archive deleted from Supabase:', id);
  } else {
    localDb.archives.delete(id);
  }

  await loadData();
};

  // VISITOR CONTRIBUTIONS ACTION TRIGGER
  const handleContributionAction = (id: string, action: 'app' | 'rej') => {
    const status = action === 'app' ? 'approved' : 'rejected';
    localDb.contributions.updateStatus(id, status);

    // If approved, dynamically register this into core characters or archives database!
    if (action === 'app') {
      const contr = contributions.find(c => c.id === id);
      if (contr) {
        if (contr.type === 'story') {
          localDb.characters.add({
            name: contr.submitter_name,
            role: contr.title,
            biography: contr.content,
            image: contr.file_url || ''
          });
        } else if (contr.type === 'photo' || contr.type === 'document') {
          localDb.archives.add({
            title: contr.title,
            caption: `مساهمة معتمدة من ${contr.submitter_name}`,
            type: contr.type,
            url: contr.file_url || 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80',
            description: contr.content
          });
        }
      }
    }

    loadData();
  };

  // WILAYAS DATA MODIFIER
  const handleUpdateWilaya = async (id: string, updates: any) => {
    const updated = wilayaData.map(w => {
      if (w.id === id) {
        return { ...w, ...updates };
      }
      return w;
    });
    setWilayaData(updated);
    localStorage.setItem('sandbox_edited_wilayas', JSON.stringify(updated));
    // Trigger window event so other public pages in the same run update automatically
    window.dispatchEvent(new Event('storage_wilayas_updated'));

    // Attempt to update Supabase wilayas table if connected
    if (hasSupabaseCreds && supabase) {
      try {
        await supabase
          .from('wilayas')
          .upsert({
            id,
            ...updates,
            updated_at: new Date().toISOString()
          });
      } catch (err) {
        console.warn('Supabase wilayas upsert notice (table may not exist yet):', err);
      }
    }
  };

  // ADMISSIONS/USERS HANDLERS
  const handleAddAdmin = (admin: any) => {
    localDb.admins.add(admin);
    loadData();
  };

  const handleDeleteAdmin = (id: string) => {
    localDb.admins.delete(id);
    loadData();
  };

  // Statistics Calculation
  const getStats = () => {
    return {
      charactersCount: characters.length,
      battlesCount: battles.length,
      archivesCount: archives.length,
      contributionsCount: contributions.length,
      pendingReviewsCount: contributions.filter(c => c.status === 'pending').length
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-[#e5e5e5]" dir="rtl">
        <Loader2 className="animate-spin text-[#c6a66b] mb-4" size={40} />
        <p className="text-sm font-bold text-gray-500 font-mono tracking-widest uppercase">SECURE ARCHIVE RETRIEVING...</p>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-[#e5e5e5]" dir="rtl">
        <div className="bg-[#0b0b0b] border border-red-500/30 p-8 rounded-3xl max-w-lg text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">ليس لديك صلاحية الوصول</h2>
            <p className="text-sm text-gray-400 leading-relaxed font-bold">
              عذراً، هذا الحساب غير معتمد في لوحة تحكم الأرشيف الوطني بوزارة المجاهدين. يرجى مراجعة المطور أو مدير النظام لتسجيل بريدك الإلكتروني.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3.5 bg-red-500 hover:bg-red-600 font-bold text-white rounded-xl text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer transition-all"
          >
            <LogOut size={14} />
            <span>تسجيل الخروج والرجوع</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] flex" dir="rtl">
      {/* 1. Sidebar Panel (Pinned Right for RTL) */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={role} 
        email={email}
        onLogout={handleLogout} 
      />

      {/* 2. Main Desk Panel (Left side) */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Topbar 
          activeTab={activeTab} 
          onRefresh={loadData} 
          isRefreshing={isRefreshing} 
        />

        <main className="flex-1 p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* RENDER STATS SUMMARY ONLY ON SELECTED TAB */}
          {activeTab === 'stats' && (
            <div className="space-y-8">
              <StatsCards stats={getStats()} />

              {/* Recent Pending Contributions Review Section on Overview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-sm font-black text-white flex items-center gap-2">
                    المراجعات العاجلة المعلقة
                    {getStats().pendingReviewsCount > 0 && (
                      <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
                    )}
                  </span>
                  <button 
                    onClick={() => setActiveTab('contributions')} 
                    className="text-xs text-[#c6a66b] hover:text-white transition-colors font-bold"
                  >
                    استعراض جميع المراجعات &larr;
                  </button>
                </div>
                
                <ContributionsTable 
                  contributions={contributions} 
                  onAction={handleContributionAction} 
                  role={role} 
                />
              </div>

              {/* Informative Dashboard Guide */}
              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between gap-6">
                <div className="text-right space-y-1 max-w-2xl">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <Sparkles size={14} className="text-[#c6a66b]" />
                    سير العمليات والاعتمادات المؤرشفة
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-bold">
                    لوحة الإدارة تمكّن الهيئات من الحفاظ على صدق المرويات واستبعاد المغالطات. يمكنك بسهولة تعديل الولايات التي تغذي الخرائط ومقاييس الأعداد، وسيعاد استعراضها فورياً في كافة أقسام المنصة ومداشرها.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC TAB MANAGER RENDER */}
          {activeTab === 'characters' && (
            <CharacterManager 
              characters={characters} 
              onAdd={handleAddCharacter} 
              onUpdate={handleUpdateCharacter} 
              onDelete={handleDeleteCharacter} 
            />
          )}

          {activeTab === 'battles' && (
            <BattleManager 
              battles={battles} 
              onAdd={handleAddBattle} 
              onUpdate={handleUpdateBattle} 
              onDelete={handleDeleteBattle} 
            />
          )}

          {activeTab === 'archives' && (
            <ArchiveManager 
              archives={archives} 
              onAdd={handleAddArchive} 
              onUpdate={handleUpdateArchive} 
              onDelete={handleDeleteArchive} 
            />
          )}

          {activeTab === 'wilayas' && (
            <WilayaManager 
              wilayas={wilayaData} 
              onUpdateWilaya={handleUpdateWilaya} 
            />
          )}

          {activeTab === 'contributions' && (
            <ContributionsTable 
              contributions={contributions} 
              onAction={handleContributionAction} 
              role={role} 
            />
          )}

          {activeTab === 'admins' && (
            <UsersManager 
              admins={admins} 
              onAddAdmin={handleAddAdmin} 
              onDeleteAdmin={handleDeleteAdmin} 
              currentUserEmail={email} 
            />
          )}

          {activeTab === 'supabase' && (
            <SupabaseConsole />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
