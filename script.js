const intro = document.getElementById("intro");
const main = document.getElementById("mainContent");
const footer = document.getElementById("footer");
const openBtn = document.getElementById("openBtn");
const letterBtn = document.getElementById("letterBtn");
const wishBtn = document.getElementById("wishBtn");
const finalBtn = document.getElementById("finalBtn");
const finalMessage = document.getElementById("finalMessage");
const audio = document.getElementById("music");
const playBtn = document.getElementById("playBtn");
const record = document.getElementById("record");
const volume = document.getElementById("volume");
const letterText = document.getElementById("letterText");

const letter = `I hope you know how genuinely happy I am to call you my friend.

You have this lovely way of making conversations more fun, ordinary moments more memorable, and days a little brighter just by being yourself.

On your birthday, I don't want to wish you only the usual things. I want to wish you peaceful days when you need them, exciting days when you want them, people who appreciate you, and plenty of moments that make you laugh until your cheeks hurt.

Keep chasing the things that make you happy. Keep that beautiful smile. And whenever life gets a little crazy, remember that you have a friend cheering for you from the sidelines.

So here's to you, Saumya — to another year, another chapter, and lots of new memories.

Happy Birthday! 🎂💗`;

function confetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const pieces = Array.from({length: 170}, () => ({
    x: innerWidth / 2, y: innerHeight * .32,
    vx: (Math.random()-.5)*14, vy: -Math.random()*13-4,
    s: Math.random()*8+4, r: Math.random()*6, vr:(Math.random()-.5)*.35,
    life:1, hue:Math.random()*360
  }));
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let alive=false;
    pieces.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=.25;p.r+=p.vr;p.life-=.009;
      if(p.life>0) alive=true;
      ctx.save();ctx.globalAlpha=Math.max(0,p.life);
      ctx.translate(p.x,p.y);ctx.rotate(p.r);
      ctx.fillStyle=`hsl(${p.hue},85%,65%)`;
      ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);ctx.restore();
    });
    if(alive) requestAnimationFrame(draw);
  }
  draw();
}

function typeLetter(){
  letterText.textContent="";
  let i=0;
  const timer=setInterval(()=>{
    letterText.textContent += letter[i++];
    if(i>=letter.length) clearInterval(timer);
  }, 14);
}

openBtn.addEventListener("click",()=>{
  intro.classList.add("hidden");
  main.classList.remove("hidden");
  footer.classList.remove("hidden-footer");
  confetti();
  setTimeout(()=>document.getElementById("letter").scrollIntoView({behavior:"smooth"}),500);
  setTimeout(typeLetter,800);
});

letterBtn.addEventListener("click",()=>{
  document.getElementById("letter").scrollIntoView({behavior:"smooth"});
  setTimeout(typeLetter,500);
});

wishBtn.addEventListener("click",()=>{
  confetti();
  wishBtn.textContent="Wish sent into the universe! ✨";
  wishBtn.disabled=true;
});

finalBtn.addEventListener("click",()=>{
  finalMessage.classList.add("show");
  finalBtn.textContent="Happy Birthday, Saumya 💗";
  confetti();
  setTimeout(()=>finalMessage.scrollIntoView({behavior:"smooth",block:"center"}),150);
});

playBtn.addEventListener("click",()=>{
  if(audio.paused){
    audio.play().then(()=>{
      playBtn.textContent="⏸ Pause";
      record.classList.add("playing");
    }).catch(()=>{
      document.getElementById("musicNote").innerHTML="Please add your MP3 as <b>music/birthday.mp3</b>, then press Play.";
    });
  }else{
    audio.pause();
    playBtn.textContent="▶ Play";
    record.classList.remove("playing");
  }
});
audio.addEventListener("ended",()=>{
  playBtn.textContent="▶ Play";
  record.classList.remove("playing");
});
volume.addEventListener("input",()=>audio.volume=volume.value);

const bg=document.querySelector(".background-hearts");
for(let i=0;i<18;i++){
  const s=document.createElement("span");
  s.textContent=["♡","♥","✦","✧"][Math.floor(Math.random()*4)];
  s.style.left=Math.random()*100+"%";
  s.style.animationDuration=(10+Math.random()*14)+"s";
  s.style.animationDelay=(-Math.random()*15)+"s";
  s.style.fontSize=(14+Math.random()*20)+"px";
  bg.appendChild(s);
}
