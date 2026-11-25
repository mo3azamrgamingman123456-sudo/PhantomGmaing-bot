 "use client";
import { useMemo, useState } from "react";
import { Activity, Bot, CircleHelp, CloudUpload, Cpu, HardDrive, LayoutDashboard, LifeBuoy, LogOut, Plus, Power, RefreshCw, Search, Settings, ShieldCheck, Terminal, Trash2, X } from "lucide-react";

type Project = { id: number; name: string; runtime: string; status: "متوقف" | "يعمل"; updated: string; };
const initial: Project[] = [
  { id: 1, name: "Credit Bot", runtime: "Node.js", status: "متوقف", updated: "اليوم" },
  { id: 2, name: "Giveaway Bot", runtime: "Python", status: "متوقف", updated: "أمس" }
];
export default function Dashboard() {
  const [projects, setProjects] = useState(initial);
  const [active, setActive] = useState(1);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [runtime, setRuntime] = useState("Node.js");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("دي نسخة واجهة تجريبية؛ أزرار التشغيل لا تشغّل بوتات حقيقية حتى ربط خادم التشغيل.");
  const selected = projects.find(p => p.id === active) ?? projects[0];
  const filtered = useMemo(() => projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase())), [projects, search]);
  function createProject() {
    if (!name.trim()) return;
    const item = { id: Date.now(), name: name.trim(), runtime, status: "متوقف" as const, updated: "الآن" };
    setProjects(prev => [...prev, item]); setActive(item.id); setName(""); setModal(false);
    setNotice("تم إنشاء بطاقة المشروع محليًا في المعاينة. لم يتم رفع الملفات إلى خادم بعد.");
  }
  function changeStatus() {
    if (!selected) return;
    setProjects(prev => prev.map(p => p.id === selected.id ? { ...p, status: p.status === "يعمل" ? "متوقف" : "يعمل" } : p));
    setNotice("تغيير الحالة تجريبي داخل الواجهة فقط، وليس تشغيلًا فعليًا للبوت.");
  }
  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Bot size={23}/></div><div><b>PHANTOM</b><small>BOT HOSTING</small></div></div>
      <div className="side-label">القائمة الرئيسية</div>
      <a className="nav active"><LayoutDashboard size={18}/> لوحة التحكم</a>
      <a className="nav" onClick={() => setNotice("إدارة الملفات هتتفعل بعد ربط التخزين.")}><HardDrive size={18}/> الملفات</a>
      <a className="nav" onClick={() => setNotice("سجلات التشغيل هتظهر بعد ربط خادم التشغيل.")}><Terminal size={18}/> سجلات التشغيل</a>
      <a className="nav" onClick={() => setNotice("الإعدادات هتتفعل في مرحلة الحسابات.")}><Settings size={18}/> الإعدادات</a>
      <div className="side-bottom"><div className="help-card"><LifeBuoy size={20}/><b>محتاج مساعدة؟</b><span>مركز المساعدة قريبًا</span></div><a className="nav"><CircleHelp size={18}/> الدعم الفني</a><a className="nav"><LogOut size={18}/> تسجيل الخروج</a></div>
      <div className="version">PHANTOMGMAING-BOT <span>v1.0</span></div>
    </aside>
    <section className="main">
      <header className="topbar"><div><span className="eyebrow">مساحة العمل /</span><b> لوحة التحكم</b></div><div className="top-actions"><span className="status-pill"><i/> النظام التجريبي</span><div className="avatar">P</div></div></header>
      <div className="content">
        <div className="welcome"><div><div className="eyebrow">مساء الخير 👋</div><h1>إدارة بوتاتك من مكان واحد</h1><p>ارفع مشاريع Discord bots، وتابع حالتها وتحكم فيها بسهولة.</p></div><button className="primary" onClick={() => setModal(true)}><Plus size={18}/> مشروع جديد</button></div>
        <div className="notice"><ShieldCheck size={18}/><span>{notice}</span><button onClick={() => setNotice("دي نسخة واجهة تجريبية؛ أزرار التشغيل لا تشغّل بوتات حقيقية حتى ربط خادم التشغيل.")} aria-label="إغلاق"><X size={16}/></button></div>
        <div className="stats">
          <div className="stat"><div className="stat-icon purple"><Bot/></div><span>إجمالي المشاريع</span><strong>{projects.length}</strong><small>مشاريع في حسابك</small></div>
          <div className="stat"><div className="stat-icon green"><Activity/></div><span>بوتات تعمل</span><strong>{projects.filter(p=>p.status==="يعمل").length}</strong><small>حالة تجريبية</small></div>
          <div className="stat"><div className="stat-icon blue"><Cpu/></div><span>استهلاك المعالج</span><strong>—</strong><small>يتاح بعد ربط الخادم</small></div>
          <div className="stat"><div className="stat-icon orange"><HardDrive/></div><span>مساحة التخزين</span><strong>—</strong><small>يتاح بعد ربط التخزين</small></div>
        </div>
        <div className="section-head"><div><h2>مشاريع البوتات</h2><p>إدارة وتشغيل مشاريعك</p></div><div className="search"><Search size={17}/><input placeholder="ابحث عن بوت..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
        <div className="projects">
          {filtered.map(project=><article key={project.id} className={`project ${active===project.id?"selected":""}`} onClick={()=>setActive(project.id)}>
            <div className="project-top"><div className="bot-icon"><Bot size={22}/></div><span className={`state ${project.status==="يعمل"?"running":""}`}><i/>{project.status}</span></div>
            <h3>{project.name}</h3><p>{project.runtime} · Discord Bot</p>
            <div className="project-foot"><span>آخر تحديث: {project.updated}</span><button className="more" onClick={e=>{e.stopPropagation();setActive(project.id);setNotice("تم تحديد المشروع. أدوات الإدارة التفصيلية قيد التجهيز.")}}>•••</button></div>
          </article>)}
          <button className="add-card" onClick={()=>setModal(true)}><span><Plus size={23}/></span><b>إضافة مشروع جديد</b><small>ابدأ برفع ملفات البوت</small></button>
        </div>
        <div className="section-head lower"><div><h2>إدارة المشروع</h2><p>{selected ? `إعدادات ${selected.name}` : "اختر مشروعًا من القائمة"}</p></div></div>
        {selected && <div className="manage">
          <div className="manage-info"><div className="bot-icon large"><Bot size={25}/></div><div><b>{selected.name}</b><span>{selected.runtime} · مشروع استضافة</span></div><span className={`state ${selected.status==="يعمل"?"running":""}`}><i/>{selected.status}</span></div>
          <div className="manage-actions"><button className="action" onClick={changeStatus}><Power size={17}/>{selected.status==="يعمل"?"إيقاف":"تشغيل"}</button><button className="action" onClick={()=>setNotice("إعادة التشغيل ستعمل بعد ربط خادم التشغيل الحقيقي.")}><RefreshCw size={17}/> إعادة تشغيل</button><button className="action" onClick={()=>setNotice("سجلات البوت ستظهر بعد ربط خادم التشغيل.")}><Terminal size={17}/> السجلات</button><button className="action danger" onClick={()=>{setProjects(prev=>prev.filter(p=>p.id!==selected.id));setActive(projects.find(p=>p.id!==selected.id)?.id ?? 0);setNotice("حُذفت البطاقة من المعاينة فقط.")}}><Trash2 size={17}/> حذف</button></div>
        </div>}
        <footer>© 2026 PhantomGmaing-bot <span>منصة استضافة بوتات Discord</span></footer>
      </div>
    </section>
    {modal && <div className="overlay" onClick={()=>setModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><h2>إنشاء مشروع جديد</h2><p>جهّز مشروع البوت لإضافته إلى لوحة التحكم</p></div><button onClick={()=>setModal(false)}><X/></button></div>
      <label>اسم المشروع</label><input className="field" placeholder="مثال: My Discord Bot" value={name} onChange={e=>setName(e.target.value)}/>
      <label>لغة التشغيل</label><select className="field" value={runtime} onChange={e=>setRuntime(e.target.value)}><option>Node.js</option><option>Python</option><option>Java</option><option> أخرى (تُحدد لاحقًا)</option></select>
      <div className="upload"><CloudUpload size={27}/><b>رفع ملفات المشروع</b><span>رفع ZIP سيكون متاحًا بعد ربط التخزين</span></div>
      <div className="modal-actions"><button className="secondary" onClick={()=>setModal(false)}>إلغاء</button><button className="primary" onClick={createProject}>إنشاء المشروع</button></div>
    </div></div>}
  </main>;
}