import React from 'react';
import { useLearning } from '../context/LearningContext';
import { Layers, X, Users, Store, Bike, ShoppingBag, Radio, Shield, DollarSign, MapPin, Bell } from 'lucide-react';

export const SystemMapModal: React.FC = () => {
  const { isSystemMapOpen, setSystemMapOpen } = useLearning();

  if (!isSystemMapOpen) return null;

  const domains = [
    { name: 'تجربة العميل (Customer Experience)', icon: Users, desc: 'واجهة PWA/Mobile، البحث، الاستكشاف، السلة، التتبع الحي، والتقييمات' },
    { name: 'إدارة التجار (Merchant Management)', icon: Store, desc: 'فروع المتجر، القوائم، المخزون والتوافر، ساعات العمل، والأداء' },
    { name: 'الأسطول والكبائن (Driver & Fleet Ops)', icon: Bike, desc: 'توافر الكباتن، تتبع ورديات العمل، الملاحة، وحالة المعدات' },
    { name: 'المحرك والدورة الحياتية (Ordering & FSM)', icon: ShoppingBag, desc: 'دورة الطلب غير الـ CRUD، محرك الحالات FSM، الشروط المسبقة، والإلغاء' },
    { name: 'المطابقة والـ Dispatch Engine', icon: Radio, desc: 'تصفية المرشحين، النقاط، الترتيب متعدد العوامل، وتوليد العروض الذرية' },
    { name: 'الأنظمة الجغرافية و PostGIS', icon: MapPin, desc: 'النطاقات الجغرافية Geofences، مضلعات المناطق، والبحث بالقطر الفضائي' },
    { name: 'بوابة البث الحي (Realtime Gateway)', icon: Radio, desc: 'اتصالات WebSockets، كاش Redis والـ PubSub، وتزامن الحضور' },
    { name: 'الماليات والتسويات (Finance & Settlements)', icon: DollarSign, desc: 'رسوم التوصيل، عمولات المنصة، أرباح الكابتن، والـ Ledgers غير القابلة للتعديل' },
    { name: 'الأمان والحماية (Security & Auth)', icon: Shield, desc: 'رموز JWTs، صلاحيات RBAC، وحراسة ملكية الموارد ضد ثغرات IDOR' },
    { name: 'الإشعارات والأحداث (Events & Notifications)', icon: Bell, desc: 'طوابير الرسائل Async، الإشعارات المنبثقة، الـ SMS، وآثار الأحداث' },
    { name: 'الهندسة الموجهة بالذكاء الاصطناعي (AI Engineering & Audit)', icon: Shield, desc: 'مواصفة المهمة القياسية، هندسة السياق، ومصفوفة التدقيق الثمانية 8X' },
    { name: 'تدقيق وتجميع المنصات الجاهزة (Open-Source Architecture)', icon: Layers, desc: 'تتبع الميزات بـ Fleetbase و ERPNext، سلم قوة الأدلة، ومصفوفة اتخاذ القرار' }
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans text-right" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">خريطة قطاعات HDS والمعمارية</h2>
              <p className="text-[11px] text-slate-400">رسم بياني لمسؤوليات وحدود كل قطاع في النظام</p>
            </div>
          </div>

          <button
            onClick={() => setSystemMapOpen(false)}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Architecture Tree Header */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <h3 className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-widest mb-1">
              HYPERLOCAL DELIVERY SYSTEM (HDS)
            </h3>
            <p className="text-[11px] text-slate-400">معمارية منصة السوق ثلاثي الأطراف (Three-Sided Marketplace)</p>
          </div>

          {/* Grid of Domains */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {domains.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition-colors flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 mb-1">{d.name}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
