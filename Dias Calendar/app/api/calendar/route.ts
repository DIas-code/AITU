import {NextResponse} from 'next/server';
import ICAL from 'ical.js';
export const dynamic='force-dynamic';
export async function GET(){
 const url=process.env.MOODLE_CALENDAR_URL;
 if(!url) return NextResponse.json({error:'MOODLE_CALENDAR_URL is not configured.'},{status:500});
 try{
  const res=await fetch(url,{cache:'no-store',headers:{'User-Agent':'AITU-Deadlines/1.0'}});
  if(!res.ok) throw new Error(`Moodle returned ${res.status}`);
  const text=await res.text();
  const root=new ICAL.Component(ICAL.parse(text));
  const events=root.getAllSubcomponents('vevent').map(c=>{
   const e=new ICAL.Event(c); const p=(n:string)=>c.getFirstPropertyValue(n)?.toString()||null;
   const description=p('description'); const urlProp=p('url');
   return {id:e.uid||crypto.randomUUID(),title:e.summary||'Untitled event',start:e.startDate?.toJSDate().toISOString()||null,end:e.endDate?.toJSDate().toISOString()||null,description,url:urlProp,location:p('location'),categories:c.getAllProperties('categories').flatMap(x=>{const v=x.getValues();return v.map(String)}),course:null};
  }).filter(e=>e.start&&!e.title.startsWith('Attendance')).sort((a,b)=>new Date(a.start!).getTime()-new Date(b.start!).getTime());
  return NextResponse.json({events,syncedAt:new Date().toISOString()},{headers:{'Cache-Control':'private, max-age=0, s-maxage=300'}});
 }catch(err){return NextResponse.json({error:err instanceof Error?err.message:'Could not sync Moodle.'},{status:502});}
}
