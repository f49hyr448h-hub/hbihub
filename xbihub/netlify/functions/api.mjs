const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
};
const json=(statusCode,body,extra={})=>({statusCode,headers:{...headers,...extra},body:JSON.stringify(body)});
const env=()=>({url:process.env.SUPABASE_URL?.replace(/\/$/,''),anon:process.env.SUPABASE_ANON_KEY,service:process.env.SUPABASE_SERVICE_ROLE_KEY});
function cookie(event,name){const raw=event.headers?.cookie||event.headers?.Cookie||'';const m=raw.match(new RegExp('(?:^|;\\s*)'+name+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}
function setCookie(token,maxAge=3600){return `xbihub_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`}
function clearCookie(){return 'xbihub_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'}
async function sb(path,opts={},service=true){const e=env();if(!e.url||!e.anon||!e.service)throw new Error('Server is not configured: add SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY in Netlify environment variables.');const key=service?e.service:e.anon;const r=await fetch(`${e.url}${path}`,{...opts,headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',...(opts.headers||{})}});const text=await r.text();let data={};try{data=text?JSON.parse(text):{}}catch{}if(!r.ok){const er=new Error(data.msg||data.message||data.error_description||data.error||`Supabase request failed (${r.status})`);er.status=r.status;throw er}return data}
function bodyOf(event){try{return JSON.parse(event.body||'{}')}catch{return {}}}
async function authUser(event){const token=cookie(event,'xbihub_session');if(!token)return null;const e=env();const r=await fetch(`${e.url}/auth/v1/user`,{headers:{apikey:e.anon,Authorization:`Bearer ${token}`}});if(!r.ok)return null;const u=await r.json();const rows=await sb(`/rest/v1/profiles?id=eq.${encodeURIComponent(u.id)}&select=id,email,full_name,role&limit=1`);return rows[0]?{...rows[0],email:u.email}:null}
async function audit(actorId,action,entityType,entityId,metadata={}){await sb('/rest/v1/audit_logs',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({actor_id:actorId,action,entity_type:entityType,entity_id:entityId,metadata})})}
const validStatus=new Set(['under_review','needs_info','approved','rejected']);
export async function handler(event){
 if(event.httpMethod==='OPTIONS')return {statusCode:204,headers:{'Access-Control-Allow-Origin':process.env.URL||'https://xbihub.com','Access-Control-Allow-Credentials':'true','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'}};
 if(event.httpMethod!=='POST')return json(405,{error:'Method not allowed'});
 const origin=event.headers?.origin;const allowed=(process.env.ALLOWED_ORIGINS||'').split(',').map(x=>x.trim()).filter(Boolean);if(origin&&allowed.length&&!allowed.includes(origin))return json(403,{error:'Origin not allowed'});
 const b=bodyOf(event);const action=String(b.action||'');try{
  if(action==='health'){const e=env();return json(200,{ok:true,configured:!!(e.url&&e.anon&&e.service),message:'Health status does not verify external email or e-signature integrations.'})}
  if(action==='register'){
   const email=String(b.email||'').trim().toLowerCase(),password=String(b.password||''),full_name=String(b.full_name||'').trim();
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<12||full_name.length<2)return json(400,{error:'Enter a valid email, full name, and password of at least 12 characters.'});
   const e=env();const r=await fetch(`${e.url}/auth/v1/signup`,{method:'POST',headers:{apikey:e.anon,'Content-Type':'application/json'},body:JSON.stringify({email,password,data:{full_name}})});const d=await r.json();if(!r.ok)return json(r.status,{error:d.msg||d.message||'Registration failed.'});return json(200,{ok:true,message:'Registration request received. If email verification is enabled, check your inbox before signing in.'})
  }
  if(action==='login'){
   const email=String(b.email||'').trim().toLowerCase(),password=String(b.password||'');const e=env();const r=await fetch(`${e.url}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:e.anon,'Content-Type':'application/json'},body:JSON.stringify({email,password})});const d=await r.json();if(!r.ok||!d.access_token)return json(401,{error:'Sign-in failed. Check your credentials and email verification status.'});return json(200,{ok:true},{'Set-Cookie':setCookie(d.access_token,Math.max(60,Math.min(3600,d.expires_in||3600)))})
  }
  if(action==='logout')return json(200,{ok:true},{'Set-Cookie':clearCookie()});
  const user=await authUser(event);
  if(action==='me')return json(200,{user:user||null});
  if(!user)return json(401,{error:'Sign in required.'});
  if(action==='application-create'){
   const required=['company_name','applicant_name','country_region','node_type','node_plan'];for(const k of required)if(!String(b[k]||'').trim())return json(400,{error:`Missing field: ${k}`});
   if(String(b.node_plan).trim().length<50||String(b.node_plan).length>5000)return json(400,{error:'Node plan must be 50–5,000 characters.'});
   const id='XBI-'+new Date().getUTCFullYear()+'-'+crypto.randomUUID().slice(0,8).toUpperCase();const payload={id,user_id:user.id,entity_type:['company','individual'].includes(b.entity_type)?b.entity_type:'company',company_name:String(b.company_name).trim().slice(0,200),applicant_name:String(b.applicant_name).trim().slice(0,120),country_region:String(b.country_region).trim().slice(0,120),city:String(b.city||'').trim().slice(0,120),node_type:['commercial','research','technology','community'].includes(b.node_type)?b.node_type:'commercial',node_plan:String(b.node_plan).trim(),contact_email:user.email,status:'submitted'};
   const rows=await sb('/rest/v1/applications',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(payload)});await audit(user.id,'application_submitted','application',id);return json(201,{application:rows[0]})
  }
  if(action==='application-list'){const rows=await sb(`/rest/v1/applications?user_id=eq.${encodeURIComponent(user.id)}&select=id,company_name,applicant_name,status,created_at,updated_at&order=created_at.desc`);return json(200,{applications:rows})}
  if(action==='resource-list'){const rows=await sb('/rest/v1/resources?is_published=eq.true&select=id,title,category,url,access_level&order=created_at.desc');let own=[];if(user.role!=='admin')own=await sb(`/rest/v1/applications?user_id=eq.${encodeURIComponent(user.id)}&select=status`);const statuses=own.map(a=>a.status);const approved=statuses.some(s=>['approved','pending_signature','signed','active'].includes(s));const active=statuses.includes('active');const filtered=rows.filter(x=>user.role==='admin'||x.access_level==='all_partners'||(x.access_level==='approved'&&approved)||(x.access_level==='active'&&active));return json(200,{resources:filtered.map(({id,title,category,url})=>({id,title,category,url}))})}
  if(action.startsWith('admin-')&&user.role!=='admin')return json(403,{error:'Administrator role required.'});
  if(action==='admin-applications'){const rows=await sb('/rest/v1/applications?select=id,user_id,company_name,applicant_name,contact_email,country_region,node_type,status,created_at,updated_at&order=created_at.desc');return json(200,{applications:rows})}
  if(action==='admin-review'){
   const id=String(b.application_id||''),status=String(b.status||'');if(!id||!validStatus.has(status))return json(400,{error:'Invalid application or status.'});const rows=await sb(`/rest/v1/applications?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({status,review_note:String(b.note||'').slice(0,2000),reviewed_by:user.id,updated_at:new Date().toISOString()})});if(!rows.length)return json(404,{error:'Application not found.'});await audit(user.id,'application_status_changed','application',id,{status});let emailNotification='not_configured';if(process.env.RESEND_API_KEY&&process.env.MAIL_FROM&&rows[0].contact_email){const message=`Your XBIHUB node application ${id} status is now: ${status}.`+(b.note?` Review note: ${String(b.note).slice(0,1000)}`:'')+' Sign in to the XBIHUB partner portal to view the next steps.';const er=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.MAIL_FROM,to:[rows[0].contact_email],subject:'XBIHUB application status update',text:message})});emailNotification=er.ok?'sent':'failed';}return json(200,{application:rows[0],email_notification:emailNotification})
  }
  if(action==='admin-resource-create'){
   const title=String(b.title||'').trim(),url=String(b.url||'').trim(),category=String(b.category||'General').trim(),access=String(b.access_level||'all_partners');
   if(title.length<2||title.length>200||!/^https:\/\//i.test(url)||url.length>2000||!['all_partners','approved','active','admin'].includes(access))return json(400,{error:'Provide a title, HTTPS resource URL, and valid access level.'});
   const rows=await sb('/rest/v1/resources',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({title,url,category:category.slice(0,100),access_level:access,is_published:!!b.is_published})});await audit(user.id,'resource_created','resource',rows[0].id,{access_level:access,is_published:!!b.is_published});return json(201,{resource:rows[0]})
  }
  if(action==='admin-node-activate'){
   const id=String(b.application_id||'');const apps=await sb(`/rest/v1/applications?id=eq.${encodeURIComponent(id)}&select=id,status,payment_confirmed,training_completed`);if(!apps.length)return json(404,{error:'Application not found.'});const agreements=await sb(`/rest/v1/agreements?application_id=eq.${encodeURIComponent(id)}&status=eq.signed&provider_verified=eq.true&select=id&limit=1`);if(!agreements.length)return json(409,{error:'A provider-verified signed agreement is required before activation.'});if(!apps[0].payment_confirmed||!apps[0].training_completed)return json(409,{error:'Payment confirmation and training completion must both be recorded before activation.'});const rows=await sb(`/rest/v1/applications?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({status:'active',updated_at:new Date().toISOString()})});await audit(user.id,'node_activated','application',id);return json(200,{application:rows[0]})
  }
  if(action==='agreement-start')return json(503,{error:'Formal e-signature is not connected. Configure and test the selected provider integration before sending agreements.'});
  if(action==='agreement-sign')return json(503,{error:'Self-attested signing is disabled. Agreements must be signed through the configured e-signature provider and verified by a trusted callback.'});
  if(action==='node-activate'){
   const id=String(b.application_id||'');const apps=await sb(`/rest/v1/applications?id=eq.${encodeURIComponent(id)}&select=id,status`);if(!apps.length)return json(404,{error:'Application not found.'});const agreements=await sb(`/rest/v1/agreements?application_id=eq.${encodeURIComponent(id)}&status=eq.signed&select=id&limit=1`);if(!agreements.length)return json(409,{error:'Node cannot be activated until a provider-verified signed agreement exists.'});return json(503,{error:'Activation prerequisites verified, but production activation workflow must be configured with the approved payment/training rules.'})
  }
  return json(400,{error:'Unknown action.'});
 }catch(e){console.error('XBIHUB API error',action,e.message);return json(e.status&&e.status<500?e.status:500,{error:e.status&&e.status<500?e.message:'Server error. Check function logs; sensitive details are not returned to the browser.'})}
}
