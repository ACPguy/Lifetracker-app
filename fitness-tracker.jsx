import { useState, useEffect } from "react";

//    Exercise data (compact)                                                 
const G = "https://media.giphy.com/media/";
const EX = {
  kettlebell: [
    { id:"kb_swing",    name:"KB Swing",           muscles:"Glutes, Hamstrings, Core",    cues:"Hinge hips, snap forward",     hw:true  },
    { id:"kb_goblet",   name:"Goblet Squat",        muscles:"Quads, Glutes, Core",         cues:"Chest up, elbows inside knees",hw:true  },
    { id:"kb_clean",    name:"KB Clean",            muscles:"Full Body, Posterior Chain",  cues:"Pull close, thread the needle",hw:true  },
    { id:"kb_press",    name:"KB Press",            muscles:"Shoulders, Triceps",          cues:"Packed shoulder, vert forearm",hw:true  },
    { id:"kb_snatch",   name:"KB Snatch",           muscles:"Full Body Power",             cues:"High pull, punch at top",      hw:true  },
    { id:"kb_rdl",      name:"KB RDL",              muscles:"Hamstrings, Glutes, Back",    cues:"Soft knees, push hips back",   hw:true  },
    { id:"kb_row",      name:"KB Row",              muscles:"Lats, Rhomboids, Biceps",     cues:"Elbow to hip, squeeze",        hw:true  },
    { id:"kb_tgu",      name:"Turkish Get-Up",      muscles:"Full Body Stability",         cues:"Eyes on bell, controlled",     hw:true  },
  ],
  bodyweight: [
    { id:"bw_pullup",   name:"Pull-Up",             muscles:"Lats, Biceps",                cues:"Full hang to chin over bar",   hw:false },
    { id:"bw_pushup",   name:"Push-Up",             muscles:"Chest, Triceps, Core",        cues:"Rigid plank, chest to floor",  hw:false },
    { id:"bw_dip",      name:"Dip",                 muscles:"Triceps, Chest",              cues:"Lean forward, full depth",     hw:false },
    { id:"bw_plank",    name:"Plank",               muscles:"Core, Shoulders, Glutes",     cues:"Squeeze everything, tilt",     hw:false },
    { id:"bw_lunge",    name:"Reverse Lunge",       muscles:"Quads, Glutes, Balance",      cues:"Shin vertical, knee hovers",   hw:false },
    { id:"bw_burpee",   name:"Burpee",              muscles:"Full Body Conditioning",      cues:"Control descent, explosive",   hw:false },
    { id:"bw_squat",    name:"BW Squat",            muscles:"Quads, Glutes",               cues:"Knees track, below parallel",  hw:false },
  ],
  yoga: [
    { id:"yg_downdog",  name:"Downward Dog",        muscles:"Hamstrings, Calves, Shoulders",cues:"Press away, long spine",      hw:false },
    { id:"yg_warrior1", name:"Warrior I",           muscles:"Hips, Quads, Core",           cues:"Back heel grounded, hips sq",  hw:false },
    { id:"yg_pigeon",   name:"Pigeon Pose",         muscles:"Hip Flexors, Glutes",         cues:"Square hips, relax into it",   hw:false },
    { id:"yg_bridge",   name:"Bridge Pose",         muscles:"Glutes, Hamstrings, Spine",   cues:"Heels drive, squeeze glutes",  hw:false },
    { id:"yg_child",    name:"Child Pose",          muscles:"Lower Back, Hips",            cues:"Forehead down, arms extended", hw:false },
  ],
  stretching: [
    { id:"st_hipflex",  name:"Hip Flexor Stretch",  muscles:"Hip Flexors, Psoas",          cues:"Tuck pelvis, lean forward",    hw:false },
    { id:"st_thoracic", name:"Thoracic Rotation",   muscles:"Thoracic Spine",              cues:"Knee pinned, reach long",      hw:false },
    { id:"st_worlds",   name:"World Greatest Str",  muscles:"Full Body Mobility",          cues:"Lunge, elbow floor, reach",    hw:false },
    { id:"st_catcow",   name:"Cat-Cow",             muscles:"Spine, Core",                 cues:"Breathe into movement",        hw:false },
  ],
  walking: [
    { id:"wk_stroll",   name:"Stroll",              muscles:"Legs, Light Cardio",          cues:"Relaxed, arms swing",          hw:false },
    { id:"wk_brisk",    name:"Brisk Walk",          muscles:"Legs, Glutes, Cardio",        cues:"Push off toe, drive arms",     hw:false },
    { id:"wk_walkrun",  name:"Walk-Run Intervals",  muscles:"Legs, Cardio",                cues:"Walk 2 min, run 1 min",        hw:false },
    { id:"wk_incline",  name:"Hill Walk",           muscles:"Glutes, Calves, Quads",       cues:"Lean forward, short stride",   hw:false },
  ],
  running: [
    { id:"rn_street",   name:"Street Run",          muscles:"Full Legs, Cardio",           cues:"Midfoot strike, 170+ spm",     hw:false },
    { id:"rn_trail",    name:"Trail Run",           muscles:"Full Legs, Stability",        cues:"Shorten stride on terrain",    hw:false },
    { id:"rn_easy",     name:"Easy Run",            muscles:"Legs, Aerobic Base",          cues:"Conversational pace",          hw:false },
    { id:"rn_tempo",    name:"Tempo Run",           muscles:"Full Legs, Lungs",            cues:"Comfortably hard, 20-40 min",  hw:false },
    { id:"rn_hills",    name:"Hill Repeats",        muscles:"Glutes, Quads, Power",        cues:"Drive knees on way up",        hw:false },
  ],
  kayaking: [
    { id:"ky_flat",     name:"Flatwater Paddle",    muscles:"Shoulders, Lats, Core",       cues:"Rotate torso, not arms",       hw:false },
    { id:"ky_tour",     name:"Touring Distance",    muscles:"Full Upper Body, Core",       cues:"Steady cadence, blade subm",   hw:false },
    { id:"ky_sprint",   name:"Sprint Intervals",    muscles:"Shoulders, Core, Cardio",     cues:"Max 20-30 strokes, rest",      hw:false },
  ],
  cycling: [
    { id:"cy_endur",    name:"Endurance Ride",      muscles:"Quads, Hamstrings, Glutes",   cues:"Zone 2 HR, conversational",    hw:false },
    { id:"cy_hiit",     name:"HIIT Intervals",      muscles:"Full Legs, Cardio",           cues:"30s all-out, 90s easy",        hw:false },
    { id:"cy_sprint",   name:"Sprint",              muscles:"Fast-Twitch Legs",            cues:"Max RPM, 10-15 sec",           hw:false },
    { id:"cy_recov",    name:"Recovery Spin",       muscles:"Light Legs, Circulation",     cues:"High cadence, low resistance", hw:false },
  ],
  pt: [
    { id:"pt_clam",     name:"Clamshell",           muscles:"Glute Med, Hip Rotators",     cues:"Hips stacked, rotate top",     hw:false },
    { id:"pt_birddog",  name:"Bird Dog",            muscles:"Core, Glutes, Low Back",      cues:"Neutral spine, extend limbs",  hw:false },
    { id:"pt_deadbug",  name:"Dead Bug",            muscles:"Deep Core, Stability",        cues:"Press back down, slow",        hw:false },
    { id:"pt_glute",    name:"Glute Bridge",        muscles:"Glutes, Hamstrings, Core",    cues:"Heels drive, squeeze top",     hw:false },
    { id:"pt_pallof",   name:"Pallof Press",        muscles:"Anti-Rotation Core",          cues:"Press out, resist rotation",   hw:false },
    { id:"pt_stepup",   name:"Step Up",             muscles:"Quads, Glutes, Balance",      cues:"Drive through heel",           hw:false },
    { id:"pt_calf",     name:"Eccentric Calf Raise",muscles:"Calf, Achilles",              cues:"Up two feet, down one 3sec",   hw:false },
  ],
};

const EX_MAP = {};
Object.entries(EX).forEach(([cat,arr])=>arr.forEach(e=>{EX_MAP[e.id]={...e,category:cat};}));
const ALL_CATS = Object.keys(EX);
const WEIGHTS = [15,20,25,30,35,40,50];
const REPS = [5,10,15,20];
const SECS = [10,15,20,25,30,35,40,45,50,55,60,75,90,120];
const ACCENT="#ff6b2b", JADE="#00c9a7", AMBER="#f59e0b";
const CC={kettlebell:"#ff6b2b",bodyweight:"#00c9a7",yoga:"#a78bfa",stretching:"#38bdf8",walking:"#84cc16",running:"#ef4444",kayaking:"#0ea5e9",cycling:"#f59e0b",pt:"#f472b6"};
const CL={kettlebell:"Kettlebell",bodyweight:"Bodyweight",yoga:"Yoga",stretching:"Stretching",walking:"Walking",running:"Running",kayaking:"Kayaking",cycling:"Cycling",pt:"PT Rehab"};

function today(){return new Date().toISOString().split("T")[0];}
function fmtDate(d){return new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});}
function inferTypes(exs){return[...new Set(exs.map(e=>(EX_MAP[e.id]?.category||e.category)).filter(Boolean))];}
function blankSet(ex){return{weight:ex.hw?20:0,reps:10,seconds:30,done:false};}
function blankEntry(ex){return{...ex,sets:[blankSet(ex)]};}
function estCal(mins,types,lbs){
  const M={kettlebell:8,bodyweight:7,yoga:3,stretching:2.5,walking:3.5,running:9,kayaking:5,cycling:7.5,pt:2.8};
  const kg=(lbs||185)*0.453592;
  if(!mins||mins<=0)return 0;
  const ts=types&&types.length?types:["bodyweight"];
  const avg=ts.reduce((a,t)=>a+(M[t]||5),0)/ts.length;
  return Math.round(avg*kg*(mins/60));
}
function getWeekDates(){const now=new Date(),day=now.getDay();return Array.from({length:7},(_,i)=>{const d=new Date(now);d.setDate(now.getDate()-day+i);return d.toISOString().split("T")[0];});}
function load(k,d){try{return JSON.parse(localStorage.getItem(k)||"null")??d;}catch{return d;}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}

const DD={background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",color:"#fff",borderRadius:6,padding:"6px 4px",fontSize:14,flex:1};
const INP={background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#ccc",borderRadius:8,padding:"10px 12px",fontSize:14,boxSizing:"border-box",width:"100%"};
const SLB={fontFamily:"'Bebas Neue',sans-serif",fontSize:12,letterSpacing:2,color:"#888",marginBottom:7,display:"block"};

//    Small components                                                        
function Badges({types}){
  if(!types?.length)return null;
  return <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:5}}>{types.map(t=><span key={t} style={{fontSize:11,borderRadius:10,padding:"2px 8px",background:CC[t]+"22",color:CC[t],border:"1px solid "+CC[t]+"44"}}>{CL[t]}</span>)}</div>;
}

function SetRow({set,idx,onUpdate,onRemove,ex}){
  const done=!!set.done;
  return(
    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,opacity:done?0.45:1}}>
      <span style={{color:"#888",fontSize:13,width:22}}># {idx+1}</span>
      {ex.hw&&<select value={set.weight||20} onChange={e=>onUpdate({...set,weight:+e.target.value})} style={DD} disabled={done}>{WEIGHTS.map(w=><option key={w} value={w}>{w} lbs</option>)}</select>}
      <select value={set.reps||10} onChange={e=>onUpdate({...set,reps:+e.target.value})} style={DD} disabled={done}>{REPS.map(r=><option key={r} value={r}>{r} reps</option>)}</select>
      {!ex.hw&&<select value={set.seconds||30} onChange={e=>onUpdate({...set,seconds:+e.target.value})} style={DD} disabled={done}>{SECS.map(s=><option key={s} value={s}>{s}s</option>)}</select>}
      <button onClick={()=>onUpdate({...set,done:!done})} style={{flexShrink:0,width:30,height:30,borderRadius:6,cursor:"pointer",border:"2px solid "+(done?JADE:"rgba(255,255,255,0.2)"),background:done?"rgba(0,201,167,0.2)":"transparent",color:JADE,fontSize:14}}>
        {done?"v":""}
      </button>
      <button onClick={onRemove} style={{background:"none",border:"none",color:"#888",fontSize:18,cursor:"pointer",padding:"0 2px"}}>x</button>
    </div>
  );
}

function ExBlock({ex,onUpdateSets,onRemove,onAddSet}){
  const accent=CC[ex.category]||ACCENT;
  return(
    <div style={{background:"rgba(255,255,255,0.04)",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",borderLeft:"3px solid "+accent,padding:"12px 14px",marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:1}}>{ex.name}</div>
          <div style={{fontSize:11,color:accent,marginTop:1}}>{CL[ex.category]}</div>
        </div>
        <button onClick={onRemove} style={{background:"none",border:"none",color:"#888",fontSize:16,cursor:"pointer"}}>x</button>
      </div>
      {ex.sets.map((s,i)=>(
        <SetRow key={i} set={s} idx={i} ex={ex}
          onUpdate={ns=>onUpdateSets(ex.sets.map((x,j)=>j===i?ns:x))}
          onRemove={()=>onUpdateSets(ex.sets.filter((_,j)=>j!==i))}/>
      ))}
      <button onClick={onAddSet} style={{marginTop:4,padding:"6px 12px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#ccc",borderRadius:6,fontSize:13,cursor:"pointer"}}>+ Add Set</button>
    </div>
  );
}

//    Library Picker                                                          
function LibPicker({addedIds,onAdd,onClose}){
  const [cat,setCat]=useState("kettlebell");
  const [q,setQ]=useState("");
  const filtered=(EX[cat]||[]).filter(e=>e.name.toLowerCase().includes(q.toLowerCase()));
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:50,display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto"}}>
      <div style={{background:"#141416",flex:1,overflowY:"auto",borderRadius:"16px 16px 0 0",marginTop:60,padding:"16px 16px 100px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"#ccc"}}>ADD EXERCISE</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#888",fontSize:22,cursor:"pointer"}}>x</button>
        </div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{...INP,marginBottom:12}}/>
        <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
          {ALL_CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{flexShrink:0,padding:"7px 12px",background:cat===c?CC[c]:"rgba(255,255,255,0.05)",border:"none",color:cat===c?"#fff":"#888",borderRadius:20,fontSize:13,cursor:"pointer"}}>{CL[c]}</button>)}
        </div>
        {filtered.map(ex=>{
          const added=addedIds.has(ex.id);
          return(
            <div key={ex.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderLeft:"3px solid "+CC[cat],borderRadius:12,padding:"12px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:1,color:"#fff"}}>{ex.name}</div>
                <div style={{fontSize:12,color:"#bbb",marginTop:2}}>{ex.muscles}</div>
                <div style={{fontSize:11,color:"#666",marginTop:2,fontStyle:"italic"}}>{ex.cues}</div>
              </div>
              <button onClick={()=>{if(!added)onAdd({...ex,category:cat});}} style={{flexShrink:0,padding:"7px 12px",background:added?"rgba(0,201,167,0.15)":CC[cat],border:"none",color:added?JADE:"#fff",borderRadius:8,fontSize:13,cursor:added?"default":"pointer"}}>{added?"Added":"+ ADD"}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

//    Routine & Workout cards                                                 
function RoutineCard({routine,onStart,onDelete,onEdit}){
  const [open,setOpen]=useState(false);
  return(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderLeft:"3px solid "+ACCENT,borderRadius:12,marginBottom:10}}>
      <div style={{padding:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:1,color:"#fff"}}>{routine.name}</div>
            <div style={{fontSize:12,color:"#888",marginTop:2}}>{routine.exercises.length} exercises</div>
            <Badges types={inferTypes(routine.exercises)}/>
            <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
              {routine.exercises.slice(0,5).map((e,i)=><span key={i} style={{fontSize:11,background:"rgba(255,255,255,0.06)",borderRadius:4,padding:"2px 7px",color:"#bbb"}}>{e.name}</span>)}
              {routine.exercises.length>5&&<span style={{fontSize:11,color:"#666"}}>+{routine.exercises.length-5}</span>}
            </div>
          </div>
          <div style={{display:"flex",gap:6,flexShrink:0,marginLeft:8}}>
            <button onClick={()=>onEdit(routine)} style={{padding:"6px 10px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#ccc",borderRadius:6,fontSize:12,cursor:"pointer"}}>Edit</button>
            <button onClick={()=>onStart(routine)} style={{padding:"6px 14px",background:ACCENT,border:"none",color:"#fff",borderRadius:6,fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:1,cursor:"pointer"}}>START</button>
          </div>
        </div>
        <button onClick={()=>setOpen(!open)} style={{background:"none",border:"none",color:"#666",fontSize:12,cursor:"pointer",marginTop:6,padding:0}}>{open?"hide":"show details"}</button>
      </div>
      {open&&<div style={{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"10px 14px"}}>
        {routine.exercises.map((ex,i)=><div key={i} style={{marginBottom:6,fontSize:13,color:"#ccc"}}>{ex.name} - {ex.sets.length} sets</div>)}
        <button onClick={()=>onDelete(routine.id)} style={{marginTop:8,padding:"6px 12px",background:"rgba(255,60,60,0.15)",border:"1px solid rgba(255,60,60,0.3)",color:"#f87171",borderRadius:6,fontSize:12,cursor:"pointer"}}>Delete</button>
      </div>}
    </div>
  );
}

function WorkoutCard({workout,onDelete}){
  const [open,setOpen]=useState(false);
  const types=workout.types?.length?workout.types:(workout.type?[workout.type]:[]);
  return(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderLeft:"3px solid "+(types.length===1?(CC[types[0]]||"#888"):"#888"),borderRadius:12,marginBottom:10}}>
      <div onClick={()=>setOpen(!open)} style={{padding:14,cursor:"pointer"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:1,color:"#fff"}}>{workout.label||workout.routineName||"Workout"}</div>
            <div style={{fontSize:12,color:"#888",marginTop:2}}>{fmtDate(workout.date)}</div>
            <Badges types={types}/>
          </div>
          <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
            <div style={{fontSize:13,color:"#ccc"}}>{workout.exercises?.length||0} ex</div>
            {workout.durationMins>0&&<div style={{fontSize:12,color:ACCENT}}>{workout.durationMins} min</div>}
            {workout.calories>0&&<div style={{fontSize:12,color:JADE}}>~{workout.calories} kcal</div>}
          </div>
        </div>
      </div>
      {open&&<div style={{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"12px 14px"}}>
        {workout.exercises?.map((ex,i)=><div key={i} style={{marginBottom:6,fontSize:13,color:"#ccc"}}>{ex.name}{ex.sets?.length?" - "+ex.sets.length+" sets":""}</div>)}
        <button onClick={()=>onDelete(workout.id)} style={{marginTop:8,padding:"7px 14px",background:"rgba(255,60,60,0.15)",border:"1px solid rgba(255,60,60,0.3)",color:"#f87171",borderRadius:6,fontSize:13,cursor:"pointer"}}>Delete</button>
      </div>}
    </div>
  );
}

//    Session Timer                                                           
function SessionTimer({session,bw,onCancel,onLabelChange}){
  const [elapsed,setElapsed]=useState(0);
  useEffect(()=>{const id=setInterval(()=>setElapsed(Math.floor((Date.now()-session.startTime)/1000)),1000);return()=>clearInterval(id);},[session.startTime]);
  const m=Math.floor(elapsed/60),s=elapsed%60;
  const disp=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  const types=inferTypes(session.exercises);
  const cals=estCal(Math.max(1,Math.round(elapsed/60)),types.length?types:["bodyweight"],bw||185);
  return(
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"#ccc"}}>ACTIVE WORKOUT</div>
        <button onClick={onCancel} style={{background:"none",border:"1px solid rgba(255,255,255,0.1)",color:"#888",borderRadius:6,padding:"5px 10px",fontSize:12,cursor:"pointer"}}>x Cancel</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
        <div style={{background:"rgba(255,107,43,0.1)",border:"1px solid rgba(255,107,43,0.25)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:ACCENT,lineHeight:1}}>{disp}</div>
          <div style={{fontSize:10,color:"#888",marginTop:3}}>ELAPSED</div>
        </div>
        <div style={{background:"rgba(0,201,167,0.08)",border:"1px solid rgba(0,201,167,0.2)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:JADE,lineHeight:1}}>~{cals}</div>
          <div style={{fontSize:10,color:"#888",marginTop:3}}>KCAL</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#fff",lineHeight:1}}>{session.exercises.length}</div>
          <div style={{fontSize:10,color:"#888",marginTop:3}}>EXERCISES</div>
        </div>
      </div>
      <input value={session.label} onChange={e=>onLabelChange(e.target.value)} placeholder="Session label..." style={INP}/>
    </div>
  );
}

//    WeightInput                                                             
function WeightInput({bw,setBw}){
  const [draft,setDraft]=useState(String(bw));
  useEffect(()=>{setDraft(String(bw));},[bw]);
  function commit(v){const n=parseInt(v,10);if(!isNaN(n)&&n>=50&&n<=500){setBw(n);setDraft(String(n));}else setDraft(String(bw));}
  return(
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <input type="number" inputMode="numeric" value={draft} onChange={e=>setDraft(e.target.value)} onBlur={e=>commit(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")e.target.blur();}} min={50} max={500}
        style={{flex:1,background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,107,43,0.4)",color:"#fff",borderRadius:8,padding:14,fontSize:28,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,textAlign:"center",width:"100%",boxSizing:"border-box"}}/>
      <div style={{color:"#ccc",fontSize:18,fontFamily:"'Bebas Neue',sans-serif"}}>LBS</div>
    </div>
  );
}

//    Habit Tracker                                                           
const DAY_LBL=["Su","Mo","Tu","We","Th","Fr","Sa"];
const HTYPES=[{id:"check",label:"Checkbox"},{id:"yesno",label:"Yes / No"},{id:"rating",label:"Rating 1-5"},{id:"number",label:"Number"}];

function HabitTracker({sheetsUrl,onHabitsChange,onLogsChange}){
  const [habits,setHabits]=useState(()=>load("ft_habits_v1",[]));
  const [logs,setLogs]=useState(()=>load("ft_habitlogs_v1",{}));
  const [view,setView]=useState("today");
  const [adding,setAdding]=useState(false);
  const [hName,setHName]=useState("");
  const [hIcon,setHIcon]=useState("*");
  const [hType,setHType]=useState("check");
  const [hTarget,setHTarget]=useState(1);
  const [hUnit,setHUnit]=useState("");
  const todayStr=today();
  const weekDates=getWeekDates();
  function saveH(h){setHabits(h);save("ft_habits_v1",h);if(onHabitsChange)onHabitsChange(h);}
  function saveL(l){setLogs(l);save("ft_habitlogs_v1",l);if(onLogsChange)onLogsChange(l);}
  function getLog(id,d){return logs[d]?.[id];}
  function setLog(id,d,v){saveL({...logs,[d]:{...(logs[d]||{}),[id]:v}});}
  function isDone(h,d){const v=getLog(h.id,d);if(h.type==="check")return v===true;if(h.type==="yesno")return v==="yes";if(h.type==="rating")return(v||0)>=3;if(h.type==="number")return(v||0)>=h.target;return false;}
  function wkStr(h){return getWeekDates().filter(d=>isDone(h,d)).length;}
  function addHabit(){
    if(!hName.trim())return;
    const h={id:"habit_"+Date.now(),name:hName.trim(),icon:hIcon,type:hType,target:hType==="number"?hTarget:1,unit:hUnit.trim(),createdAt:todayStr};
    saveH([...habits,h]);setHName("");setHIcon("*");setHType("check");setHTarget(1);setHUnit("");setAdding(false);
  }
  const done=habits.filter(h=>isDone(h,todayStr)).length;
  const pct=habits.length?Math.round((done/habits.length)*100):0;

  function HInput({habit,dateStr}){
    const v=getLog(habit.id,dateStr);const isT=dateStr===todayStr;const d=isDone(habit,dateStr);
    if(habit.type==="check")return (<button onClick={()=>isT&&setLog(habit.id,dateStr,!d)} style={{width:34,height:34,borderRadius:8,border:"2px solid "+(d?AMBER:"rgba(255,255,255,0.15)"),background:d?AMBER+"33":"transparent",color:AMBER,cursor:isT?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>{d?"v":""}</button>);
    if(habit.type==="yesno")return (<div style={{display:"flex",gap:4}}>{["yes","no"].map(opt=><button key={opt} onClick={()=>isT&&setLog(habit.id,dateStr,opt)} style={{padding:"5px 10px",borderRadius:6,border:"1px solid "+(v===opt?(opt==="yes"?AMBER:"#ef4444"):"rgba(255,255,255,0.12)"),background:v===opt?(opt==="yes"?AMBER+"33":"rgba(239,68,68,0.2)"):"transparent",color:v===opt?(opt==="yes"?AMBER:"#ef4444"):"#bbb",fontSize:13,cursor:isT?"pointer":"default"}}>{opt==="yes"?"Y":"N"}</button>)}</div>);
    if(habit.type==="rating")return (<div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(n=><button key={n} onClick={()=>isT&&setLog(habit.id,dateStr,n)} style={{width:26,height:26,borderRadius:5,border:"none",background:(v||0)>=n?AMBER:"rgba(255,255,255,0.08)",color:(v||0)>=n?"#fff":"#888",fontSize:12,cursor:isT?"pointer":"default"}}>{n}</button>)}</div>);
    if(habit.type==="number"){const cur=v||0;const met=cur>=habit.target;return (<div style={{display:"flex",alignItems:"center",gap:6}}><button onClick={()=>isT&&setLog(habit.id,dateStr,Math.max(0,cur-1))} style={{width:28,height:28,borderRadius:6,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#ccc",fontSize:18,cursor:isT?"pointer":"default"}}>-</button><span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:met?AMBER:"#ccc",minWidth:28,textAlign:"center"}}>{cur}</span><button onClick={()=>isT&&setLog(habit.id,dateStr,cur+1)} style={{width:28,height:28,borderRadius:6,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#ccc",fontSize:18,cursor:isT?"pointer":"default"}}>+</button>{habit.unit&&<span style={{fontSize:12,color:"#888"}}>{habit.unit}</span>}</div>);}
    return null;
  }

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"#ccc"}}>HABIT TRACKER</div>
        <button onClick={()=>setAdding(!adding)} style={{padding:"7px 14px",background:adding?"rgba(255,255,255,0.06)":AMBER,border:"none",color:"#fff",borderRadius:8,fontFamily:"'Bebas Neue',sans-serif",fontSize:13,cursor:"pointer"}}>{adding?"CANCEL":"+ NEW"}</button>
      </div>
      {adding&&(
        <div style={{background:AMBER+"11",border:"1px solid "+AMBER+"33",borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <input value={hIcon} onChange={e=>setHIcon(e.target.value)} maxLength={2} style={{...INP,width:54,textAlign:"center",fontSize:22,flexShrink:0}}/>
            <input value={hName} onChange={e=>setHName(e.target.value)} placeholder="Habit name..." style={{...INP,flex:1}}/>
          </div>
          <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
            {HTYPES.map(t=><button key={t.id} onClick={()=>setHType(t.id)} style={{padding:"7px 12px",background:hType===t.id?AMBER:"rgba(255,255,255,0.05)",border:hType===t.id?"none":"1px solid rgba(255,255,255,0.1)",color:hType===t.id?"#fff":"#bbb",borderRadius:8,fontSize:13,cursor:"pointer"}}>{t.label}</button>)}
          </div>
          {hType==="number"&&(
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <div style={{flex:1}}><span style={SLB}>TARGET</span><input type="number" value={hTarget} onChange={e=>setHTarget(+e.target.value)} min={1} style={INP}/></div>
              <div style={{flex:1}}><span style={SLB}>UNIT</span><input value={hUnit} onChange={e=>setHUnit(e.target.value)} placeholder="glasses, mins..." style={INP}/></div>
            </div>
          )}
          <button onClick={addHabit} style={{width:"100%",padding:11,background:AMBER,border:"none",color:"#fff",borderRadius:8,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:1.5,cursor:"pointer"}}>SAVE HABIT</button>
        </div>
      )}
      {habits.length>0&&<div style={{display:"flex",gap:6,marginBottom:14}}>
        {["today","week"].map(v=><button key={v} onClick={()=>setView(v)} style={{flex:1,padding:9,background:view===v?AMBER:"rgba(255,255,255,0.05)",border:view===v?"none":"1px solid rgba(255,255,255,0.1)",color:view===v?"#fff":"#bbb",borderRadius:8,fontFamily:"'Bebas Neue',sans-serif",fontSize:13,cursor:"pointer"}}>{v==="today"?"TODAY":"THIS WEEK"}</button>)}
      </div>}
      {view==="today"&&habits.length>0&&(
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1}}><div style={{background:"rgba(255,255,255,0.08)",borderRadius:4,height:8,overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,background:AMBER,width:pct+"%",transition:"width 0.4s ease"}}/></div></div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:pct===100?AMBER:"#ccc"}}>{done}/{habits.length}</div>
        </div>
      )}
      {habits.length===0&&!adding&&<div style={{textAlign:"center",padding:"40px 20px",color:"#666"}}><div style={{fontSize:14}}>No habits yet - tap + NEW to start</div></div>}
      {view==="today"&&habits.map(h=>{const d=isDone(h,todayStr);return(
        <div key={h.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid "+(d?AMBER+"44":"rgba(255,255,255,0.08)"),borderLeft:"3px solid "+(d?AMBER:"rgba(255,255,255,0.15)"),borderRadius:12,padding:"12px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:20,flexShrink:0}}>{h.icon}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:1,color:d?"#fff":"#ccc"}}>{h.name}</div>
            <div style={{fontSize:12,color:"#888",marginTop:2}}>{wkStr(h)}/7 this week</div>
          </div>
          <HInput habit={h} dateStr={todayStr}/>
          <button onClick={()=>saveH(habits.filter(x=>x.id!==h.id))} style={{background:"none",border:"none",color:"#666",fontSize:16,cursor:"pointer",padding:"0 2px"}}>x</button>
        </div>
      );})}
      {view==="week"&&habits.map(h=>(
        <div key={h.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderLeft:"3px solid "+AMBER,borderRadius:12,padding:"12px 14px",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:20}}>{h.icon}</span>
            <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:"#fff"}}>{h.name}</div><div style={{fontSize:12,color:AMBER}}>{wkStr(h)}/7 days</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
            {weekDates.map((d,i)=>{const done=isDone(h,d);const isT=d===todayStr;return(
              <div key={d} style={{textAlign:"center"}}>
                <div style={{fontSize:11,color:isT?AMBER:"#888",marginBottom:4,fontFamily:"'Bebas Neue',sans-serif"}}>{DAY_LBL[i]}</div>
                <div style={{height:32,borderRadius:6,background:done?AMBER:"rgba(255,255,255,0.06)",border:isT?"1px solid "+AMBER:"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{done?"v":""}</div>
              </div>
            );})}
          </div>
        </div>
      ))}
    </div>
  );
}

//    Journal                                                                 
function Journal({habits,logs,workouts,sheetsUrl}){
  const [entries,setEntries]=useState(()=>load("ft_journal_v1",{}));
  const [draft,setDraft]=useState("");
  const [syncing,setSyncing]=useState(false);
  const [syncMsg,setSyncMsg]=useState("");
  const [viewing,setViewing]=useState(null);
  const todayStr=today();

  function habitSum(){
    if(!habits.length)return"No habits tracked.";
    return habits.map(h=>{const v=logs[todayStr]?.[h.id];let s="--";if(h.type==="check")s=v===true?"Done":"Not done";if(h.type==="yesno")s=v||"--";if(h.type==="rating")s=v?v+"/5":"--";if(h.type==="number")s=v!==undefined?v+(h.unit?" "+h.unit:""):"--";return h.name+": "+s;}).join(" | ");
  }
  function fitnessSum(){
    const tw=(workouts||[]).filter(w=>w.date===todayStr);
    if(!tw.length)return"No workout today.";
    return tw.map(w=>{const name=w.label||w.routineName||"Workout";const dur=w.durationMins?" ("+w.durationMins+" min)":"";return name+dur;}).join(" | ");
  }

  function saveEntry(){
    if(!draft.trim())return;
    const ts=new Date().toISOString();
    const entry={text:draft.trim(),timestamp:ts,habitSummary:habitSum(),fitnessSummary:fitnessSum()};
    const u={...entries,[todayStr]:entry};setEntries(u);save("ft_journal_v1",u);setDraft("");
    if(sheetsUrl){
      setSyncing(true);
      fetch(sheetsUrl,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({type:"journal",date:todayStr,timestamp:ts,text:entry.text,habitSummary:entry.habitSummary,fitnessSummary:entry.fitnessSummary})})
        .then(()=>{setSyncMsg("Synced to Sheets + Doc");setTimeout(()=>setSyncMsg(""),3000);})
        .catch(()=>{setSyncMsg("Saved locally");setTimeout(()=>setSyncMsg(""),3000);})
        .finally(()=>setSyncing(false));
    }
  }

  const sorted=Object.keys(entries).sort((a,b)=>b.localeCompare(a));
  const todayEntry=entries[todayStr];

  return(
    <div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,marginBottom:6,color:"#ccc"}}>JOURNAL</div>
      <div style={{fontSize:13,color:"#888",marginBottom:14}}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</div>

      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 14px",marginBottom:14}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:12,letterSpacing:2,color:"#888",marginBottom:8}}>TODAY AT A GLANCE</div>
        <div style={{fontSize:12,color:"#bbb",marginBottom:6,lineHeight:1.6}}><span style={{color:AMBER}}>Habits: </span>{habitSum()}</div>
        <div style={{fontSize:12,color:"#bbb",lineHeight:1.6}}><span style={{color:ACCENT}}>Fitness: </span>{fitnessSum()}</div>
      </div>

      {todayEntry?(
        <div style={{background:JADE+"11",border:"1px solid "+JADE+"33",borderLeft:"3px solid "+JADE,borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:1,color:JADE}}>TODAY</div>
            <div style={{fontSize:11,color:"#888"}}>{new Date(todayEntry.timestamp).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}</div>
          </div>
          <div style={{fontSize:14,color:"#ddd",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{todayEntry.text}</div>
          <button onClick={()=>{setDraft(todayEntry.text);const u={...entries};delete u[todayStr];setEntries(u);save("ft_journal_v1",u);}} style={{marginTop:10,padding:"6px 12px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#ccc",borderRadius:6,fontSize:13,cursor:"pointer"}}>Edit</button>
        </div>
      ):(
        <div style={{marginBottom:14}}>
          <textarea value={draft} onChange={e=>setDraft(e.target.value)} placeholder={"What is on your mind today?\n\nHow did you feel? What went well?"} rows={7}
            style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,color:"#ddd",padding:"12px 14px",fontSize:14,lineHeight:1.7,resize:"none",boxSizing:"border-box",fontFamily:"'DM Sans',sans-serif"}}/>
          <button onClick={saveEntry} disabled={!draft.trim()||syncing}
            style={{marginTop:8,width:"100%",padding:12,background:draft.trim()?JADE:"rgba(255,255,255,0.06)",border:"none",color:draft.trim()?"#fff":"#666",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:1.5,cursor:draft.trim()?"pointer":"default"}}>
            {syncing?"SYNCING...":"SAVE AND SYNC"}
          </button>
          {syncMsg&&<div style={{marginTop:8,padding:"8px 12px",background:"rgba(0,201,167,0.15)",borderRadius:8,fontSize:13,color:JADE}}>{syncMsg}</div>}
        </div>
      )}

      {sorted.filter(d=>d!==todayStr).length>0&&(
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:2,color:"#888",marginBottom:10}}>PAST ENTRIES</div>
          {sorted.filter(d=>d!==todayStr).map(d=>{
            const e=entries[d];const isOpen=viewing===d;
            return(
              <div key={d} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,marginBottom:8}}>
                <div onClick={()=>setViewing(isOpen?null:d)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:1,color:"#ccc"}}>{fmtDate(d)}</div>
                    <div style={{fontSize:12,color:"#888",marginTop:2}}>{e.text.slice(0,55)}{e.text.length>55?"...":""}</div>
                  </div>
                  <span style={{color:"#666",fontSize:14}}>{isOpen?"^":"v"}</span>
                </div>
                {isOpen&&(
                  <div style={{padding:"0 14px 14px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    <div style={{fontSize:14,color:"#ddd",lineHeight:1.7,whiteSpace:"pre-wrap",marginBottom:10,marginTop:10}}>{e.text}</div>
                    <div style={{fontSize:11,color:AMBER,marginBottom:4}}>Habits: {e.habitSummary}</div>
                    <div style={{fontSize:11,color:ACCENT}}>Fitness: {e.fitnessSummary}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

//    Main App                                                                
export default function App(){
  const [tab,setTab]=useState("habits");
  const [fitTab,setFitTab]=useState("routines");
  const [workouts,setWorkouts]=useState(()=>load("ft_workouts_v3",[]));
  const [routines,setRoutines]=useState(()=>load("ft_routines_v1",[]));
  const [bw,setBw]=useState(()=>load("ft_bodyweight_v1",225));
  const [habits,setHabitsState]=useState(()=>load("ft_habits_v1",[]));
  const [logs,setLogsState]=useState(()=>load("ft_habitlogs_v1",{}));
  const [session,setSession]=useState(null);
  const [showLib,setShowLib]=useState(false);
  const [building,setBuilding]=useState(null);
  const [logMsg,setLogMsg]=useState("");
  const SHEETS="";

  useEffect(()=>{
    const l=document.createElement("link");
    l.href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap";
    l.rel="stylesheet";document.head.appendChild(l);
  },[]);

  function startSession(exercises,label,routineName){
    const fresh=exercises.map(ex=>({...ex,sets:ex.sets.map(s=>({...s,done:false}))}));
    setSession({exercises:fresh,label:label||"",routineName:routineName||"",date:today(),notes:"",startTime:Date.now()});
    setFitTab("session");setTab("fitness");
  }
  function sAdd(ex){setSession(s=>({...s,exercises:[...s.exercises,blankEntry(ex)]}));setShowLib(false);}
  function sUpdSets(i,ns){setSession(s=>({...s,exercises:s.exercises.map((e,j)=>j===i?{...e,sets:ns}:e)}));}
  function sAddSet(i){setSession(s=>({...s,exercises:s.exercises.map((e,j)=>j===i?{...e,sets:[...e.sets,{...e.sets[e.sets.length-1],done:false}]}:e)}));}
  function sRemEx(i){setSession(s=>({...s,exercises:s.exercises.filter((_,j)=>j!==i)}));}
  function saveSession(){
    if(!session||session.exercises.length===0){setLogMsg("Add at least one exercise.");return;}
    const types=inferTypes(session.exercises);
    const dur=session.startTime?Math.round((Date.now()-session.startTime)/60000):0;
    const cal=estCal(dur,types,bw);
    const w={id:Date.now(),date:session.date,types,label:session.label,routineName:session.routineName,notes:session.notes,exercises:session.exercises,durationMins:dur,calories:cal};
    const u=[w,...workouts];setWorkouts(u);save("ft_workouts_v3",u);
    setSession(null);setFitTab("history");setLogMsg("");
  }
  function newRoutine(){setBuilding({name:"",exercises:[]});setFitTab("builder");setTab("fitness");}
  function editRoutine(r){setBuilding({...r,exercises:r.exercises.map(e=>({...e,sets:e.sets.map(s=>({...s}))}))});setFitTab("builder");setTab("fitness");}
  function bAdd(ex){setBuilding(b=>({...b,exercises:[...b.exercises,blankEntry(ex)]}));setShowLib(false);}
  function bUpdSets(i,ns){setBuilding(b=>({...b,exercises:b.exercises.map((e,j)=>j===i?{...e,sets:ns}:e)}));}
  function bAddSet(i){setBuilding(b=>({...b,exercises:b.exercises.map((e,j)=>j===i?{...e,sets:[...e.sets,{...e.sets[e.sets.length-1],done:false}]}:e)}));}
  function bRemEx(i){setBuilding(b=>({...b,exercises:b.exercises.filter((_,j)=>j!==i)}));}
  function saveRoutine(){
    if(!building.name.trim()){setLogMsg("Give your routine a name.");return;}
    if(building.exercises.length===0){setLogMsg("Add at least one exercise.");return;}
    const r={...building,id:building.id||Date.now()};
    const u=building.id?routines.map(x=>x.id===r.id?r:x):[r,...routines];
    setRoutines(u);save("ft_routines_v1",u);setBuilding(null);setFitTab("routines");setLogMsg("");
  }

  const last30=workouts.filter(w=>{const d=new Date(w.date+"T12:00:00"),c=new Date();c.setDate(c.getDate()-30);return d>=c;});
  const activeIds=new Set(fitTab==="session"?(session?.exercises||[]).map(e=>e.id):fitTab==="builder"?(building?.exercises||[]).map(e=>e.id):[]);
  const showNav=!(tab==="fitness"&&(fitTab==="session"||fitTab==="builder"));
  const NAV=[{id:"habits",label:"Habits"},{id:"fitness",label:"Fitness"},{id:"journal",label:"Journal"},{id:"settings",label:"Settings"}];
  const FIT=[{id:"routines",label:"Routines"},{id:"log",label:"Log"},{id:"history",label:"History"},{id:"stats",label:"Stats"}];

  return(
    <div style={{maxWidth:430,margin:"0 auto",minHeight:"100vh",background:"#0d0d0f",fontFamily:"'DM Sans',sans-serif",color:"#fff",paddingBottom:80}}>

      {/* Header */}
      <div style={{padding:"18px 20px 12px",borderBottom:"1px solid rgba(255,255,255,0.07)",background:"linear-gradient(180deg,rgba(255,107,43,0.08) 0%,transparent 100%)"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:3,color:ACCENT}}>TRACKER</div>
        <div style={{fontSize:11,color:"#888",letterSpacing:1.5,textTransform:"uppercase",marginTop:1}}>Habits - Fitness - Life</div>
        {tab==="fitness"&&fitTab==="session"&&session&&<div style={{fontSize:13,color:ACCENT,marginTop:2}}>{session.routineName||"Active Session"}</div>}
        {tab==="fitness"&&fitTab==="builder"&&<div style={{fontSize:13,color:"#a78bfa",marginTop:2}}>{building?.id?"Editing Routine":"New Routine"}</div>}
      </div>

      <div style={{padding:"14px 16px 0"}}>

        {/* HABITS */}
        {tab==="habits"&&<HabitTracker sheetsUrl={SHEETS} onHabitsChange={setHabitsState} onLogsChange={setLogsState}/>}

        {/* JOURNAL */}
        {tab==="journal"&&<Journal habits={habits} logs={logs} workouts={workouts} sheetsUrl={SHEETS}/>}

        {/* SETTINGS */}
        {tab==="settings"&&(
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,marginBottom:20,color:"#ccc"}}>SETTINGS</div>
            <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:16,marginBottom:14}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2,color:ACCENT,marginBottom:4}}>BODY WEIGHT</div>
              <div style={{fontSize:13,color:"#888",marginBottom:14}}>Used for calorie estimates.</div>
              <WeightInput bw={bw} setBw={v=>{setBw(v);save("ft_bodyweight_v1",v);}}/>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                {[-5,-1,1,5].map(d=><button key={d} onClick={()=>{const v=Math.max(50,Math.min(500,bw+d));setBw(v);save("ft_bodyweight_v1",v);}} style={{flex:1,padding:"10px 0",background:d<0?"rgba(0,201,167,0.12)":"rgba(255,107,43,0.12)",border:"1px solid "+(d<0?"rgba(0,201,167,0.3)":"rgba(255,107,43,0.3)"),color:d<0?JADE:ACCENT,borderRadius:8,fontSize:16,fontFamily:"'Bebas Neue',sans-serif",cursor:"pointer"}}>{d>0?"+"+d:d}</button>)}
              </div>
              <div style={{marginTop:10,fontSize:13,color:"#888",textAlign:"center"}}>{(bw*0.453592).toFixed(1)} kg</div>
            </div>
            <div style={{background:"rgba(0,201,167,0.06)",border:"1px solid rgba(0,201,167,0.15)",borderRadius:12,padding:14}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:2,color:JADE,marginBottom:10}}>CALORIE ESTIMATES AT {bw} LBS</div>
              {[["30 min Kettlebell",["kettlebell"]],["30 min Bodyweight",["bodyweight"]],["30 min Brisk Walk",["walking"]],["30 min Run",["running"]],["30 min Kayaking",["kayaking"]],["30 min Cycling",["cycling"]],["30 min Yoga",["yoga"]],["30 min PT Rehab",["pt"]]].map(([label,types])=>(
                <div key={label} style={{display:"flex",justifyContent:"space-between",paddingBottom:8,marginBottom:8,borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <span style={{fontSize:13,color:"#bbb"}}>{label}</span>
                  <span style={{fontSize:14,color:JADE,fontFamily:"'Bebas Neue',sans-serif"}}>~{estCal(30,types,bw)} kcal</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FITNESS */}
        {tab==="fitness"&&(
          <div>
            {fitTab!=="session"&&fitTab!=="builder"&&(
              <div style={{display:"flex",gap:6,marginBottom:14}}>
                {FIT.map(ft=><button key={ft.id} onClick={()=>setFitTab(ft.id)} style={{flex:1,padding:"8px 4px",background:fitTab===ft.id?ACCENT:"rgba(255,255,255,0.05)",border:fitTab===ft.id?"none":"1px solid rgba(255,255,255,0.1)",color:fitTab===ft.id?"#fff":"#bbb",borderRadius:20,fontSize:12,cursor:"pointer",whiteSpace:"nowrap"}}>{ft.label}</button>)}
              </div>
            )}

            {/* Routines list */}
            {fitTab==="routines"&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"#ccc"}}>MY ROUTINES</div>
                  <button onClick={newRoutine} style={{padding:"8px 16px",background:ACCENT,border:"none",color:"#fff",borderRadius:8,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,cursor:"pointer"}}>+ NEW</button>
                </div>
                {routines.length===0
                  ?<div style={{textAlign:"center",padding:"40px 20px",color:"#666",fontSize:14}}>No routines yet. Tap + NEW to build one.</div>
                  :routines.map(r=><RoutineCard key={r.id} routine={r} onStart={r=>startSession(r.exercises,r.name,r.name)} onEdit={editRoutine} onDelete={id=>{const u=routines.filter(x=>x.id!==id);setRoutines(u);save("ft_routines_v1",u);}}/>)
                }
              </div>
            )}

            {/* Active session */}
            {fitTab==="session"&&session&&(
              <div>
                <SessionTimer session={session} bw={bw} onCancel={()=>{if(window.confirm("Abandon session?")){setSession(null);setFitTab("routines");}}} onLabelChange={v=>setSession(s=>({...s,label:v}))}/>
                {session.exercises.length===0
                  ?<div style={{textAlign:"center",padding:"28px 20px",background:"rgba(255,255,255,0.02)",borderRadius:12,border:"1px dashed rgba(255,255,255,0.08)",marginBottom:12,fontSize:14,color:"#888"}}>Tap + ADD EXERCISE below</div>
                  :session.exercises.map((ex,i)=><ExBlock key={ex.id+i} ex={ex} onUpdateSets={ns=>sUpdSets(i,ns)} onAddSet={()=>sAddSet(i)} onRemove={()=>sRemEx(i)}/>)
                }
                <textarea value={session.notes} onChange={e=>setSession(s=>({...s,notes:e.target.value}))} placeholder="Notes..." rows={2} style={{...INP,resize:"none",marginBottom:10,marginTop:4}}/>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setShowLib(true)} style={{flex:1,padding:12,background:"rgba(255,107,43,0.12)",border:"1px solid rgba(255,107,43,0.3)",color:ACCENT,borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:1.5,cursor:"pointer"}}>+ ADD EXERCISE</button>
                  <button onClick={saveSession} style={{flex:1,padding:12,background:ACCENT,border:"none",color:"#fff",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:1.5,cursor:"pointer"}}>SAVE</button>
                </div>
                {logMsg&&<div style={{marginTop:10,padding:"10px 14px",background:"rgba(255,60,60,0.15)",borderRadius:8,fontSize:13,color:"#f87171"}}>{logMsg}</div>}
              </div>
            )}

            {/* Routine builder */}
            {fitTab==="builder"&&building&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"#ccc"}}>{building.id?"EDIT":"BUILD"} ROUTINE</div>
                  <button onClick={()=>{setBuilding(null);setFitTab("routines");}} style={{background:"none",border:"1px solid rgba(255,255,255,0.1)",color:"#888",borderRadius:6,padding:"5px 10px",fontSize:12,cursor:"pointer"}}>Cancel</button>
                </div>
                <span style={SLB}>ROUTINE NAME</span>
                <input value={building.name} onChange={e=>setBuilding(b=>({...b,name:e.target.value}))} placeholder="e.g. Monday KB Complex..." style={{...INP,marginBottom:14}}/>
                {building.exercises.map((ex,i)=><ExBlock key={ex.id+i} ex={ex} onUpdateSets={ns=>bUpdSets(i,ns)} onAddSet={()=>bAddSet(i)} onRemove={()=>bRemEx(i)}/>)}
                <div style={{display:"flex",gap:8,marginTop:4}}>
                  <button onClick={()=>setShowLib(true)} style={{flex:1,padding:12,background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.3)",color:"#a78bfa",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:1.5,cursor:"pointer"}}>+ ADD EXERCISE</button>
                  <button onClick={saveRoutine} style={{flex:1,padding:12,background:"#a78bfa",border:"none",color:"#fff",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:1.5,cursor:"pointer"}}>SAVE ROUTINE</button>
                </div>
                {logMsg&&<div style={{marginTop:10,padding:"10px 14px",background:"rgba(255,60,60,0.15)",borderRadius:8,fontSize:13,color:"#f87171"}}>{logMsg}</div>}
              </div>
            )}

            {/* Free log */}
            {fitTab==="log"&&!session&&(
              <div style={{textAlign:"center",padding:"30px 20px",background:"rgba(255,255,255,0.03)",borderRadius:12,border:"1px solid rgba(255,255,255,0.07)"}}>
                <div style={{fontSize:14,color:"#ccc",marginBottom:6}}>Start a free-form session</div>
                <div style={{fontSize:13,color:"#888",marginBottom:16}}>No routine needed. Add exercises as you go.</div>
                <button onClick={()=>startSession([],"","")} style={{padding:"12px 28px",background:ACCENT,border:"none",color:"#fff",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:1.5,cursor:"pointer"}}>START SESSION</button>
              </div>
            )}
            {fitTab==="log"&&session&&(
              <div style={{textAlign:"center",padding:20}}>
                <div style={{fontSize:13,color:"#888",marginBottom:10}}>Session in progress</div>
                <button onClick={()=>setFitTab("session")} style={{padding:"10px 20px",background:ACCENT,border:"none",color:"#fff",borderRadius:8,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,cursor:"pointer"}}>BACK TO SESSION</button>
              </div>
            )}

            {/* History */}
            {fitTab==="history"&&(
              <div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,marginBottom:14,color:"#ccc"}}>WORKOUT HISTORY</div>
                {workouts.length===0
                  ?<div style={{textAlign:"center",padding:"40px 20px",color:"#666",fontSize:14}}>No workouts yet.</div>
                  :workouts.map(w=><WorkoutCard key={w.id} workout={w} onDelete={id=>{const u=workouts.filter(x=>x.id!==id);setWorkouts(u);save("ft_workouts_v3",u);}}/>)
                }
              </div>
            )}

            {/* Stats */}
            {fitTab==="stats"&&(
              <div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,marginBottom:14,color:"#ccc"}}>STATS - LAST 30 DAYS</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                  {[
                    {label:"Sessions",val:last30.length},
                    {label:"This Week",val:last30.filter(w=>{const d=new Date(w.date+"T12:00:00"),c=new Date();c.setDate(c.getDate()-7);return d>=c;}).length},
                    {label:"Total Mins",val:last30.reduce((a,w)=>a+(w.durationMins||0),0)},
                    {label:"Total kcal",val:last30.reduce((a,w)=>a+(w.calories||0),0)},
                  ].map((s,i)=>(
                    <div key={i} style={{background:"rgba(255,107,43,0.08)",border:"1px solid rgba(255,107,43,0.2)",borderRadius:12,padding:14,textAlign:"center"}}>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:ACCENT,lineHeight:1.1}}>{s.val}</div>
                      <div style={{fontSize:11,color:"#888",marginTop:3}}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:12,letterSpacing:2,color:"#888",marginBottom:10}}>TRAINING MIX</div>
                {ALL_CATS.map(cat=>{
                  const count=last30.filter(w=>(w.types||[]).includes(cat)).length;
                  const mx=Math.max(...ALL_CATS.map(c=>last30.filter(w=>(w.types||[]).includes(c)).length),1);
                  return(
                    <div key={cat} style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontSize:13,color:"#ccc"}}>{CL[cat]}</span>
                        <span style={{fontSize:13,color:"#888"}}>{count}</span>
                      </div>
                      <div style={{background:"rgba(255,255,255,0.06)",borderRadius:4,height:8,overflow:"hidden"}}>
                        <div style={{height:"100%",borderRadius:4,background:CC[cat],width:(count/mx)*100+"%",transition:"width 0.5s ease"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Library picker */}
      {showLib&&<LibPicker addedIds={activeIds} onAdd={fitTab==="builder"?bAdd:sAdd} onClose={()=>setShowLib(false)}/>}

      {/* Bottom nav */}
      {showNav&&(
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(13,13,15,0.97)",borderTop:"1px solid rgba(255,255,255,0.08)",display:"flex",padding:"8px 0 14px",zIndex:10}}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 0"}}>
              <div style={{fontSize:13,letterSpacing:2,fontFamily:"'Bebas Neue',sans-serif",fontWeight:"bold",color:tab===n.id?"#fff":"#666",borderBottom:tab===n.id?"2px solid "+ACCENT:"2px solid transparent",paddingBottom:4,minWidth:44,textAlign:"center"}}>
                {n.label.toUpperCase()}
              </div>
            </button>
          ))}
        </div>
      )}
      {!showNav&&(
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(13,13,15,0.97)",borderTop:"1px solid rgba(255,255,255,0.08)",padding:"10px 16px 16px",zIndex:10}}>
          <div style={{fontSize:12,color:"#888",textAlign:"center",letterSpacing:1,fontFamily:"'Bebas Neue',sans-serif"}}>{fitTab==="session"?"SESSION IN PROGRESS":"BUILDING ROUTINE"} - scroll up</div>
        </div>
      )}
    </div>
  );
}
