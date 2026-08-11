export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Architecture' | 'Data & DB' | 'Dispatch & Maps' | 'Realtime' | 'Business & Finance';
  sessionRef?: string;
}

export const HDS_GLOSSARY: GlossaryTerm[] = [
  {
    term: "Dispatch Engine",
    definition: "محرك المطابقة والتوزيع الأساسي المسؤول عن تصفية الكباتن المؤهلين، وحساب النقاط متعددة العوامل، وتوليد عروض التوصيل الذرية التنافسية.",
    category: "Dispatch & Maps",
    sessionRef: "10"
  },
  {
    term: "PostGIS",
    definition: "امتداد نظام قواعد البيانات المكاني لـ PostgreSQL الذي يتيح التخزين الجغرافي (Point, Polygon) واستعلامات الفهرسة السريعة (GiST) للبحث بقطر النطاق والمضلعات.",
    category: "Dispatch & Maps",
    sessionRef: "09"
  },
  {
    term: "Idempotency",
    definition: "خاصية تضمن سلامة العمليات التكرارية؛ حيث يمكن تنفيذ طلب الـ API أو العمال بالخلفية عدة مرات دون إحداث آثار جانبية مكررة (مثل منع سحب الأموال المزدوج أو التكرار).",
    category: "Architecture",
    sessionRef: "12"
  },
  {
    term: "Finite State Machine (FSM)",
    definition: "آلة الحالات المحدودة؛ نموذج معمارية يوجد فيه الطلب بداخل حالة واحدة صريحة في أي وقت، ولا ينتقل للحالة التالية إلا عبر إجراءات محددة وصارمة.",
    category: "Architecture",
    sessionRef: "06"
  },
  {
    term: "Redis Pub/Sub & Cache",
    definition: "مخزن بيانات بالذاكرة السريعة يستخدم لتخزين الإحداثيات اللحظية وبث الرسائل وتنبيه خوادم الـ WebSockets بالتغيرات بدون إجهاد الداتا بيز.",
    category: "Realtime",
    sessionRef: "08"
  },
  {
    term: "WebSockets",
    definition: "بروتوكول اتصال ثنائي الاتجاه ودائم عبر TCP يتيح التبادل اللحظي للبيانات بين تطبيق المحمول وخوادم المنظومة (مثل تتبع موقع الكابتن بالخريطة).",
    category: "Realtime",
    sessionRef: "08"
  },
  {
    term: "Geofencing",
    definition: "تحديد النطاقات الجغرافية الافتراضية (Polygons) لفرض قيود الخدمة، وتحديد مناطق توصيل المتاجر، والتحقق من تواجد الكابتن بداخل المنطقة.",
    category: "Dispatch & Maps",
    sessionRef: "09"
  },
  {
    term: "RBAC & IDOR",
    definition: "التحكم بالصلاحيات بناءً على الأدوار (RBAC)، وحماية الموارد ضد ثغرات التجاوز المباشر (IDOR) عبر التثبت الصريح من ملكية العميل للطلب (order.userId === req.user.id).",
    category: "Architecture",
    sessionRef: "05"
  },
  {
    term: "Financial Ledger",
    definition: "الدفتر المالي المزدوج غير القابل للتعديل الذي يسجل جميع المدينين والدائنين لأطراف المنظومة (العميل، التاجر، الكابتن، والمنصة) دون تعديل مباشر للأرصدة.",
    category: "Business & Finance",
    sessionRef: "11"
  },
  {
    term: "Merchant Settlement",
    definition: "التسوية المالية الدورية للتاجر؛ عملية مطابقة إجمالي الطلبات وخصم عمولات المنصة والدعم، ثم تنفيذ عمليات التحويل المالي الصافي للتاجر.",
    category: "Business & Finance",
    sessionRef: "11"
  },
  {
    term: "Race Condition",
    definition: "ثغرة السباق التنافسي؛ تحدث عند محاولة معالجة طلبين تزامنيين (مثل قبول كابتنين لنفس الطلب في نفس الملي ثانية) مالم تحمى الداتا بيز بـ الحراسة الذرية.",
    category: "Architecture",
    sessionRef: "12"
  },
  {
    term: "Event-Driven Architecture",
    definition: "المعمارية القائمة على الأحداث؛ فصل المعاملات والآثار الجانبية عبر إطلاق أحداث النطاق (مثل OrderCreated) لمعالجتها لا تزامندياً بالخلفية عبر طوابير الرسائل.",
    category: "Architecture",
    sessionRef: "07"
  },
  {
    term: "Context Engineering",
    definition: "هندسة وتصفية السياق الموجه للـ AI Agent؛ تمرير المعلومات ذات الصلة الوثيقة وتصفية الضوضاء لمنع تشتت أو تخمين النموذج الإصطناعي.",
    category: "Architecture",
    sessionRef: "16"
  },
  {
    term: "8-Category AI Audit",
    definition: "مصفوفة تدقيق مخرجات الـ AI الثمانية للكشف عن الثغرات بـ (المنطق التجاري، الصلاحيات، الداتا بيز، التنافسية، المالية، المعمارية، الاعتمادية، والاختبارات).",
    category: "Architecture",
    sessionRef: "16"
  },
  {
    term: "Evidence-Based Architecture Reading",
    definition: "قراءة وتدقيق معمارية المنصات والمستودعات الجاهزة بالاعتماد الحصري على الأدلة المباشرة للكود والاختبارات والمخططات الهيكلية بدلاً من ادعاءات التسويق والـ AI.",
    category: "Architecture",
    sessionRef: "17"
  },
  {
    term: "Evidence Classifications",
    definition: "تصنيف ادعاءات قدرة المنصات الجاهزة إلى 4 درجات صريحة: (VERIFIED - مُثبت بالدليل، PARTIAL - جزئي، CLAIMED_ONLY - ادعاء تسويقي، NOT_FOUND - لم يعثر عليه بالفحص الحالي).",
    category: "Architecture",
    sessionRef: "17"
  },
  {
    term: "Build vs Extend vs Integrate vs Reject",
    definition: "مصفوفة اتخاذ القرار المعماري النهائي عند اختيار الاعتماد على المنصات المفتوحة الجاهزة بدلاً من خيار إعادة البناء من الصفر.",
    category: "Architecture",
    sessionRef: "17"
  },
  {
    term: "Production Topology & VPC",
    definition: "التوبولوجيا والحدود الشبكية للبيئة الإنتاجية؛ عزل خوادم الداتا بيز بالشبكات الخاصة المباشرة وتمرير المفاتيح وقت التشغيل عبر Runtime Secret Managers.",
    category: "Architecture",
    sessionRef: "14"
  },
  {
    term: "Modular Monolith",
    definition: "نموذج البناء النمطي الموحد الذي يجمع موديولات النظام في مشروع برمجي واحد مع حسم الحدود البرمجية ومنع التداخل المباشر بين الموديولات.",
    category: "Architecture",
    sessionRef: "01"
  },
  {
    term: "Constructive Rejection by Invariants",
    definition: "الرفض الهيكلي المسبب الموجه للـ AI؛ بيان العيب وقانونه الحتمي المخترق وسيناريو الفشل والتعديلات والاختبارات الحتمية المطلوبة بشكل صريح.",
    category: "Architecture",
    sessionRef: "16"
  }
];
