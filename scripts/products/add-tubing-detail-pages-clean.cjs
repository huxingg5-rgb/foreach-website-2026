const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function backup(filePath, tag) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_${tag}_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("宸插浠斤細" + path.relative(root, backupPath));
  }
}

function writeUtf8(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log("宸插啓鍏ワ細" + path.relative(root, filePath));
}

const baseImage = "/images/products/common/product-placeholder.svg";

const details = [
  {
    slug: "pvc-tubing",
    title: "PVC 绠?,
    material: "PVC",
    fullName: "鑱氭隘涔欑儻锛圥VC锛?,
    idRange: "1.6mm~19.1mm",
    temp: "-42鈩儈75鈩?,
    extra: "55A / 65A 纭害锛屾寜鐩綍瑙勬牸閫夋嫨",
    connection: "鍊掑埡鎺ュご銆佸揩鎻掓帴澶寸瓑杞杩炴帴浠?,
    description: "PVC 绠￠噰鐢ㄨ仛姘箼鐑紙PVC锛夋潗璐紝鍐呭緞鑼冨洿瑕嗙洊 1.6mm~19.1mm锛屽伐浣滄俯搴﹁寖鍥翠负 -42鈩儈75鈩冦€傝绯诲垪绠℃潗鏌旀€уソ锛岄€傜敤浜庡父瑙勪綆鍘嬫恫璺€佹竻娲楁恫銆佸簾娑插拰璁惧鍐呴儴杈呭姪绠¤矾杩炴帴銆傚彲鎻愪緵 RoHS 绛夋潗鏂欏悎瑙勮祫鏂欙紝鍏蜂綋鏂囦欢闅忔潗璐ㄤ笌椤圭洰瑕佹眰纭銆?,
    applications: ["娓呮礂娑茶緭閫?, "搴熸恫鎺掓斁", "浣庡帇璇曞墏杩炴帴", "璁惧鍐呴儴杞甯冪", "甯歌娑茶矾杞帴"],
    features: ["鏌旀€уソ锛屼究浜庤澶囧唴閮ㄥ竷绠?, "閫傚悎甯歌浣庡帇娑蹭綋杩炴帴", "渚夸簬瑙傚療娑蹭綋娴佸姩鐘舵€?, "閫傚悎鎼厤鍊掑埡鎺ュご銆佸揩鎻掓帴澶寸瓑杞杩炴帴浠?],
    faq: [
      ["PVC 绠￠€傚悎鍝簺娑茶矾锛?, "PVC 绠￠€傚悎甯歌浣庡帇娑茶矾銆佹竻娲楁恫銆佸簾娑插拰璁惧鍐呴儴杈呭姪绠¤矾锛屼笉寤鸿鐩存帴鐢ㄤ簬寮鸿厫铓€浠嬭川鎴栭珮娲佸噣瑕佹眰寰堥珮鐨勬恫璺€?],
      ["PVC 绠″拰 TPU 绠℃€庝箞閫夛紵", "PVC 绠℃洿閫傚悎鍥哄畾寮忎綆鍘嬬璺拰甯歌杈呭姪娑茶矾锛汿PU 绠″脊鎬ф洿濂斤紝鏇撮€傚悎杩愬姩閮ㄤ欢銆佸弽澶嶅集鎶樻垨鍔ㄦ€佸竷绠′綅缃€?],
      ["PVC 绠″唴寰勫浣曠‘璁わ紵", "闇€瑕佺粨鍚堢洰鏍囨祦閲忋€佹车闃€鎺ュ彛銆佹帴澶村昂瀵搞€佺璺暱搴﹀拰鍏佽鍘嬮檷纭銆傚唴寰勮繃灏忎細澧炲姞娴佷綋闃诲姏锛屽唴寰勮繃澶у垯鍙兘澧炲姞姝讳綋绉€?],
      ["PVC 绠″彲浠ユ惌閰嶅摢浜涙帴澶达紵", "PVC 绠￠€氬父鍙惌閰嶅€掑埡鎺ュご銆佸揩鎻掓帴澶寸瓑杞杩炴帴浠讹紝鍏蜂綋闇€瑕佹牴鎹鏉愬唴寰勩€佽蒋纭害銆佹彃鍏ユ繁搴﹀拰宸ヤ綔鍘嬪姏纭銆?],
      ["PVC 绠￠€夊瀷鍓嶉渶瑕佹彁渚涘摢浜涗俊鎭紵", "寤鸿鎻愪緵浠嬭川绫诲瀷銆佺洰鏍囨祦閲忋€佸唴寰?澶栧緞銆佺璺暱搴︺€佹俯搴﹁寖鍥淬€佸帇鍔涜寖鍥淬€佹帴澶寸被鍨嬪拰鏄惁闇€瑕佽繘琛屾祦闃绘垨鍘嬮檷璇勪及銆?]
    ]
  },
  {
    slug: "tpu-tubing",
    title: "TPU 绠?,
    material: "TPU",
    fullName: "鐑鎬ц仛姘ㄩ叝锛圱PU锛?,
    idRange: "3.7mm~7.0mm",
    temp: "-30鈩儈70鈩?,
    extra: "85A / 95A 纭害锛屾寜鐩綍瑙勬牸閫夋嫨",
    connection: "鍊掑埡鎺ュご銆佸揩鎻掓帴澶寸瓑杞杩炴帴浠?,
    description: "TPU 绠￠噰鐢ㄧ儹濉戞€ц仛姘ㄩ叝锛圱PU锛夋潗璐紝鍐呭緞鑼冨洿瑕嗙洊 3.7mm~7.0mm锛屽伐浣滄俯搴﹁寖鍥翠负 -30鈩儈70鈩冦€傝绯诲垪绠℃潗寮规€уソ锛岄€傜敤浜庡集鎶樸€佸洖寮广€佽繍鍔ㄩ儴浠跺拰璁惧鍐呴儴鍔ㄦ€佸竷绠″満鏅€傚彲鎻愪緵 RoHS 绛夋潗鏂欏悎瑙勮祫鏂欙紝鍏蜂綋鏂囦欢闅忔潗璐ㄤ笌椤圭洰瑕佹眰纭銆?,
    applications: ["杩愬姩閮ㄤ欢娑茶矾", "鍔ㄦ€佸竷绠?, "娓呮礂娑茶矾寰?, "杞杞帴", "璁惧鍐呴儴鏌旀€ц繛鎺?],
    features: ["寮规€уソ锛岄€傚悎寮姌甯冪", "閫傚悎杩愬姩閮ㄤ欢鍜屽姩鎬佹恫璺?, "鍙寜鍐呭緞銆侀暱搴﹀拰纭害闇€姹傞€夊瀷", "閫傚悎鎼厤鍊掑埡鎺ュご鍜岃蒋绠¤繛鎺ヤ欢"],
    faq: [
      ["TPU 绠￠€傚悎鍝簺娑茶矾锛?, "TPU 绠￠€傚悎闇€瑕佸集鎶樸€佸洖寮规垨鍔ㄦ€佸竷绠＄殑鏌旀€ф恫璺紝渚嬪杩愬姩閮ㄤ欢杩炴帴銆佹竻娲楁恫璺緞鍜岃澶囧唴閮ㄨ蒋绠¤浆鎺ャ€?],
      ["TPU 绠″拰 PVC 绠℃湁浠€涔堝尯鍒紵", "TPU 绠″脊鎬у拰鑰愬集鎶樿兘鍔涙洿閫傚悎鍔ㄦ€佹恫璺紱PVC 绠℃洿閫傚悎甯歌浣庡帇鍥哄畾绠¤矾鍜屾垚鏈晱鎰熺殑杈呭姪娑茶矾銆?],
      ["TPU 绠￠€夊瀷鏃朵负浠€涔堣鍏虫敞寮姌鏉′欢锛?, "寮姌鍗婂緞銆佽繍鍔ㄩ鐜囧拰绠¤矾鍥哄畾鏂瑰紡浼氬奖鍝嶇鏉愬鍛姐€佹祦閲忕ǔ瀹氭€у拰鍘嬮檷锛屽洜姝ゅ姩鎬佸竷绠″満鏅渶瑕佹彁鍓嶇‘璁ゃ€?],
      ["TPU 绠″彲浠ユ惌閰嶅摢浜涙帴澶达紵", "TPU 绠￠€氬父鍙惌閰嶅€掑埡鎺ュご鎴栧揩鎻掓帴澶达紝鍏蜂綋闇€瑕佺粨鍚堢鏉愬唴寰勩€佺‖搴︺€佹彃鍏ユ繁搴﹀拰宸ヤ綔鍘嬪姏纭瀵嗗皝鍙潬鎬с€?],
      ["TPU 绠￠€夊瀷鍓嶉渶瑕佹彁渚涘摢浜涗俊鎭紵", "寤鸿鎻愪緵浠嬭川銆佺洰鏍囨祦閲忋€佺寰勩€佺璺暱搴︺€佽繍鍔ㄦ柟寮忋€佸集鎶樼┖闂淬€佹俯搴﹁寖鍥淬€佸帇鍔涜寖鍥村拰鎺ュご绫诲瀷銆?]
    ]
  },
  {
    slug: "fep-tubing",
    title: "FEP 绠?,
    material: "FEP",
    fullName: "姘熷寲涔欑儻涓欑儻鍏辫仛鐗╋紙FEP锛?,
    idRange: "0.3mm~2.0mm",
    temp: "-230鈩儈200鈩?,
    extra: "50A / 60A 纭害锛屾寜鐩綍瑙勬牸閫夋嫨",
    connection: "骞冲簳鎺ュご銆佸崱绠嶆帴澶淬€佸崱鐜帴澶寸瓑纭杩炴帴浠?,
    description: "FEP 绠￠噰鐢ㄦ盁鍖栦箼鐑笝鐑叡鑱氱墿锛團EP锛夋潗璐紝鍐呭緞鑼冨洿瑕嗙洊 0.3mm~2.0mm锛屽伐浣滄俯搴﹁寖鍥翠负 -230鈩儈200鈩冦€傝绯诲垪绠℃潗鍏锋湁鑹ソ鐨勯€忔槑鎬у拰鑰愬寲瀛︽€э紝閫傜敤浜庤瘯鍓傝緭閫併€佹牱鏈矾寰勫拰鍒嗘瀽浠櫒娑茶矾杩炴帴銆傚彲鎻愪緵 RoHS 绛夋潗鏂欏悎瑙勮祫鏂欙紝鍏蜂綋鏂囦欢闅忔潗璐ㄤ笌椤圭洰瑕佹眰纭銆?,
    applications: ["璇曞墏杈撻€?, "鏍锋湰璺緞", "鍒嗘瀽浠櫒娑茶矾", "閫忔槑瑙傚療绠¤矾", "浣庡惛闄勬恫璺繛鎺?],
    features: ["閫忔槑搴﹀ソ锛屼究浜庤瀵熸恫浣撶姸鎬?, "鑰愬寲瀛︽€уソ锛岄€傚悎澶氱璇曞墏璺緞", "閫傚悎浣庡惛闄勩€佷綆娈嬬暀娑茶矾", "鍙惌閰嶅钩搴曟帴澶淬€佸崱绠嶆帴澶淬€佸崱鐜帴澶寸瓑纭鎺ュご"],
    faq: [
      ["FEP 绠￠€傚悎鍝簺娑茶矾锛?, "FEP 绠￠€傚悎闇€瑕侀€忔槑瑙傚療銆佽€愬寲瀛﹀拰浣庡惛闄勭殑璇曞墏杈撻€併€佹牱鏈矾寰勫拰鍒嗘瀽浠櫒娑茶矾銆?],
      ["FEP 绠″拰 PTFE 绠℃€庝箞閫夛紵", "FEP 绠￠€忔槑搴︽洿濂斤紝鏇撮€傚悎闇€瑕佽瀵熸恫浣撶姸鎬佺殑绠¤矾锛汸TFE 绠℃洿寮鸿皟浣庢懇鎿︺€佷綆鍚搁檮鍜岃€愬寲瀛︾ǔ瀹氭€с€?],
      ["FEP 绠′负浠€涔堥€傚悎瑙傚療娑茶矾鐘舵€侊紵", "FEP 绠￠€忔槑鎬ц緝濂斤紝渚夸簬瑙傚療姘旀场銆佹恫浣撶姸鎬佸拰绠¤矾娴佸姩鎯呭喌锛岄€傚悎浠櫒鍐呴儴闇€瑕佺姸鎬佺‘璁ょ殑璇曞墏璺緞銆?],
      ["FEP 绠″彲浠ユ惌閰嶅摢浜涙帴澶达紵", "FEP 绠￠€氬父鍙惌閰嶅钩搴曟帴澶淬€佸崱绠嶆帴澶淬€佸崱鐜帴澶寸瓑纭杩炴帴浠讹紝鍏蜂綋闇€瑕佺‘璁ょ澶栧緞銆佺鍙ｇ粨鏋勫拰瀵嗗皝鏂瑰紡銆?],
      ["FEP 绠￠€夊瀷鍓嶉渶瑕佺‘璁ゅ摢浜涘弬鏁帮紵", "寤鸿纭浠嬭川绫诲瀷銆佺洰鏍囨祦閲忋€佸唴寰?澶栧緞銆佺璺暱搴︺€佹俯搴﹁寖鍥淬€佸帇鍔涜寖鍥淬€佹帴澶存暟閲忓拰鏄惁闇€瑕佹祦闃绘垨姝讳綋绉瘎浼般€?]
    ]
  },
  {
    slug: "ptfe-tubing",
    title: "PTFE 绠?,
    material: "PTFE",
    fullName: "鑱氬洓姘熶箼鐑紙PTFE锛?,
    idRange: "1.5mm~2.0mm",
    temp: "-200鈩儈260鈩?,
    extra: "鍙€夋湰鑹层€侀粦鑹插拰閫忔槑棰滆壊锛屾寜鐩綍瑙勬牸閫夋嫨",
    connection: "骞冲簳鎺ュご銆佸崱绠嶆帴澶淬€佸崱鐜帴澶寸瓑纭杩炴帴浠?,
    description: "PTFE 绠￠噰鐢ㄨ仛鍥涙盁涔欑儻锛圥TFE锛夋潗璐紝鍐呭緞鑼冨洿瑕嗙洊 1.5mm~2.0mm锛屽伐浣滄俯搴﹁寖鍥翠负 -200鈩儈260鈩冦€傝绯诲垪绠℃潗鍏锋湁浣庢懇鎿﹀拰鑰愬寲瀛︾壒鎬э紝閫傜敤浜庝綆鍚搁檮銆佷綆娈嬬暀鍜岀ǔ瀹氳緭閫佽姹傝緝楂樼殑娑茶矾绯荤粺銆傚彲鎻愪緵 RoHS 绛夋潗鏂欏悎瑙勮祫鏂欙紝鍏蜂綋鏂囦欢闅忔潗璐ㄤ笌椤圭洰瑕佹眰纭銆?,
    applications: ["浣庡惛闄勮瘯鍓傝矾寰?, "鏍锋湰杈撻€佺璺?, "鑵愯殌鎬т粙璐ㄨ緭閫?, "鍒嗘瀽浠櫒娑茶矾", "绋冲畾娴佷綋杩炴帴"],
    features: ["浣庢懇鎿︼紝娑蹭綋杈撻€佺ǔ瀹?, "鑰愬寲瀛︽€уソ", "閫傚悎浣庡惛闄勩€佷綆娈嬬暀娑茶矾", "鍙敤浜庣‖绠¤繛鎺ョ粨鏋?],
    faq: [
      ["PTFE 绠￠€傚悎鍝簺娑茶矾锛?, "PTFE 绠￠€傚悎瀵硅€愬寲瀛︽€с€佷綆鍚搁檮銆佷綆娈嬬暀鍜岀ǔ瀹氳緭閫佽姹傝緝楂樼殑璇曞墏璺緞銆佹牱鏈矾寰勫拰鍒嗘瀽浠櫒娑茶矾銆?],
      ["PTFE 绠″拰 FEP 绠℃€庝箞閫夛紵", "FEP 绠℃洿閫傚悎闇€瑕侀€忔槑瑙傚療鐨勬恫璺紱PTFE 绠℃洿閫傚悎寮鸿皟浣庢懇鎿︺€佷綆鍚搁檮鍜岃€愬寲瀛︾ǔ瀹氭€х殑娑茶矾銆?],
      ["PTFE 绠℃槸鍚﹂€傚悎閫忔槑瑙傚療锛?, "PTFE 绠￠€氬父涓嶄綔涓洪€忔槑瑙傚療绠¤矾浼樺厛閫夋嫨銆傚鏋滈渶瑕佽瀵熸皵娉℃垨娑蹭綋鐘舵€侊紝鍙互浼樺厛鑰冭檻 FEP 绠°€?],
      ["PTFE 绠″彲浠ユ惌閰嶅摢浜涙帴澶达紵", "PTFE 绠￠€氬父鍙惌閰嶅钩搴曟帴澶淬€佸崱绠嶆帴澶淬€佸崱鐜帴澶寸瓑纭杩炴帴浠讹紝闇€鏍规嵁绠″寰勩€佺鍙ｇ粨鏋勫拰瀵嗗皝鏂瑰紡纭銆?],
      ["PTFE 绠￠€夊瀷鏃朵负浠€涔堣鍏虫敞姝讳綋绉紵", "绠¤矾鍐呭緞銆侀暱搴︺€佹帴澶存暟閲忓拰绔彛缁撴瀯閮戒細褰卞搷姝讳綋绉笌娈嬬暀閲忥紝鍒嗘瀽浠櫒鎴栦綆娈嬬暀娑茶矾闇€瑕佹彁鍓嶈瘎浼般€?]
    ]
  },
  {
    slug: "peek-tubing",
    title: "PEEK 绠?,
    material: "PEEK",
    fullName: "鑱氶啔閱氶叜锛圥EEK锛?,
    idRange: "0.2mm~0.8mm",
    temp: "-180鈩儈225鈩?,
    extra: "90A / 95A 纭害锛屾寜鐩綍瑙勬牸閫夋嫨",
    connection: "楂樺帇鎺ュご銆佸钩搴曟帴澶淬€佸崱绠嶆帴澶淬€佸崱鐜帴澶寸瓑纭杩炴帴浠?,
    description: "PEEK 绠￠噰鐢ㄨ仛閱氶啔閰紙PEEK锛夋潗璐紝鍐呭緞鑼冨洿瑕嗙洊 0.2mm~0.8mm锛屽伐浣滄俯搴﹁寖鍥翠负 -180鈩儈225鈩冦€傝绯诲垪绠℃潗閫傜敤浜庣簿瀵嗗垎鏋愪华鍣ㄣ€佸皬鍐呭緞娑茶矾鍜屽灏哄绋冲畾鎬ц姹傝緝楂樼殑娴佷綋杩炴帴鍦烘櫙銆傚彲鎻愪緵 RoHS 绛夋潗鏂欏悎瑙勮祫鏂欙紝鍏蜂綋鏂囦欢闅忔潗璐ㄤ笌椤圭洰瑕佹眰纭銆?,
    applications: ["鍒嗘瀽浠櫒娑茶矾", "灏忓唴寰勭璺?, "绮惧瘑杩涙牱璺緞", "楂樼ǔ瀹氭祦浣撹繛鎺?, "浠櫒鍐呴儴纭杩炴帴"],
    features: ["鏈烘寮哄害楂?, "灏哄绋冲畾鎬уソ", "閫傚悎灏忓唴寰勭簿瀵嗘恫璺?, "閫傚悎鍒嗘瀽浠櫒鍜岄珮瑕佹眰娴佷綋绯荤粺"],
    faq: [
      ["PEEK 绠￠€傚悎鍝簺浠櫒锛?, "PEEK 绠￠€傚悎鍒嗘瀽浠櫒銆佺簿瀵嗘恫璺€佸皬鍐呭緞娴佽矾鍜屽灏哄绋冲畾鎬ц姹傝緝楂樼殑璁惧鍐呴儴杩炴帴銆?],
      ["PEEK 绠″拰 FEP / PTFE 绠℃€庝箞閫夛紵", "PEEK 绠℃洿寮鸿皟鏈烘寮哄害銆佸昂瀵哥ǔ瀹氬拰灏忓唴寰勭簿瀵嗚繛鎺ワ紱FEP / PTFE 鏇村亸姘熷鏂欒€愬寲瀛﹀拰浣庡惛闄勬恫璺€?],
      ["PEEK 绠￠€夊瀷鏃朵负浠€涔堣纭鍐呭緞锛?, "PEEK 绠″父鐢ㄤ簬灏忓唴寰勬祦璺紝鍐呭緞浼氱洿鎺ュ奖鍝嶆祦闃汇€佹祦閲忋€佸帇鍔涘拰绯荤粺鍝嶅簲锛岄渶瑕佺粨鍚堢洰鏍囨祦閲忓拰绠¤矾闀垮害纭銆?],
      ["PEEK 绠″彲浠ョ敤浜庢祦闃昏绠楀悧锛?, "鍙互銆傛彁渚涚洰鏍囨祦閲忋€佸唴寰勩€佺闀裤€佹帴澶存暟閲忋€佷粙璐ㄩ粡搴﹀拰鍘嬪姏鑼冨洿鍚庯紝鍙瘎浼板帇闄嶃€佹祦浣撻樆鍔涘拰娉甸榾鍖归厤鎯呭喌銆?],
      ["PEEK 绠￠€夊瀷鍓嶉渶瑕佹彁渚涘摢浜涗俊鎭紵", "寤鸿鎻愪緵浠嬭川绫诲瀷銆佺洰鏍囨祦閲忋€佸唴寰?澶栧緞銆侀暱搴︺€佹俯搴︺€佸帇鍔涜寖鍥淬€佹帴澶寸被鍨嬪拰浠櫒绌洪棿闄愬埗銆?]
    ]
  },
  {
    slug: "pfa-tubing",
    title: "PFA 绠?,
    material: "PFA",
    fullName: "鍏ㄦ盁鐑锋哀鍩烘爲鑴傦紙PFA锛?,
    idRange: "0.5mm~1.0mm",
    temp: "-230鈩儈200鈩?,
    extra: "鏈壊锛屾寜鐩綍瑙勬牸閫夋嫨",
    connection: "骞冲簳鎺ュご銆佸崱绠嶆帴澶淬€佸崱鐜帴澶寸瓑纭杩炴帴浠?,
    description: "PFA 绠￠噰鐢ㄥ叏姘熺兎姘у熀鏍戣剛锛圥FA锛夋潗璐紝鍐呭緞鑼冨洿瑕嗙洊 0.5mm~1.0mm锛屽伐浣滄俯搴﹁寖鍥翠负 -230鈩儈200鈩冦€傝绯诲垪绠℃潗閫傜敤浜庨珮娲佸噣銆佽€愯厫铓€鍜屼綆鏋愬嚭瑕佹眰杈冮珮鐨勮瘯鍓傝緭閫佷笌鍒嗘瀽浠櫒娑茶矾銆傚彲鎻愪緵 RoHS 绛夋潗鏂欏悎瑙勮祫鏂欙紝鍏蜂綋鏂囦欢闅忔潗璐ㄤ笌椤圭洰瑕佹眰纭銆?,
    applications: ["楂樼函璇曞墏杈撻€?, "鑵愯殌鎬т粙璐ㄨ矾寰?, "浣庢瀽鍑烘恫璺?, "楂樻磥鍑€娴佷綋绯荤粺", "鍒嗘瀽浠櫒绠¤矾"],
    features: ["鑰愯厫铓€鎬уソ", "閫傚悎楂樻磥鍑€娑茶矾", "浣庢瀽鍑猴紝閫傚悎楂樿姹傝瘯鍓傝矾寰?, "鍙敤浜庢盁濉戞枡纭杩炴帴缁撴瀯"],
    faq: [
      ["PFA 绠￠€傚悎鍝簺娑茶矾锛?, "PFA 绠￠€傚悎楂樻磥鍑€銆佽€愯厫铓€銆佷綆鏋愬嚭鍜岄珮瑕佹眰璇曞墏杈撻€佸満鏅紝涔熷彲鐢ㄤ簬鍒嗘瀽浠櫒鍐呴儴楂樿姹傛祦浣撶郴缁熴€?],
      ["PFA 绠″拰 PTFE 绠℃€庝箞閫夛紵", "PFA 缁煎悎鎬ц兘鎺ヨ繎 PTFE锛屽悓鏃舵垚鍨嬪姞宸ユ€ф洿濂斤紝閫傚悎瀵归珮娲佸噣銆佽€愯厫铓€鍜屽姞宸ョǔ瀹氭€ч兘鏈夎姹傜殑娑茶矾銆?],
      ["PFA 绠￠€傚悎鑵愯殌鎬т粙璐ㄥ悧锛?, "PFA 绠￠€傚悎澶氱鑵愯殌鎬т粙璐ㄨ矾寰勶紝浣嗗叿浣撲粛闇€缁撳悎浠嬭川绫诲瀷銆佹祿搴︺€佹俯搴﹀拰鎺ヨЕ鏃堕棿纭鏉愭枡鍏煎鎬с€?],
      ["PFA 绠″彲浠ユ惌閰嶅摢浜涙帴澶达紵", "PFA 绠￠€氬父鍙惌閰嶅钩搴曟帴澶淬€佸崱绠嶆帴澶淬€佸崱鐜帴澶寸瓑纭杩炴帴浠讹紝闇€纭绠″寰勩€佸瘑灏佺粨鏋勫拰瀹夎绌洪棿銆?],
      ["PFA 绠￠€夊瀷鍓嶉渶瑕佺‘璁ゅ摢浜涗俊鎭紵", "寤鸿鎻愪緵浠嬭川绫诲瀷銆佹祿搴︺€佺洰鏍囨祦閲忋€佸唴寰?澶栧緞銆佺璺暱搴︺€佹俯搴︺€佸帇鍔涜寖鍥淬€佹帴澶存暟閲忓拰娲佸噣搴﹁姹傘€?]
    ]
  }
];

const normalized = details.map((item) => {
  const faqs = item.faq.map(([question, answer]) => ({
    question,
    answer,
    q: question,
    a: answer,
  }));

  return {
    slug: item.slug,
    title: item.title,
    name: item.title,
    model: item.title,
    h1Title: item.title,
    pageTitle: item.title,
    displayModel: "鎸夋潗璐ㄤ笌灏哄閫夊瀷",
    productCategory: "tubing",
    productType: "tubing",
    productTypeLabel: "绠¤矾绯诲垪",
    category: "tubing",
    detailMode: "material_selection",
    material: item.material,
    materialFullName: item.fullName,
    innerDiameterRange: item.idRange,
    workingTemperature: item.temp,
    image: baseImage,
    additionalImages: [],
    images: [],
    thumbnails: [],
    description: item.description,
    shortDescription: item.description,
    commonApplications: item.applications,
    features: item.features,
    sellingPoints: item.features,
    advantages: item.features,
    specsTitle: "瑙勬牸",
    specTitle: "瑙勬牸",
    specificationTitle: "瑙勬牸",
    specs: [
      { label: "鏉愭枡", value: item.material },
      { label: "鏉愭枡鍏ㄧО", value: item.fullName },
      { label: "鍐呭緞鑼冨洿", value: item.idRange },
      { label: "宸ヤ綔娓╁害", value: item.temp },
      { label: "瑙勬牸琛ュ厖", value: item.extra },
      { label: "閫傞厤杩炴帴鏂瑰紡", value: item.connection },
      { label: "鏉愭枡鍚堣璧勬枡", value: "鍙彁渚?RoHS 绛夋潗鏂欏悎瑙勮祫鏂欙紝鍏蜂綋鏂囦欢闅忔潗璐ㄤ笌椤圭洰瑕佹眰纭" },
    ],
    faq: faqs,
    faqs,
    faqItems: faqs,
    detailFaqs: faqs,
    bottomCtaTitle: "闇€瑕佽瘎浼扮璺祦闃讳笌娉甸榾鍖归厤锛?,
    bottomCtaDesc:
      "璇锋彁渚涙恫浣撲粙璐ㄣ€佺洰鏍囨祦閲忋€佺鏉愩€佸唴寰?澶栧緞銆佺璺暱搴︺€佹帴澶存暟閲忋€佸集鎶樻儏鍐点€佸伐浣滄俯搴﹀拰鍘嬪姏鑼冨洿銆侳OREACH 宸ョ▼甯堝彲鍗忓姪浼扮畻绠¤矾鍘嬮檷銆佹祦浣撻樆鍔涘拰姝讳綋绉紝骞剁‘璁ょ鏉愩€佹帴澶翠笌娉甸榾閰嶇疆鏄惁鍖归厤銆?,
    bottomCtaButton: "鑱旂郴宸ョ▼甯?,
    bottomCtaHref: "/contact",
  };
});

const detailJsonPath = path.join(root, "data/products/generated/tubing/detail/index.json");
backup(detailJsonPath, "tubing_detail_before_write");
writeUtf8(detailJsonPath, JSON.stringify(normalized, null, 2) + "\n");

const pagePath = path.join(root, "app/products/tubing/[slug]/page.tsx");
backup(pagePath, "tubing_page_before_write");

const pageCode = `import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";

type TubingDetailRecord = {
  slug: string;
  title: string;
  name?: string;
  model?: string;
  h1Title?: string;
  pageTitle?: string;
  displayModel?: string;
  description: string;
  image?: string;
  additionalImages?: string[];
  images?: string[];
  thumbnails?: string[];
  commonApplications?: string[];
  features?: string[];
  specsTitle?: string;
  specTitle?: string;
  specificationTitle?: string;
  specs?: { label: string; value: string }[];
  faq?: { question: string; answer: string; q?: string; a?: string }[];
  faqs?: { question: string; answer: string; q?: string; a?: string }[];
  faqItems?: { question: string; answer: string; q?: string; a?: string }[];
  detailFaqs?: { question: string; answer: string; q?: string; a?: string }[];
  bottomCtaTitle?: string;
  bottomCtaDesc?: string;
  bottomCtaButton?: string;
  bottomCtaHref?: string;
};

const details = tubingDetailData as TubingDetailRecord[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return details.map((item) => ({ slug: item.slug }));
}

function getDetailBySlug(slug: string) {
  return details.find((item) => item.slug === slug);
}

function getFaqItems(detail: TubingDetailRecord) {
  const rawFaqItems = Array.isArray(detail.faq)
    ? detail.faq
    : Array.isArray(detail.faqs)
      ? detail.faqs
      : Array.isArray(detail.faqItems)
        ? detail.faqItems
        : Array.isArray(detail.detailFaqs)
          ? detail.detailFaqs
          : [];

  return rawFaqItems
    .map((item) => ({
      question: item.question || item.q || "",
      answer: item.answer || item.a || "",
      q: item.question || item.q || "",
      a: item.answer || item.a || "",
    }))
    .filter((item) => item.question && item.answer);
}

function toClientData(detail: TubingDetailRecord) {
  const image = detail.image || "/images/products/common/product-placeholder.svg";
  const faqItems = getFaqItems(detail);

  return {
    ...detail,
    slug: detail.slug,
    title: detail.title,
    name: detail.name || detail.title,
    model: detail.model || detail.title,
    h1Title: detail.h1Title || detail.title,
    pageTitle: detail.pageTitle || detail.title,
    displayModel: detail.displayModel || "鎸夋潗璐ㄤ笌灏哄閫夊瀷",
    productCategory: "tubing",
    productType: "tubing",
    productTypeLabel: "绠¤矾绯诲垪",
    category: "tubing",
    detailMode: "material_selection",
    image,
    mainImage: image,
    imagePath: image,
    alt: detail.title,
    imageAlt: detail.title,
    additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images: Array.isArray(detail.images) ? detail.images : [],
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : [],
    description: detail.description,
    shortDescription: detail.description,
    commonApplications: Array.isArray(detail.commonApplications) ? detail.commonApplications : [],
    features: Array.isArray(detail.features) ? detail.features : [],
    sellingPoints: Array.isArray(detail.features) ? detail.features : [],
    advantages: Array.isArray(detail.features) ? detail.features : [],
    specsTitle: detail.specsTitle || "瑙勬牸",
    specTitle: detail.specTitle || detail.specsTitle || "瑙勬牸",
    specificationTitle: detail.specificationTitle || detail.specsTitle || "瑙勬牸",
    specs: Array.isArray(detail.specs) ? detail.specs : [],
    faq: faqItems,
    faqs: faqItems,
    faqItems,
    detailFaqs: faqItems,
    bottomCtaTitle: detail.bottomCtaTitle,
    bottomCtaDesc: detail.bottomCtaDesc,
    bottomCtaButton: detail.bottomCtaButton,
    bottomCtaHref: detail.bottomCtaHref,
    showCustomInquiryCta: true,
    customInquiryHref: detail.bottomCtaHref || "/contact",
    contactHref: detail.bottomCtaHref || "/contact",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    return { title: "绠¤矾绯诲垪 | FOREACH" };
  }

  return {
    title: `${detail.title} | FOREACH 绠¤矾绯诲垪`,
    description: detail.description,
  };
}

export default async function TubingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  return (
    <div data-tubing-detail-page="true">
      <ProductDetailView data={toClientData(detail)} />
    </div>
  );
}
`;

writeUtf8(pagePath, pageCode);

const clientPath = path.join(root, "components/products/detail/ProductDetailClient.tsx");

if (fs.existsSync(clientPath)) {
  backup(clientPath, "tubing_bottom_cta_before_patch");

  let client = fs.readFileSync(clientPath, "utf8");
  const marker = "TUBING_DETAIL_BOTTOM_CTA_20260707";

  if (!client.includes(marker)) {
    const helperCode = `
/*
  ${marker}
  绠¤矾璇︽儏椤靛簳閮?CTA锛氭祦闃昏绠椼€佸帇闄嶄及绠椼€佹浣撶Н璇勪及銆佺鏉愪笌娉甸榾鍖归厤銆?*/
function isTubingDetailData(data: any): boolean {
  return (
    data?.productCategory === "tubing" ||
    data?.productType === "tubing" ||
    data?.category === "tubing" ||
    data?.detailMode === "material_selection" ||
    (typeof data?.slug === "string" && data.slug.includes("-tubing"))
  );
}

function getTubingDetailBottomCta(data: any) {
  if (!isTubingDetailData(data)) {
    return null;
  }

  return {
    title: data?.bottomCtaTitle || "闇€瑕佽瘎浼扮璺祦闃讳笌娉甸榾鍖归厤锛?,
    desc:
      data?.bottomCtaDesc ||
      "璇锋彁渚涙恫浣撲粙璐ㄣ€佺洰鏍囨祦閲忋€佺鏉愩€佸唴寰?澶栧緞銆佺璺暱搴︺€佹帴澶存暟閲忋€佸集鎶樻儏鍐点€佸伐浣滄俯搴﹀拰鍘嬪姏鑼冨洿銆侳OREACH 宸ョ▼甯堝彲鍗忓姪浼扮畻绠¤矾鍘嬮檷銆佹祦浣撻樆鍔涘拰姝讳綋绉紝骞剁‘璁ょ鏉愩€佹帴澶翠笌娉甸榾閰嶇疆鏄惁鍖归厤銆?,
    button: data?.bottomCtaButton || "鑱旂郴宸ョ▼甯?,
    href: data?.bottomCtaHref || data?.contactHref || "/contact",
  };
}

`;

    if (client.includes("function getPlungerPumpBottomCta(data: any)")) {
      client = client.replace(
        "function getPlungerPumpBottomCta(data: any)",
        helperCode + "function getPlungerPumpBottomCta(data: any)"
      );
    } else {
      client += "\n" + helperCode;
    }
  }

  if (
    client.includes("function getPlungerPumpBottomCta(data: any)") &&
    !client.includes("const tubingBottomCta = getTubingDetailBottomCta(data);")
  ) {
    client = client.replace(
      /function getPlungerPumpBottomCta\(data: any\) \{\s*/,
      `function getPlungerPumpBottomCta(data: any) {
  const tubingBottomCta = getTubingDetailBottomCta(data);

  if (tubingBottomCta) {
    return tubingBottomCta;
  }

  `
    );
  }

  writeUtf8(clientPath, client);
} else {
  console.log("鏈壘鍒?ProductDetailClient.tsx锛岃烦杩囧簳閮?CTA 琛ヤ竵銆?);
}

console.log("");
console.log("绠¤矾璇︽儏椤靛凡鐢熸垚锛?);
for (const item of normalized) {
  console.log("/products/tubing/" + item.slug);
}
console.log("");
console.log("寤鸿涓嬩竴姝ヨ繍琛岋細npm run build");