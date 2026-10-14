/* XBIHUB Global Network - Core Application Logic */

const i18n = {
  en: {
    // Nav
    nav_home: "Home",
    nav_about: "About",
    nav_network: "Global Network",
    nav_tech: "Technology",
    nav_governance: "Governance",
    nav_faq: "FAQ",
    nav_login: "Sign In",
    nav_apply: "Apply Now",
    nav_portal: "Portal",
    nav_admin: "Admin",
    nav_logout: "Sign Out",

    // Hero
    hero_badge: "Global Bio-Intelligence Node Network",
    hero_title: "One Network.",
    hero_title_accent: "One Future.",
    hero_desc: "Apply · Sign · Activate",
    hero_cta_apply: "Start Application",
    hero_cta_learn: "Explore the Network",

    // Stats
    stat_nodes: "Target Nodes",
    stat_regions: "Regions",
    stat_secure: "Secure & Auditable",
    stat_bilingual: "Languages",

    // Features
    features_label: "Platform",
    features_title: "Built for Global Scale",
    features_desc: "A complete digital infrastructure for applicants, operators, and administrators — designed for security, compliance, and long-term evolution.",
    feat1_title: "Online Application",
    feat1_desc: "Submit commercial node applications with draft support, progress tracking, and seamless information requests.",
    feat2_title: "Electronic Agreements",
    feat2_desc: "Versioned protocol templates, secure e-signature integration, full audit trails, and downloadable completion certificates.",
    feat3_title: "Human Review",
    feat3_desc: "Structured review queues, internal notes, multi-stage approval, and complete operational audit logs.",
    feat4_title: "Node Lifecycle",
    feat4_desc: "From pending activation to active, suspended or terminated — every state change is recorded and controllable.",
    feat5_title: "Role-Based Access",
    feat5_desc: "Granular permissions for applicants, reviewers, agreement managers, and system administrators.",
    feat6_title: "Global Ready",
    feat6_desc: "Bilingual (EN/ZH), privacy-minimized data model, and configuration space for regional e-signature and data rules.",

    // Process
    process_label: "How It Works",
    process_title: "From Application to Activation",
    process_desc: "A transparent, auditable pathway designed for trust and operational clarity.",
    step1: "Register & Apply",
    step1_desc: "Create an account, complete the node application form, and submit for review.",
    step2: "Review & Supplement",
    step2_desc: "Our team reviews your application and may request additional information.",
    step3: "Sign Agreements",
    step3_desc: "Receive versioned agreements, review terms, and complete electronic signature.",
    step4: "Node Activation",
    step4_desc: "After all conditions are met, your node is activated and becomes part of the network.",

    // CTA
    cta_title: "Ready to Join the Network?",
    cta_desc: "Begin your commercial node application today. The process is designed to be clear, secure, and fully digital.",
    cta_btn: "Apply for a Node",

    // Footer
    footer_tagline: "Sense. Understand. Evolve.",
    footer_platform: "Platform",
    footer_legal: "Legal",
    footer_connect: "Connect",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",
    footer_cookies: "Cookie Notice",
    footer_contact: "Contact Us",
    footer_rights: "© 2026 XBIHUB. All rights reserved. Confidential.",
    mission_title: "Mission",
    mission_text: "Converge intelligence. Build interstellar civilization.",

    // Auth
    auth_login: "Sign In",
    auth_register: "Create Account",
    auth_email: "Email Address",
    auth_password: "Password",
    auth_confirm: "Confirm Password",
    auth_name: "Full Name",
    auth_submit_login: "Sign In",
    auth_submit_register: "Register",
    auth_no_account: "Don't have an account?",
    auth_has_account: "Already have an account?",
    auth_forgot: "Forgot password?",
    auth_verify_note: "A verification email will be sent after registration.",

    // Apply
    apply_title: "Node Application",
    apply_subtitle: "Commercial Node — V1.0",
    apply_entity: "Entity Type",
    apply_company: "Company",
    apply_individual: "Individual",
    apply_company_name: "Company Name",
    apply_applicant: "Applicant / Contact Name",
    apply_country: "Country / Region",
    apply_city: "City",
    apply_node_type: "Node Type",
    apply_plan: "Node Plan",
    apply_plan_hint: "Describe your objectives, resources, operational plan, and compliance arrangements (50–5,000 characters).",
    apply_lang: "Preferred Language",
    apply_save: "Save Draft",
    apply_submit: "Submit Application",
    apply_success: "Application submitted successfully. You will receive updates by email.",

    // Portal
    portal_dashboard: "Dashboard",
    portal_applications: "My Applications",
    portal_agreements: "Agreements",
    portal_profile: "Profile",
    portal_welcome: "Welcome back",
    portal_no_apps: "You have not submitted any applications yet.",
    portal_start: "Start New Application",
    portal_status: "Status",
    portal_created: "Created",
    portal_updated: "Last Updated",
    portal_view: "View",
    portal_sign: "Sign Agreement",

    // Admin
    admin_title: "Admin Console",
    admin_queue: "Application Queue",
    admin_nodes: "Node Management",
    admin_agreements: "Agreement Templates",
    admin_users: "Users & Roles",
    admin_audit: "Audit Logs",
    admin_stats_total: "Total Applications",
    admin_stats_pending: "Pending Review",
    admin_stats_signed: "Awaiting Signature",
    admin_stats_active: "Active Nodes",

    // Common
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    search: "Search...",
    filter: "Filter",
    actions: "Actions",
    no_data: "No data available",
  },
  zh: {
    nav_home: "首页",
    nav_about: "关于我们",
    nav_network: "全球网络",
    nav_tech: "技术与项目",
    nav_governance: "治理与标准",
    nav_faq: "常见问题",
    nav_login: "登录",
    nav_apply: "立即申请",
    nav_portal: "用户门户",
    nav_admin: "管理后台",
    nav_logout: "退出登录",

    hero_badge: "全球生物智能节点网络",
    hero_title: "一个网络。",
    hero_title_accent: "一个未来。",
    hero_desc: "申请 · 签署 · 激活",
    hero_cta_apply: "开始申请",
    hero_cta_learn: "探索网络",

    stat_nodes: "目标节点",
    stat_regions: "覆盖区域",
    stat_secure: "安全可审计",
    stat_bilingual: "支持语言",

    features_label: "平台能力",
    features_title: "为全球规模而生",
    features_desc: "面向申请人、运营方与管理员的完整数字基础设施 —— 以安全、合规与长期演进为核心设计。",
    feat1_title: "在线申请",
    feat1_desc: "支持草稿保存、进度追踪与信息补充请求的商业节点申请流程。",
    feat2_title: "电子协议",
    feat2_desc: "版本化协议模板、安全电子签署集成、完整审计轨迹与可下载完成证明。",
    feat3_title: "人工审核",
    feat3_desc: "结构化审核队列、内部备注、多阶段审批与完整运营审计日志。",
    feat4_title: "节点生命周期",
    feat4_desc: "从待激活到激活、暂停或终止 —— 每一次状态变更均被记录且可控。",
    feat5_title: "角色权限",
    feat5_desc: "申请人、审核员、协议管理员与系统管理员的精细权限控制。",
    feat6_title: "全球就绪",
    feat6_desc: "中英双语、隐私最小化数据模型，并为区域电子签名与数据规则保留配置空间。",

    process_label: "申请流程",
    process_title: "从申请到激活",
    process_desc: "透明、可审计的路径，为信任与运营清晰度而设计。",
    step1: "注册并申请",
    step1_desc: "创建账号，填写节点申请表并提交审核。",
    step2: "审核与补件",
    step2_desc: "团队审核申请，可能要求补充材料。",
    step3: "签署协议",
    step3_desc: "接收版本化协议，审阅条款并完成电子签署。",
    step4: "节点激活",
    step4_desc: "满足全部前置条件后，节点被激活并加入网络。",

    cta_title: "准备加入网络？",
    cta_desc: "立即开始商业节点申请。流程清晰、安全且完全数字化。",
    cta_btn: "申请节点",

    footer_tagline: "感知。理解。进化。",
    footer_platform: "平台",
    footer_legal: "法律",
    footer_connect: "联系",
    footer_privacy: "隐私政策",
    footer_terms: "使用条款",
    footer_cookies: "Cookie 说明",
    footer_contact: "联系我们",
    footer_rights: "© 2026 XBIHUB. 保留所有权利。机密文件。",
    mission_title: "使命",
    mission_text: "汇聚智能，共建星际文明。",

    auth_login: "登录",
    auth_register: "注册账号",
    auth_email: "邮箱地址",
    auth_password: "密码",
    auth_confirm: "确认密码",
    auth_name: "姓名",
    auth_submit_login: "登录",
    auth_submit_register: "注册",
    auth_no_account: "还没有账号？",
    auth_has_account: "已有账号？",
    auth_forgot: "忘记密码？",
    auth_verify_note: "注册后将发送验证邮件。",

    apply_title: "节点申请",
    apply_subtitle: "商业节点 — V1.0",
    apply_entity: "实体类型",
    apply_company: "公司",
    apply_individual: "个人",
    apply_company_name: "公司名称",
    apply_applicant: "申请人 / 联系人姓名",
    apply_country: "国家 / 地区",
    apply_city: "城市",
    apply_node_type: "节点类型",
    apply_plan: "节点计划",
    apply_plan_hint: "请说明目标、资源、运营计划与合规安排（50–5,000 字符）。",
    apply_lang: "首选语言",
    apply_save: "保存草稿",
    apply_submit: "提交申请",
    apply_success: "申请已成功提交。您将通过邮件收到更新。",

    portal_dashboard: "仪表盘",
    portal_applications: "我的申请",
    portal_agreements: "协议",
    portal_profile: "个人资料",
    portal_welcome: "欢迎回来",
    portal_no_apps: "您尚未提交任何申请。",
    portal_start: "开始新申请",
    portal_status: "状态",
    portal_created: "创建时间",
    portal_updated: "最后更新",
    portal_view: "查看",
    portal_sign: "签署协议",

    admin_title: "管理控制台",
    admin_queue: "申请队列",
    admin_nodes: "节点管理",
    admin_agreements: "协议模板",
    admin_users: "用户与角色",
    admin_audit: "审计日志",
    admin_stats_total: "申请总数",
    admin_stats_pending: "待审核",
    admin_stats_signed: "待签署",
    admin_stats_active: "已激活节点",

    loading: "加载中...",
    save: "保存",
    cancel: "取消",
    close: "关闭",
    confirm: "确认",
    back: "返回",
    next: "下一步",
    search: "搜索...",
    filter: "筛选",
    actions: "操作",
    no_data: "暂无数据",
  }
};

let currentLang = localStorage.getItem('xbihub_lang') || 'en';
// V1.1 security boundary: legacy browser-stored identity is intentionally ignored.\nlet currentUser = null;

function t(key) {
  return i18n[currentLang][key] || i18n.en[key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('xbihub_lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  updateAllTexts();
  const toggle = document.getElementById('langToggle');
  if (toggle) toggle.textContent = lang === 'en' ? '中文' : 'EN';
}

function updateAllTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.placeholder = t(key);
  });
  // Update dynamic status texts if needed
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toastContainer';
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}

// Auth helpers

function getUsers() {
  return JSON.parse(localStorage.getItem('xbihub_users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('xbihub_users', JSON.stringify(users));
}
function findUserByEmail(email) {
  return getUsers().find(u => u.email.toLowerCase() === (email || '').toLowerCase());
}
function upsertUser(user) {
  const users = getUsers();
  const idx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (idx >= 0) users[idx] = { ...users[idx], ...user };
  else users.push(user);
  saveUsers(users);
  return user;
}

function saveUser(user) {
  currentUser = user;
  localStorage.setItem('xbihub_user', JSON.stringify(user));
}

function logout() {
  currentUser = null;
  localStorage.removeItem('xbihub_user');
  window.location.href = 'index.html';
}

function requireAuth(redirect = 'login.html') {
  if (!currentUser) {
    window.location.href = redirect;
    return false;
  }
  return true;
}

function requireAdmin() {
  if (!currentUser || currentUser.role !== 'admin') {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// Application storage
function getApplications() {
  return JSON.parse(localStorage.getItem('xbihub_apps') || '[]');
}

function saveApplications(apps) {
  localStorage.setItem('xbihub_apps', JSON.stringify(apps));
}

function getAgreements() {
  return JSON.parse(localStorage.getItem('xbihub_agreements') || '[]');
}

function saveAgreements(agreements) {
  localStorage.setItem('xbihub_agreements', JSON.stringify(agreements));
}

// Seed demo data if empty
function seedDemoData() {
  // Disabled in V1.1: never seed demo identities, applications, or agreements into a visitor's browser.
}

// Nav scroll effect
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  seedDemoData();
  setLang(currentLang);
  initNav();
  updateAuthUI();
});

function updateAuthUI() {
  const loginBtns = document.querySelectorAll('[data-auth="login"]');
  const portalBtns = document.querySelectorAll('[data-auth="portal"]');
  const adminBtns = document.querySelectorAll('[data-auth="admin"]');
  const logoutBtns = document.querySelectorAll('[data-auth="logout"]');
  const userNameEls = document.querySelectorAll('[data-user-name]');

  if (currentUser) {
    loginBtns.forEach(el => el.classList.add('hidden'));
    portalBtns.forEach(el => el.classList.remove('hidden'));
    logoutBtns.forEach(el => el.classList.remove('hidden'));
    if (currentUser.role === 'admin') {
      adminBtns.forEach(el => el.classList.remove('hidden'));
    }
    userNameEls.forEach(el => el.textContent = currentUser.name || currentUser.email);
  } else {
    loginBtns.forEach(el => el.classList.remove('hidden'));
    portalBtns.forEach(el => el.classList.add('hidden'));
    adminBtns.forEach(el => el.classList.add('hidden'));
    logoutBtns.forEach(el => el.classList.add('hidden'));
  }
}

// Status label helper
function statusBadge(status) {
  const map = {
    draft: 'badge-draft',
    submitted: 'badge-submitted',
    under_review: 'badge-review',
    needs_information: 'badge-needs',
    approved: 'badge-approved',
    rejected: 'badge-rejected',
    withdrawn: 'badge-draft',
    pending_signature: 'badge-pending',
    signed: 'badge-signed',
    pending_activation: 'badge-pending',
    active: 'badge-active',
    suspended: 'badge-needs',
    terminated: 'badge-rejected'
  };
  const labels = {
    en: {
      draft: 'Draft', submitted: 'Submitted', under_review: 'Under Review',
      needs_information: 'Needs Information', approved: 'Approved', rejected: 'Rejected',
      withdrawn: 'Withdrawn', pending_signature: 'Pending Signature', signed: 'Signed',
      pending_activation: 'Pending Activation', active: 'Active', suspended: 'Suspended', terminated: 'Terminated'
    },
    zh: {
      draft: '草稿', submitted: '已提交', under_review: '审核中',
      needs_information: '待补件', approved: '已批准', rejected: '已拒绝',
      withdrawn: '已撤回', pending_signature: '待签署', signed: '已签署',
      pending_activation: '待激活', active: '已激活', suspended: '已暂停', terminated: '已终止'
    }
  };
  const cls = map[status] || 'badge-draft';
  const label = (labels[currentLang] || labels.en)[status] || status;
  return `<span class="badge ${cls}">${label}</span>`;
}
