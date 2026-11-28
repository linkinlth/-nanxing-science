(function(){
'use strict';
/* ====== 資料 ====== */
var ISLANDS=[
 {id:'pharaoh',name:'法老島',emo:'👑',color:'#DB6A41',cover:'2497',pos:[0,0],
  hello:'法老島到了！看看國王長什麼樣子。',
  stops:[
  ['2489','大法老在門口','歡迎！法老是古埃及的國王。他在門口等你。'],
  ['2497','大大的法老頭','看他的鬍子和額頭。額頭上有一條小蛇喔！'],
  ['2498','白冠法老頭','這是圖特摩斯三世，戴著高高的白冠。你看到額頭上小蛇的身體了嗎？',103],
  ['2499','紅臉法老','他的臉紅紅的，帽子好高。你覺得重不重？'],
  ['2503','塞提二世坐坐','法老坐得好端正。他膝蓋上的小神龕，有一顆羊頭喔！',104],
  ['2570','歐西里斯國王','他雙手交叉在胸前，裝扮成冥界的國王歐西里斯。他是阿蒙霍特普一世。',129],
  ['2508','還沒做完的法老','他一腳向前，戴著條紋頭巾。我們一起學他站！'],
  ['2567','好大的假髮','哇，好大的假髮！古埃及人很愛漂亮。']]},
 {id:'gods',name:'神明島',emo:'🦁',color:'#3e7c8c',cover:'2537',pos:[1,0],
  hello:'神明島到了！有好多動物頭的神。',
  stops:[
  ['2515','隼神拉-哈拉胡提','這位神有鳥的頭、人的身體。他是拉美西斯二世的守護神。',105],
  ['2521','獅身人面','獅子的身體，人的臉。好特別！'],
  ['2537','獅子頭女神','她是塞赫麥特女神，有獅子的頭，很有力量！',110],
  ['2540','歡呼的銅人','三個銅人跪著，手舉高高在歡呼。有國王，還有豺狼頭和隼頭的神。',112],
  ['2571','動物頭的神','他們有動物的頭。你覺得左邊是什麼動物？'],
  ['2528','哈索爾的臉','彎彎的長頭髮，臉帶微笑。這是快樂女神哈索爾嗎？它好像在說：你好！']]},
 {id:'treasure',name:'寶物島',emo:'💎',color:'#3d7a52',cover:'2543',pos:[0.5,1],
  hello:'寶物島到了！來找小小的寶貝。',
  stops:[
  ['2511','瑪特小雕像','小小的盒子上站著瑪特女神，頭上有一根羽毛，代表公平。'],
  ['2543','小小人偶','小人偶會幫忙做事。古埃及人這樣相信。'],
  ['2568','彩色棺木','這是神廟守門人亞赫摩斯的棺木底座。顏色到現在還好鮮豔！',130],
  ['2541','小小神廟','好小的小房子！藍色的光讓它像在發亮。'],
  ['2559','大漩渦','石頭上有一個大漩渦。你看到了嗎？'],
  ['2557','尖尖石頭','尖尖的，像小金字塔。四面都有小人。'],
  ['2555','好長的亡靈書','這是一張很老的莎草紙。女祭司在送禮物給冥界之王歐西里斯。',118]]},
 {id:'stone',name:'石頭字島',emo:'🪨',color:'#7a5a8a',cover:'2512',pos:[1.5,1],
  hello:'石頭字島到了！石頭上藏著古埃及的字。',
  stops:[
  ['2512','國王獻上瑪特','石頭上，國王捧著小小的瑪特女神，要送給神明。上面還刻滿古埃及的字！'],
  ['2532','石頭故事書','石頭上有小人在走路，還有字。像一本石頭畫的書。'],
  ['2523','高高的方尖碑','高高瘦瘦的石柱，上面刻著字。'],
  ['2562','好多好多字','哇，這麼多字！你能找到一隻動物嗎？'],
  ['2545','國王名字框框','框框裡是國王的名字。拉美西斯二世把名字刻在別人的上面！',113],
  ['2563','方塊官員塞內弗','這個人坐成一個方塊！身上的斗篷寫滿了字。',116]]}
];
var SYMBOLS=[
 {id:'ankh',name:'安卡',mean:'生命',
  clue:'我像一把鑰匙，上面有一個圓圈。',fact:'安卡的意思是「生命」，也叫「生命的鑰匙」。古埃及的神常把它遞給法老，像是送他呼吸和新的生命。',
  svg:'<g fill="none" stroke="#a5442a" stroke-width="9" stroke-linecap="round"><ellipse cx="50" cy="30" rx="15" ry="19"/><path d="M50 49V92M28 60H72"/></g>'},
 {id:'eye',name:'荷魯斯之眼',mean:'保護',
  clue:'我是一隻大眼睛，還有眉毛和小尾巴。',fact:'荷魯斯是鷹頭的天空神。他打架時弄丟了一隻眼睛，智慧神托特幫他修好。所以它代表治好和平安，常畫在棺木和船上。',
  svg:'<g fill="none" stroke="#2f6170" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 54C26 34 60 32 84 52C62 64 28 68 10 54Z" fill="#e6f1f1"/><circle cx="48" cy="50" r="10" fill="#2f6170"/><path d="M14 38C30 24 62 22 86 38"/><path d="M46 66V80Q46 90 36 90M62 62Q76 72 72 84Q68 92 58 88"/></g>'},
 {id:'scarab',name:'聖甲蟲',mean:'新的開始',
  clue:'我是一隻小甲蟲，頭上頂著太陽。',fact:'聖甲蟲就是推糞球的糞金龜。小蟲會從球裡長出來，所以它代表重生。太陽神赫普里就是甲蟲的樣子！',dex:121,
  svg:'<g stroke="#2f6170" stroke-width="4" stroke-linejoin="round"><circle cx="50" cy="13" r="9" fill="#f5d33a" stroke="#c06a1b" stroke-width="3"/><ellipse cx="50" cy="60" rx="21" ry="26" fill="#3e7c8c"/><path d="M50 36V86" stroke="#cfe2e2"/><path d="M38 33Q50 20 62 33Q50 40 38 33Z" fill="#2f6170"/><path d="M30 52L10 44M30 64L8 68M33 78L14 92M70 52L90 44M70 64L92 68M67 78L86 92" fill="none" stroke-linecap="round" stroke-width="6"/></g>'},
 {id:'lotus',name:'蓮花',mean:'重新醒來',
  clue:'我是一朵花，天亮就會打開。',fact:'蓮花早上跟著太陽打開，晚上又合起來。古埃及人說，世界上第一朵蓮花裡住著太陽神，所以它是「太陽的花朵」。',dex:111,
  svg:'<g stroke="#9a3a63" stroke-width="4" stroke-linejoin="round"><path d="M12 46C14 62 30 74 50 76C34 66 24 56 12 46Z" fill="#fbf3ec"/><path d="M88 46C86 62 70 74 50 76C66 66 76 56 88 46Z" fill="#fbf3ec"/><path d="M26 30C22 52 34 68 50 74C48 56 40 40 26 30Z" fill="#f2c9b3"/><path d="M74 30C78 52 66 68 50 74C52 56 60 40 74 30Z" fill="#f2c9b3"/><path d="M50 16C38 36 38 56 50 74C62 56 62 36 50 16Z" fill="#e98a66"/></g><path d="M50 76V94" stroke="#3d7a52" stroke-width="6" stroke-linecap="round"/>'},
 {id:'feather',name:'瑪特羽毛',mean:'公平',
  clue:'我是一根輕輕的羽毛。',fact:'瑪特是真理和公平的女神，羽毛是她的記號。古埃及人相信，死後要用天秤量心，心像羽毛一樣輕才好。你的心會一樣輕嗎？',
  svg:'<g stroke="#c06a1b" stroke-linecap="round" stroke-linejoin="round"><path d="M50 8C28 24 28 60 50 88C72 60 72 24 50 8Z" fill="#fff1d6" stroke-width="5"/><path d="M50 10V96" stroke-width="5"/><path d="M50 30L36 40M50 46L34 58M50 62L38 74M50 30L64 40M50 46L66 58M50 62L62 74" stroke-width="3"/></g>'},
 {id:'djed',name:'傑德柱',mean:'穩穩的',
  clue:'我像一根柱子，上面有好幾條橫線。',fact:'傑德柱像一根不倒的柱子，也有人說像一節一節的背骨。它代表穩定和永恆，跟冥界之王歐西里斯有關。',
  svg:'<g fill="none" stroke="#3d5a41" stroke-width="8" stroke-linecap="round"><path d="M50 14V90M34 90H66"/><path d="M28 20H72M31 34H69M34 48H66"/><path d="M50 14V8" stroke-width="10"/></g>'},
 {id:'uraeus',name:'聖蛇',mean:'守護',
  clue:'我是抬起頭的眼鏡蛇，法老的額頭上有我。',fact:'聖蛇是抬頭的眼鏡蛇，戴在法老的額頭，像第三隻眼。古埃及人相信它會噴火趕走壞人。回去看看，法老額頭上有嗎？',dex:103,
  peek:'2497',
  svg:'<g stroke="#2b5a3b" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="50" cy="82" rx="30" ry="11" fill="#5ebd7a"/><ellipse cx="50" cy="74" rx="21" ry="9" fill="#7fd09a"/><path d="M50 26L24 62Q50 78 76 62Z" fill="#5ebd7a"/><path d="M50 36V66M40 44L36 62M60 44L64 62" fill="none" stroke="#d9e7cd" stroke-width="3"/><ellipse cx="50" cy="20" rx="12" ry="13" fill="#5ebd7a"/><circle cx="45" cy="18" r="2.6" fill="#211d1d"/><circle cx="55" cy="18" r="2.6" fill="#211d1d"/><path d="M50 32V38M50 38L46 42M50 38L54 42" fill="none" stroke="#c85a33" stroke-width="2.5"/></g>'}
];
var MASCOT_LINES=['點一個島，開始探險！','我最喜歡獅子頭女神！','找找看，哪裡有小蛇？','你好棒，繼續走！','古埃及人很愛畫畫喔。'];

var DEX=[
 [103,'白冠法老頭',['這是法老圖特摩斯三世的頭，戴著高高的白冠。','額頭上本來有一條小蛇，現在蛇頭不見了。','他打仗好厲害，十七次都贏了！']],
 [104,'塞提二世坐坐',['塞提二世坐得端端正正，戴著長長的假髮。','他膝蓋上有個小神龕，上面有一顆羊頭。','椅子旁邊的蓮花和莎草，代表上、下埃及合在一起。']],
 [105,'隼神守護者',['這是鳥頭的神，叫拉-哈拉胡提，是拉美西斯二世的守護神。','他是太陽神拉和天空神荷魯斯合在一起的神。','拉美西斯二世當法老，當到九十幾歲呢！']],
 [106,'那爾邁調色板',['這是一塊很古老的石板，展覽的是複製品。','它本來是用來磨化妝粉的。','上面刻著那爾邁國王，把上、下埃及合成一國的故事。']],
 [107,'改名字的雕像',['這是小小的圖坦卡門雕像。','後來的國王霍朗赫布，想把它改成自己的。','可是工匠刻到一半，發現字的方向弄錯了，就停下來了！']],
 [108,'超大拳頭',['這是拉美西斯二世巨像的左拳頭，用紅色花崗岩做的。','原本的雕像超級大，可能站在普塔神廟門口。','1798 年被拿破崙的隊伍發現，後來送到大英博物館。']],
 [109,'鱷魚神門楣',['門楣上趴著鱷魚神索貝克。','他會保護大家，不被尼羅河的災難傷害。','中間是國王的名字，左右兩邊長得一模一樣！']],
 [110,'獅子頭女神',['她是塞赫麥特女神，有一顆獅子頭。','傳說她很兇，人們做了好多雕像來安撫她。','阿蒙霍特普三世可能做了 730 座，一年的每一天都有！']],
 [111,'送花給女神',['托勒密一世拿著兩株花，送給快樂女神哈索爾。','一株是蓮花，一株是莎草，代表上、下埃及合在一起。','哈索爾頭上有牛角和太陽，大家看起來好開心！']],
 [112,'歡呼的銅人',['三個銅人跪著，一隻手握拳舉高高，像在歡呼！','中間是戴條紋頭巾的國王，旁邊是豺狼頭和隼頭的神。','它們是用蠟做出形狀，再倒進熱熱的銅水做成的。']],
 [113,'疊起來的名字',['這塊石頭上有兩個國王的名字框。','拉美西斯二世很愛把自己的名字，刻在以前國王的名字上。','你看，兩個框框大小不一樣，念的方向也不一樣！']],
 [114,'國王和王后',['這對夫妻並排坐著，椅腳是獅子的爪子。','男生是還沒當國王的霍朗赫布，他是個軍人。','女生可能是他的太太阿美妮亞。']],
 [115,'彩色磁磚',['這些彩色磁磚，是拉美西斯三世留下來的。','有些磚上畫著外國人，穿著他們特別的衣服。','還有一隻舉手的小鳥叫雷基特，代表所有的埃及人民。']],
 [116,'方塊官員',['塞內弗坐成方方的樣子，披著一件大斗篷。','斗篷上刻滿字，寫著他希望死後有人送食物給他。','他是圖特摩斯三世管錢的大臣喔！']],
 [117,'假門的牆',['這面牆來自古埃及人的墳墓。','中間的假門是靈魂的出入口，家人會在門前放食物。','牆上有九十六種供品，還有人在吹笛子、彈豎琴！']],
 [118,'超長亡靈書',['這是一張莎草紙，畫著女祭司內斯塔內貝蒂舍魯。','她正在送禮物給冥界之王歐西里斯。','整卷亡靈書有 37 公尺長，是現在知道最長的！']],
 [119,'書吏的筆盒',['書吏是會寫字的人，在古時候很特別。','筆盒有兩個墨池，一個裝黑墨水，一個裝紅墨水。','旁邊光滑的小石頭，是用來磨顏料的。']],
 [120,'一家人的文件',['這張莎草紙，是一個書吏家族留下來的。','背面抄著卡疊石大戰的故事，字寫得好潦草。','後來家裡的人一代代傳下去，所以有四種不同的字跡！']],
 [121,'轉轉金戒指',['這是黃金戒指，上面有一隻藍綠色的聖甲蟲。','聖甲蟲背面刻著女王哈特謝普蘇特的名字。','戒面可以轉動，還能當印章蓋章喔！']],
 [122,'鏤空金牌',['這片金牌薄薄的，是用鏤空的方法做成的。','右邊是國王阿蒙涅姆赫特四世，左邊是創造神亞圖姆。','國王捧著油膏，要送給神明。']],
 [123,'最老的浮雕',['這是展覽裡最老的一件，有四千六百多年了！','國王沙納赫特戴著紅冠，正在打敗敵人。','旁邊刻著「綠松石」，古埃及人覺得綠色代表重生。']],
 [124,'神牛石碑',['石碑上有一頭神牛，名叫布奇斯。','亞歷山大大帝和托勒密二世是希臘人，卻穿得像埃及國王。','他們捧著酒，要獻給神牛。']],
 [125,'將軍的門框',['這是霍朗赫布還是將軍時，墳墓的門框。','他舉起雙手在歡呼，穿著好多層漂亮的衣服。','後來他當上法老，人們在他額頭上加刻了小蛇。']],
 [126,'紀念甲蟲章',['這些聖甲蟲印章，是阿蒙霍特普三世做的。','背面刻著大事，像是結婚、挖大湖，還有射了 102 頭獅子！','它們像公告一樣，被送到好遠的地方。']],
 [127,'女王的金飾',['這個金飾上刻著塔沃絲蕾特女王的名字。','她是古埃及少數的女法老，墓在帝王谷。','她的名字，連很遠的黎巴嫩和努比亞都找得到。']],
 [128,'沙布提小幫手',['沙布提是小小的僕人人偶。','古埃及人相信，它們會在來世幫主人工作。','看看它們手上的工具，猜猜在做什麼工作？']],
 [129,'歐西里斯國王',['這是第二位法老阿蒙霍特普一世，裝扮成歐西里斯。','歐西里斯是冥界的國王，下巴有捲捲的鬍子。','雕像上還留著紅、黑、白的顏料痕跡！']],
 [130,'彩色棺木',['這是神廟守門人亞赫摩斯的棺木底座。','古埃及人相信，人死後要走一段路去來世。','棺木上的顏色，過了這麼久還是好鮮豔！']]
];
var DEXBYNUM={};DEX.forEach(function(d,i){DEXBYNUM[d[0]]=i});

/* ====== 工具 ====== */
function $(s,r){return (r||document).querySelector(s)}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function load(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var stamps=load('egy_stamps',[]), seen=load('egy_seen',{}), favs=load('egy_favs',[]), kidName=load('egy_name',''), dexSeen=load('egy_dex',{});
function sym(s,cls){return '<svg viewBox="0 0 100 100" class="'+(cls||'')+'" role="img" aria-label="'+s.name+'">'+s.svg+'</svg>'}
function stopId(isl,i){return isl.id+':'+i}
function img(n,thumb){return 'img/'+(thumb?'t/':'')+'p'+n+'.jpg'}

/* ====== 吉祥物：小法喵 ====== */
var CAT='<svg viewBox="0 0 120 120" role="img" aria-label="小法喵"><defs><linearGradient id="sg" x1="0" x2="1"><stop offset="0" stop-color="#3e7c8c"/><stop offset="1" stop-color="#2f6170"/></linearGradient></defs>'+
 '<path d="M18 38L28 8L50 26Z" fill="#f0c88a" stroke="#7f520a" stroke-width="3" stroke-linejoin="round"/><path d="M102 38L92 8L70 26Z" fill="#f0c88a" stroke="#7f520a" stroke-width="3" stroke-linejoin="round"/>'+
 '<path d="M14 40Q60 6 106 40L112 108L98 112L92 70H28L22 112L8 108Z" fill="url(#sg)" stroke="#1e4552" stroke-width="3" stroke-linejoin="round"/>'+
 '<path d="M10 48H30M10 62H27M10 76H25M110 48H90M110 62H93M110 76H95" stroke="#f5d33a" stroke-width="4" stroke-linecap="round"/>'+
 '<ellipse cx="60" cy="68" rx="36" ry="34" fill="#f6d6a2" stroke="#7f520a" stroke-width="3"/>'+
 '<path d="M30 42Q60 22 90 42" fill="none" stroke="#f5d33a" stroke-width="7" stroke-linecap="round"/>'+
 '<path d="M60 22C56 28 56 34 60 38C64 34 64 28 60 22Z" fill="#5ebd7a" stroke="#2b5a3b" stroke-width="2.5"/>'+
 '<ellipse cx="46" cy="64" rx="7" ry="9" fill="#211d1d"/><ellipse cx="74" cy="64" rx="7" ry="9" fill="#211d1d"/><circle cx="48" cy="61" r="2.6" fill="#fff"/><circle cx="76" cy="61" r="2.6" fill="#fff"/>'+
 '<path d="M54 78L66 78L60 85Z" fill="#e98a66" stroke="#a5442a" stroke-width="2" stroke-linejoin="round"/>'+
 '<path d="M60 85Q54 94 46 90M60 85Q66 94 74 90" fill="none" stroke="#7f520a" stroke-width="3" stroke-linecap="round"/>'+
 '<path d="M30 78L12 74M30 84L12 90M90 78L108 74M90 84L108 90" stroke="#7f520a" stroke-width="2.5" stroke-linecap="round"/>'+
 '<ellipse cx="38" cy="78" rx="6" ry="3.5" fill="#f2a98a" opacity=".7"/><ellipse cx="82" cy="78" rx="6" ry="3.5" fill="#f2a98a" opacity=".7"/></svg>';

/* ====== 語音 / 音效 ====== */
var voice=null, speaking=false;
function pickVoice(){
  if(!('speechSynthesis' in window))return;
  var vs=speechSynthesis.getVoices();
  voice=vs.filter(function(v){return /zh[-_]TW|cmn-Hant-TW/i.test(v.lang)})[0]||
        vs.filter(function(v){return /^zh/i.test(v.lang)})[0]||null;
}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function say(text,btn){
  if(!('speechSynthesis' in window)){return false}
  speechSynthesis.cancel();
  var u=new SpeechSynthesisUtterance(text.replace(/[！!]/g,'！'));
  u.lang='zh-TW';if(voice)u.voice=voice;u.rate=.82;u.pitch=1.15;
  if(btn){btn.classList.add('talking');u.onend=u.onerror=function(){btn.classList.remove('talking')}}
  speechSynthesis.speak(u);return true;
}
function stopSay(){if('speechSynthesis' in window)speechSynthesis.cancel();['#say','#dexSay'].forEach(function(q){var b=$(q);if(b)b.classList.remove('talking')})}
var actx=null;
function tone(freqs,dur){
  try{
    actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    var t=actx.currentTime;
    freqs.forEach(function(f,i){
      var o=actx.createOscillator(),g=actx.createGain();o.type='triangle';o.frequency.value=f;
      g.gain.setValueAtTime(0,t+i*dur);g.gain.linearRampToValueAtTime(.18,t+i*dur+.02);g.gain.exponentialRampToValueAtTime(.001,t+i*dur+dur);
      o.connect(g);g.connect(actx.destination);o.start(t+i*dur);o.stop(t+i*dur+dur+.05);
    });
  }catch(e){}
}
function confetti(){
  var box=$('#confetti'),em=['⭐','✨','🎉','🌟','🪲','🌸'];
  for(var i=0;i<26;i++){var s=el('span','',em[i%em.length]);s.style.left=Math.random()*100+'%';s.style.animationDelay=Math.random()*.6+'s';s.style.fontSize=(24+Math.random()*24)+'px';box.appendChild(s)}
  setTimeout(function(){box.innerHTML=''},3200);
}

/* ====== 畫面切換 ====== */
var cur={isl:null,i:0}, stack=[];
function show(id){
  document.querySelectorAll('.view').forEach(function(v){v.classList.toggle('active',v.id===id)});
  stopSay();if(id!=='home')stop3D();
}
function go(name,push){
  if(name==='home'){history.replaceState(null,'','#');show('home');renderHome()}
  else{ if(push!==false)history.pushState({v:name},'','#'+name); show(name)
    if(name==='game')renderGame(); if(name==='diary')renderDiary(); if(name==='dex')renderDex(); }
}
window.addEventListener('popstate',function(){show('home');renderHome()});
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-go]'); if(b){go(b.getAttribute('data-go'))}
});

/* ====== 首頁 ====== */
function mascotSay(t){ $('#bubble').innerHTML=t }
var world3d={rz:0,tilt:54,base:54,drag:false,moved:false,last:0,x0:0,y0:0,raf:0,anc:[],t0:0};
var DECOR=[['🌴',-1.55,.55],['🪷',-1.15,-.95],['⛵',1.65,-.7],['🐟',1.25,.95]];
function anc(cls,x,y,z){var a=el('i','anc '+cls);a.style.transform='translate3d(calc(var(--hex)*'+x+'),calc(var(--hex)*'+y+'),'+z+')';return a}
function renderHome(){
  var box=$('#isles3d'),ov=$('#overlay'),W=$('#world');box.innerHTML='';ov.innerHTML='';
  world3d.anc=[];
  DECOR.forEach(function(d,k){
    var a=anc('decor',d[1],d[2],'calc(var(--hex)*.04)');box.appendChild(a);
    var o=el('div','deco3d',d[0]);o.style.animationDelay=(k*.9)+'s';ov.appendChild(o);world3d.anc.push([a,o,0,0]);
  });
  var pins=[],labs=[];
  ISLANDS.forEach(function(isl,k){
    var done=isl.stops.filter(function(_,i){return seen[stopId(isl,i)]}).length;
    var w=el('div','isl');
    w.style.setProperty('--x',isl.pos[0]-.75);w.style.setProperty('--y',isl.pos[1]*.866-.433);w.style.setProperty('--c',isl.color);
    w.style.setProperty('--d',(k*-1.1)+'s');
    var html='<i class="foam"></i><i class="shade"></i><div class="bob">';
    for(var j=0;j<6;j++)html+='<i class="side" style="--a:'+(j*60-90)+'deg;--sh:'+[.0,.12,.28,.34,.22,.08][j]+'"></i>';
    html+='<button class="face" aria-label="'+isl.name+'"><span class="ph" style="background-image:url('+img(isl.cover,true)+')"></span></button></div>';
    w.innerHTML=html;
    var bob=$('.bob',w);
    var aP=anc('pin',0,0,'calc(var(--T) + var(--hex)*.34)'),aL=anc('front',0,.5,'var(--T)');
    bob.appendChild(aP);bob.appendChild(aL);
    $('.face',w).addEventListener('click',function(){openIsland(isl,firstUnseen(isl))});
    box.appendChild(w);
    var pin=el('div','pin3d',isl.emo+(done===isl.stops.length?'<i>✅</i>':''));pin.style.animationDelay=(k*-1.1)+'s';
    var lab=el('div','lab3d','<b>'+isl.name+'</b><small>'+done+' / '+isl.stops.length+'</small>');lab.style.setProperty('--c',isl.color);
    pins.push(pin);labs.push(lab);
    world3d.anc.push([aP,pin,0,0]);world3d.anc.push([aL,lab,0,0]);
  });
  pins.concat(labs).forEach(function(x){ov.appendChild(x)});
  $('#stampCount').textContent=stamps.length+'/7';
  $('#favCount').textContent='❤ '+favs.length;
  $('#dexCount').textContent=Object.keys(dexSeen).length+'/28';
  start3D();
}
function stop3D(){if(world3d.raf){cancelAnimationFrame(world3d.raf);world3d.raf=0}}
function start3D(){
  stop3D();
  var W=$('#world'),sea=$('#sea'),reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  world3d.t0=performance.now();
  (function(){var r=sea.getBoundingClientRect();world3d.base=r.height/r.width>1.25?38:54;world3d.tilt=world3d.base})();
  function frame(ts){
    world3d.raf=requestAnimationFrame(frame);
    var idle=ts-world3d.last>2200;
    if(!world3d.drag&&idle){
      var r=world3d.rz%360;if(r>180)r-=360;if(r<-180)r+=360;
      world3d.rz=r*.92;world3d.tilt+=(world3d.base-world3d.tilt)*.08;
      if(Math.abs(world3d.rz)<.05)world3d.rz=0;
    }
    var sway=(!world3d.drag&&idle&&!reduce)?Math.sin((ts-world3d.t0)/2600)*3.2:0;
    W.style.transform='rotateX('+world3d.tilt.toFixed(2)+'deg) rotateZ('+(world3d.rz+sway).toFixed(2)+'deg)';
    var sr=sea.getBoundingClientRect();
    world3d.anc.forEach(function(p){
      var r=p[0].getBoundingClientRect(),x=r.left-sr.left,y=r.top-sr.top;
      if(Math.abs(x-p[2])>.2||Math.abs(y-p[3])>.2){p[2]=x;p[3]=y;p[1].style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)'}
    });
  }
  world3d.last=performance.now()-5000;
  world3d.raf=requestAnimationFrame(frame);
}
(function drag3D(){
  var sea=$('#sea'),sx=0,sy=0,down=false;
  sea.addEventListener('pointerdown',function(e){down=true;world3d.moved=false;sx=e.clientX;sy=e.clientY;world3d.x0=sx;world3d.y0=sy});
  window.addEventListener('pointermove',function(e){
    if(!down)return;var dx=e.clientX-sx,dy=e.clientY-sy;
    if(!world3d.drag&&Math.abs(e.clientX-world3d.x0)+Math.abs(e.clientY-world3d.y0)>10){world3d.drag=true;world3d.moved=true;mascotSay('哇，轉轉轉！')}
    if(world3d.drag){world3d.rz+=dx*.4;world3d.tilt=Math.max(40,Math.min(68,world3d.tilt+dy*.12));sx=e.clientX;sy=e.clientY;world3d.last=performance.now()}
  });
  function up(){down=false;if(world3d.drag){world3d.drag=false;world3d.last=performance.now()}}
  window.addEventListener('pointerup',up);window.addEventListener('pointercancel',up);
  sea.addEventListener('click',function(e){if(world3d.moved){e.stopPropagation();e.preventDefault();world3d.moved=false}},true);
})();
function firstUnseen(isl){for(var i=0;i<isl.stops.length;i++)if(!seen[stopId(isl,i)])return i;return 0}
$('#mascot').addEventListener('click',function(){
  var t=MASCOT_LINES[Math.floor(Math.random()*MASCOT_LINES.length)];
  mascotSay(t);say(t);
});

/* ====== 展品卡 ====== */
function openIsland(isl,i){
  cur.isl=isl;cur.i=i;
  history.pushState({v:'card'},'','#'+isl.id);
  show('card');renderCard();
}
function renderCard(){
  var isl=cur.isl,s=isl.stops[cur.i],id=stopId(isl,cur.i);
  var wasNew=!seen[id]; seen[id]=1; save('egy_seen',seen);
  $('#card').style.setProperty('--c',isl.color);
  $('#islandTag').textContent=isl.emo+' '+isl.name;
  $('#cardImg').src=img(s[0]);$('.photo-box').style.setProperty('--bg','url('+img(s[0],true)+')');$('#cardImg').alt=s[1];
  $('#cardTitle').textContent=s[1];$('#cardText').textContent=s[2];
  var dl=$('#dexLink');dl.hidden=!s[3];dl.onclick=s[3]?function(){openDex(s[3])}:null;
  var d=$('#dots');d.innerHTML='';
  isl.stops.forEach(function(_,k){d.appendChild(el('i',k===cur.i?'on':(seen[stopId(isl,k)]?'seen':'')))});
  var f=favs.indexOf(s[0])>=0;$('#fav').textContent=f?'❤️':'🤍';$('#fav').classList.toggle('on',f);
  $('#prev').style.visibility=cur.i>0?'visible':'hidden';
  var last=cur.i===isl.stops.length-1;$('#next').textContent=last?'🎉':'▶';
  stopSay();
  if(wasNew&&isl.stops.every(function(_,k){return seen[stopId(isl,k)]})&&last){tone([523,659,784,1047],.14);confetti()}
}
$('#prev').addEventListener('click',function(){if(cur.i>0){cur.i--;renderCard()}});
$('#next').addEventListener('click',function(){
  if(cur.i<cur.isl.stops.length-1){cur.i++;renderCard()}
  else{go('home');mascotSay('好棒！'+cur.isl.name+'逛完了！<br>再去別的島吧！');confetti();tone([659,784,988],.12)}
});
$('#cardHome').addEventListener('click',function(){go('home')});
$('#say').addEventListener('click',function(){
  var s=cur.isl.stops[cur.i];
  if(!say(s[1]+'。'+s[2],$('#say')))alert('這台裝置沒有聲音功能');
});
$('#fav').addEventListener('click',function(){
  var n=cur.isl.stops[cur.i][0],k=favs.indexOf(n);
  if(k>=0)favs.splice(k,1);else{favs.push(n);tone([880,1175],.08)}
  save('egy_favs',favs);renderCard();
});
(function swipe(){
  var x0=null,box=$('#card');
  box.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  box.addEventListener('touchend',function(e){
    if(x0==null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;
    if(Math.abs(dx)>70){ if(dx<0)$('#next').click(); else $('#prev').click() }
  });
})();

/* ====== 博物館小圖鑑 ====== */
var dexCur=0;
function dimg(n){return 'img/d/d'+n+'.webp'}
function photoFor(n){var r=null;ISLANDS.forEach(function(isl){isl.stops.forEach(function(s,i){if(s[3]===n)r={isl:isl,i:i}})});return r}
function renderDex(){
  var g=$('#dexGrid');g.innerHTML='';
  $('#dexProg').textContent=Object.keys(dexSeen).length+' / 28';
  DEX.forEach(function(d,k){
    var b=el('button','dcard'+(dexSeen[d[0]]?' seen':''),'<img loading="lazy" src="'+dimg(d[0])+'" alt=""><i class="no">'+d[0]+'</i><span>'+d[1]+'</span>'+(dexSeen[d[0]]?'<em>⭐</em>':''));
    b.setAttribute('aria-label',d[1]);
    b.addEventListener('click',function(){openDex(d[0])});
    g.appendChild(b);
  });
}
function openDex(n){
  dexCur=DEXBYNUM[n];
  if(!$('#dexcard').classList.contains('active')){history.pushState({v:'dexcard'},'','#dexcard')}
  show('dexcard');renderDexCard();
}
function dexSpeech(d){return d[1]+'。'+d[2].join('')}
function renderDexCard(){
  var d=DEX[dexCur],n=d[0];
  if(!dexSeen[n]){dexSeen[n]=1;save('egy_dex',dexSeen);if(Object.keys(dexSeen).length===28){tone([523,659,784,1047],.14);confetti()}}
  $('#dexImg').src=dimg(n);$('#dexImg').alt=d[1];$('#dexNum').textContent='No.'+n;
  $('#dexName').textContent=d[1];
  var t=$('#dexText');t.innerHTML='';d[2].forEach(function(x,k){t.appendChild(el('p','',x))});
  $('#dexPrev').style.visibility=dexCur>0?'visible':'hidden';
  $('#dexNext').style.visibility=dexCur<DEX.length-1?'visible':'hidden';
  var ph=photoFor(n);$('#dexPhoto').hidden=!ph;
  var art=$('#dexcard .dex-art');art.classList.remove('flip');void art.offsetWidth;art.classList.add('flip');
  stopSay();
}
$('#dexPrev').addEventListener('click',function(){if(dexCur>0){dexCur--;renderDexCard()}});
$('#dexNext').addEventListener('click',function(){if(dexCur<DEX.length-1){dexCur++;renderDexCard()}});
$('#dexBack').addEventListener('click',function(){go('dex',false);history.replaceState(null,'','#dex')});
$('#dexHome').addEventListener('click',function(){go('home')});
$('#dexSay').addEventListener('click',function(){if(!say(dexSpeech(DEX[dexCur]),$('#dexSay')))alert('這台裝置沒有聲音功能')});
$('#dexPhoto').addEventListener('click',function(){var p=photoFor(DEX[dexCur][0]);if(p)openIsland(p.isl,p.i)});
(function(){
  var x0=null,box=$('#dexcard');
  box.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  box.addEventListener('touchend',function(e){
    if(x0==null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;
    if(Math.abs(dx)>70){ if(dx<0)$('#dexNext').click(); else $('#dexPrev').click() }
  });
})();


/* ====== 找符號 ====== */
var gameState={order:[],cur:null,opts:[],solved:false};
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function renderPassport(popId){
  var p=$('#passport');p.innerHTML='';
  SYMBOLS.forEach(function(s){
    var got=stamps.indexOf(s.id)>=0;
    var b=el('button','slot'+(got?' got':'')+(popId===s.id?' pop':''),sym(s));
    b.setAttribute('aria-label',got?s.name:'還沒找到');
    if(got)b.addEventListener('click',function(){showWin(s,true)});
    p.appendChild(b);
  });
}
function renderGame(){
  renderPassport();
  var left=SYMBOLS.filter(function(s){return stamps.indexOf(s.id)<0});
  if(!left.length){showCert();return}
  gameState.cur=shuffle(left)[0];newRound();
}
function newRound(){
  var s=gameState.cur,box=$('#gameBox');
  var others=shuffle(SYMBOLS.filter(function(x){return x.id!==s.id})).slice(0,3);
  var opts=shuffle(others.concat([s]));
  box.innerHTML='';
  var clue=el('div','clue','<div class="q">'+s.clue+'<br>我是哪一個？</div>');
  var hear=el('button','hear','🔊 聽一聽');hear.addEventListener('click',function(){say(s.clue+'我是哪一個？',hear)});
  clue.appendChild(hear);box.appendChild(clue);
  var grid=el('div','opts');
  opts.forEach(function(o){
    var b=el('button','opt',sym(o));b.setAttribute('aria-label','符號');
    b.addEventListener('click',function(){
      if(o.id===s.id){tone([523,659,784,1047],.12);
        if(stamps.indexOf(s.id)<0){stamps.push(s.id);save('egy_stamps',stamps)}
        renderPassport(s.id);confetti();showWin(s)}
      else{b.classList.add('wrong');tone([220],.25);mascotSay('再找找看！');setTimeout(function(){b.classList.remove('wrong')},500)}
    });
    grid.appendChild(b);
  });
  box.appendChild(grid);
  setTimeout(function(){say(s.clue+'我是哪一個？')},350);
}
function showWin(s,again){
  var box=$('#gameBox');box.innerHTML='';
  var w=el('div','win','<div class="big-sym">'+sym(s)+'</div><h3>'+(again?'':'找到了！')+s.name+'＝'+s.mean+'</h3><p>'+s.fact+'</p>');
  if(s.peek){w.appendChild(el('div','peek','<img src="'+img(s.peek,true)+'" alt="法老的臉">看看法老的額頭！'))}
  if(s.dex){var db=el('button','hear dexgo','📚 去圖鑑看看');db.addEventListener('click',function(){openDex(s.dex)});w.appendChild(db)}
  var hb=el('button','hear','🔊 聽一聽');hb.style.cssText='background:#DB6A41;color:#fff;border-radius:999px;padding:8px 18px;font-size:20px;font-weight:800;margin:4px';
  hb.addEventListener('click',function(){say(s.name+'，'+s.mean+'。'+s.fact,hb)});w.appendChild(hb);w.appendChild(el('br'));
  var nb=el('button','next-btn',stamps.length>=7?'🎉 拿證書':'下一個 ▶');
  nb.addEventListener('click',function(){renderGame()});w.appendChild(nb);box.appendChild(w);
  say(s.name+'，'+s.mean+'。'+s.fact);
}
function showCert(){
  var box=$('#gameBox');box.innerHTML='';
  var row=SYMBOLS.map(function(s){return sym(s)}).join('');
  var c=el('div','cert','<h3>🏅 小小探險家證書</h3><p>恭喜你找到 7 個符號！</p><div class="row">'+row+'</div><p>探險家：<input id="nm" maxlength="8" placeholder="寫名字" value="'+(kidName||'').replace(/"/g,'')+'"></p><p>小法喵蓋章 🐱</p>');
  var again=el('button','next-btn','再玩一次');again.addEventListener('click',function(){stamps=[];save('egy_stamps',stamps);renderGame()});
  c.appendChild(again);box.appendChild(c);
  $('#nm').addEventListener('input',function(){kidName=this.value;save('egy_name',kidName)});
  say('哇！你找到全部的符號了！你是小小探險家！');
}

/* ====== 日記 ====== */
var onlyFav=false;
function allStops(){var a=[];ISLANDS.forEach(function(isl){isl.stops.forEach(function(s,i){a.push({isl:isl,i:i,s:s})})});return a}
function renderDiary(){
  var w=$('#wall');w.innerHTML='';
  $('#favFilter').textContent=onlyFav?'❤️':'🤍';
  var list=allStops().filter(function(x){return !onlyFav||favs.indexOf(x.s[0])>=0});
  if(!list.length){w.appendChild(el('div','empty','還沒有最愛喔！<br>在照片旁按 🤍 就會出現。'));return}
  list.forEach(function(x,k){
    var b=el('button','pola','<img loading="lazy" src="'+img(x.s[0],true)+'" alt="'+x.s[1]+'"><span>'+x.s[1]+'</span>'+(favs.indexOf(x.s[0])>=0?'<i class="h">❤️</i>':''));
    b.style.setProperty('--rot',((k*37)%7-3)+'deg');
    b.addEventListener('click',function(){openIsland(x.isl,x.i)});
    w.appendChild(b);
  });
}
$('#favFilter').addEventListener('click',function(){onlyFav=!onlyFav;renderDiary()});

/* ====== 爸媽 / 重設 ====== */
$('#reset').addEventListener('click',function(){
  if(confirm('要清除蓋章、最愛和已看過的紀錄嗎？')){stamps=[];seen={};favs=[];kidName='';dexSeen={};
    ['egy_stamps','egy_seen','egy_favs','egy_name','egy_dex'].forEach(function(k){localStorage.removeItem(k)});go('home')}
});

/* ====== 開場 ====== */
$('#mascot').innerHTML=CAT;$('#mascotBig').innerHTML=CAT;
$('#goBtn').addEventListener('click',function(){
  $('#welcome').classList.add('hide');tone([392,523,659],.12);
  say('歡迎來到古埃及探險島！點一個島，開始探險吧！');
});
renderHome();
if(location.hash&&location.hash!=='#'){history.replaceState(null,'','#')}
})();
