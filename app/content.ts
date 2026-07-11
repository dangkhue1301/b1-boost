export type GrammarUnit = {
  unit: number;
  title: string;
  summary: string;
  rules: string[];
  example: string;
  prompts: { type: string; prompt: string; answer: string; hint: string }[];
};

export type VocabWord = { word: string; vi: string };
export type VocabTopic = { unit: number; title: string; words: VocabWord[] };

export const grammarUnits: GrammarUnit[] = [
  {
    unit: 1,
    title: "Present simple, present continuous, stative verbs",
    summary: "Phân biệt thói quen, việc đang diễn ra và động từ chỉ trạng thái.",
    rules: ["Present simple: thói quen, sự thật, lịch cố định.", "Present continuous: việc đang xảy ra hoặc tình huống tạm thời.", "Stative verbs như know, want, believe thường không dùng ở dạng continuous."],
    example: "I usually walk to school, but today I am taking the bus.",
    prompts: [
      { type: "Chia động từ", prompt: "Mia usually ___ (study) after dinner.", answer: "studies", hint: "Thói quen + chủ ngữ ngôi 3 số ít." },
      { type: "Chia động từ", prompt: "Look! The children ___ (run) across the field.", answer: "are running", hint: "Look! báo hiệu hành động đang diễn ra." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: I am knowing the answer.", answer: "I know the answer.", hint: "Know là stative verb." },
      { type: "Viết lại câu", prompt: "Dùng 'today': Leo / wear / a blue jacket.", answer: "Leo is wearing a blue jacket today.", hint: "Tình huống tạm thời ở hiện tại." },
    ],
  },
  {
    unit: 2,
    title: "Past simple, past continuous, used to",
    summary: "Kể sự việc đã kết thúc, bối cảnh quá khứ và thói quen trước đây.",
    rules: ["Past simple: hành động đã hoàn tất.", "Past continuous: hành động đang diễn ra tại một thời điểm quá khứ.", "used to + V: thói quen/trạng thái trước đây nhưng nay không còn."],
    example: "I was reading when the lights went out.",
    prompts: [
      { type: "Chia động từ", prompt: "We ___ (watch) TV when Dad arrived.", answer: "were watching", hint: "Hành động nền đang diễn ra." },
      { type: "Chia động từ", prompt: "Nora ___ (visit) Hue last summer.", answer: "visited", hint: "Last summer -> past simple." },
      { type: "Viết lại câu", prompt: "I played outside every day as a child. (USED)", answer: "I used to play outside every day as a child.", hint: "used to + động từ nguyên mẫu." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: They was walking home at 8 p.m.", answer: "They were walking home at 8 p.m.", hint: "They đi với were." },
    ],
  },
  {
    unit: 4,
    title: "Present perfect simple, present perfect continuous",
    summary: "Nối quá khứ với hiện tại qua kết quả, trải nghiệm và khoảng thời gian.",
    rules: ["have/has + past participle: kết quả hoặc trải nghiệm.", "have/has been + V-ing: nhấn mạnh quá trình/thời lượng.", "Dùng since cho mốc, for cho khoảng thời gian."],
    example: "She has written three emails. She has been working since six.",
    prompts: [
      { type: "Chia động từ", prompt: "I ___ (finish) my project, so I can relax now.", answer: "have finished", hint: "Nhấn mạnh kết quả hiện tại." },
      { type: "Chia động từ", prompt: "Ben ___ (practise) for two hours.", answer: "has been practising", hint: "Nhấn mạnh thời lượng." },
      { type: "Điền từ", prompt: "We have lived here ___ 2021.", answer: "since", hint: "2021 là một mốc thời gian." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: She have never seen snow.", answer: "She has never seen snow.", hint: "She đi với has." },
    ],
  },
  {
    unit: 5,
    title: "Past perfect simple, past perfect continuous",
    summary: "Diễn tả việc xảy ra trước một mốc hoặc hành động khác trong quá khứ.",
    rules: ["had + past participle: việc hoàn tất trước một việc quá khứ khác.", "had been + V-ing: quá trình kéo dài trước mốc quá khứ.", "Thường đi với before, after, by the time."],
    example: "The match had started before we arrived.",
    prompts: [
      { type: "Chia động từ", prompt: "By the time I called, Maya ___ (leave).", answer: "had left", hint: "Rời đi xảy ra trước lúc gọi." },
      { type: "Chia động từ", prompt: "He was tired because he ___ (run).", answer: "had been running", hint: "Nhấn mạnh quá trình gây ra kết quả." },
      { type: "Nối câu", prompt: "The film started. Then we entered. (BY THE TIME)", answer: "By the time we entered, the film had started.", hint: "Việc xảy ra trước dùng past perfect." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: They had ate before the journey.", answer: "They had eaten before the journey.", hint: "Past participle của eat là eaten." },
    ],
  },
  {
    unit: 7,
    title: "Future time",
    summary: "Chọn will, be going to, present continuous hoặc present simple.",
    rules: ["will: quyết định tức thời, dự đoán, lời hứa.", "be going to: kế hoạch/ý định hoặc bằng chứng hiện tại.", "Present continuous: sắp xếp cá nhân; present simple: lịch trình."],
    example: "The train leaves at 8, and we are meeting at 7:30.",
    prompts: [
      { type: "Chia động từ", prompt: "Look at those clouds! It ___ (rain).", answer: "is going to rain", hint: "Có bằng chứng hiện tại." },
      { type: "Điền dạng đúng", prompt: "The museum ___ (open) at nine tomorrow.", answer: "opens", hint: "Lịch trình cố định dùng present simple." },
      { type: "Viết câu", prompt: "I promise / help / you.", answer: "I promise I will help you.", hint: "Lời hứa dùng will." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: We will meeting Sam at six.", answer: "We are meeting Sam at six.", hint: "Sắp xếp đã có kế hoạch dùng present continuous." },
    ],
  },
  {
    unit: 8,
    title: "Prepositions of time and place",
    summary: "Dùng at, on, in và các giới từ chỉ vị trí/chuyển động chính xác.",
    rules: ["at + giờ/điểm cụ thể; on + ngày/bề mặt; in + tháng/năm/không gian.", "between = ở giữa hai; among = giữa nhiều.", "into chỉ chuyển động vào trong; in chỉ vị trí bên trong."],
    example: "Meet me at the station on Monday morning.",
    prompts: [
      { type: "Điền giới từ", prompt: "The lesson starts ___ 7:30.", answer: "at", hint: "Giờ cụ thể dùng at." },
      { type: "Điền giới từ", prompt: "My birthday is ___ November.", answer: "in", hint: "Tháng dùng in." },
      { type: "Điền giới từ", prompt: "The cat jumped ___ the box.", answer: "into", hint: "Có chuyển động vào trong." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: We have English in Monday.", answer: "We have English on Monday.", hint: "Thứ/ngày dùng on." },
    ],
  },
  {
    unit: 10,
    title: "The passive 1",
    summary: "Dùng câu bị động khi hành động hoặc kết quả quan trọng hơn người làm.",
    rules: ["be + past participle.", "Thì của câu nằm ở động từ be.", "Có thể thêm by + tác nhân khi cần."],
    example: "English is spoken in many countries.",
    prompts: [
      { type: "Viết lại bị động", prompt: "People grow coffee in this region.", answer: "Coffee is grown in this region.", hint: "Present simple passive: is/are + V3." },
      { type: "Chia động từ", prompt: "The bridge ___ (build) in 1998.", answer: "was built", hint: "Past simple passive." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: These phones are make in Korea.", answer: "These phones are made in Korea.", hint: "Cần past participle made." },
      { type: "Viết lại bị động", prompt: "Someone cleaned the room yesterday.", answer: "The room was cleaned yesterday.", hint: "Không cần nêu tác nhân không xác định." },
    ],
  },
  {
    unit: 11,
    title: "The passive 2",
    summary: "Bị động với nhiều thì, modal verbs và cấu trúc đặc biệt.",
    rules: ["modal + be + past participle.", "Perfect passive: have/has been + past participle.", "Causative: have/get something done."],
    example: "The work must be finished today.",
    prompts: [
      { type: "Viết lại bị động", prompt: "They must repair the road.", answer: "The road must be repaired.", hint: "Modal + be + V3." },
      { type: "Chia động từ", prompt: "The results ___ already ___ (announce).", answer: "have already been announced", hint: "Present perfect passive." },
      { type: "Viết lại câu", prompt: "A mechanic serviced my bike. (HAD)", answer: "I had my bike serviced.", hint: "have + object + past participle." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: The email should sent today.", answer: "The email should be sent today.", hint: "Thiếu be sau modal." },
    ],
  },
  {
    unit: 13,
    title: "Countable and uncountable nouns",
    summary: "Phân biệt danh từ đếm được/không đếm được và từ chỉ lượng.",
    rules: ["Countable: a/an, many, few; có số nhiều.", "Uncountable: much, little; không dùng a/an.", "some/any/a lot of dùng được với cả hai."],
    example: "We need some information and a few ideas.",
    prompts: [
      { type: "Chọn từ", prompt: "How ___ information did you find?", answer: "much", hint: "Information không đếm được." },
      { type: "Chọn từ", prompt: "There are only a ___ chairs left.", answer: "few", hint: "Chairs đếm được số nhiều." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: Can you give me an advice?", answer: "Can you give me some advice?", hint: "Advice không đếm được." },
      { type: "Điền từ", prompt: "We haven't got ___ sugar.", answer: "any", hint: "Câu phủ định thường dùng any." },
    ],
  },
  {
    unit: 14,
    title: "Articles",
    summary: "Chọn a/an, the hoặc không dùng mạo từ.",
    rules: ["a/an: một đối tượng chưa xác định, số ít đếm được.", "the: đã xác định, duy nhất hoặc đã nhắc tới.", "Không dùng mạo từ khi nói chung với danh từ số nhiều/không đếm được."],
    example: "I saw a film. The film was brilliant.",
    prompts: [
      { type: "Điền mạo từ", prompt: "I bought ___ umbrella because it was raining.", answer: "an", hint: "Umbrella bắt đầu bằng nguyên âm." },
      { type: "Điền mạo từ", prompt: "___ sun rises in the east.", answer: "The", hint: "Mặt trời là duy nhất." },
      { type: "Điền ký hiệu Ø", prompt: "___ music helps me concentrate.", answer: "Ø", hint: "Nói về âm nhạc nói chung." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: She is best player in the team.", answer: "She is the best player in the team.", hint: "So sánh nhất dùng the." },
    ],
  },
  {
    unit: 16,
    title: "Pronouns and possessive determiners",
    summary: "Dùng đại từ chủ ngữ, tân ngữ, sở hữu và phản thân.",
    rules: ["my/your... đứng trước danh từ; mine/yours... đứng độc lập.", "Object pronouns: me, him, her, us, them.", "Reflexive pronouns dùng khi chủ thể và tân ngữ là một."],
    example: "This is my notebook. Yours is on the desk.",
    prompts: [
      { type: "Điền đại từ", prompt: "That coat belongs to Anna. It is ___.", answer: "hers", hint: "Không có danh từ theo sau." },
      { type: "Điền đại từ", prompt: "Please give the keys to ___. (I)", answer: "me", hint: "Sau giới từ cần object pronoun." },
      { type: "Điền đại từ", prompt: "We painted the room by ___.", answer: "ourselves", hint: "Chủ ngữ we -> ourselves." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: This bag is her.", answer: "This bag is hers.", hint: "Đại từ sở hữu của she là hers." },
    ],
  },
  {
    unit: 17,
    title: "Relative clauses",
    summary: "Kết nối thông tin bằng who, which, that, whose, where.",
    rules: ["who cho người; which cho vật; that cho cả hai trong defining clauses.", "whose chỉ sở hữu; where chỉ nơi chốn.", "Non-defining clauses có dấu phẩy và không dùng that."],
    example: "The girl who won the race is my cousin.",
    prompts: [
      { type: "Nối câu", prompt: "I met a girl. She speaks four languages.", answer: "I met a girl who speaks four languages.", hint: "Đại từ quan hệ cho người là who." },
      { type: "Điền từ", prompt: "This is the café ___ we first met.", answer: "where", hint: "Thay cho nơi chốn." },
      { type: "Điền từ", prompt: "The boy ___ bike was stolen called the police.", answer: "whose", hint: "Chỉ sở hữu." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: My aunt, that lives in Da Nang, is a chef.", answer: "My aunt, who lives in Da Nang, is a chef.", hint: "Không dùng that trong non-defining clause." },
    ],
  },
  {
    unit: 19,
    title: "Modals 1: ability, permission, advice",
    summary: "Diễn tả khả năng, xin phép và lời khuyên.",
    rules: ["can/could/be able to: khả năng.", "can/could/may: xin hoặc cho phép.", "should/ought to: lời khuyên."],
    example: "You should rest, and you ought to drink more water.",
    prompts: [
      { type: "Viết lại câu", prompt: "I advise you to see a doctor. (SHOULD)", answer: "You should see a doctor.", hint: "should + V nguyên mẫu." },
      { type: "Điền modal", prompt: "___ I borrow your pen, please?", answer: "Could", hint: "Could lịch sự khi xin phép." },
      { type: "Viết lại câu", prompt: "Mia knows how to swim. (CAN)", answer: "Mia can swim.", hint: "Can diễn tả khả năng hiện tại." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: You should to apologise.", answer: "You should apologise.", hint: "Sau modal dùng V nguyên mẫu không to." },
    ],
  },
  {
    unit: 20,
    title: "Modals 2: obligation, probability, possibility",
    summary: "Diễn tả nghĩa vụ, suy đoán chắc chắn và khả năng.",
    rules: ["must/have to: bắt buộc; mustn't: cấm; don't have to: không cần.", "must: suy đoán rất chắc; can't: chắc chắn không.", "may/might/could: có thể."],
    example: "You must wear a helmet, but you don't have to bring one.",
    prompts: [
      { type: "Điền modal", prompt: "You ___ use your phone during the exam. It's forbidden.", answer: "mustn't", hint: "Cấm làm gì dùng mustn't." },
      { type: "Điền modal", prompt: "She has been travelling all day. She ___ be tired.", answer: "must", hint: "Suy đoán rất chắc." },
      { type: "Viết lại câu", prompt: "It isn't necessary to come early. (HAVE)", answer: "You don't have to come early.", hint: "Không cần thiết = don't have to." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: He mights arrive late.", answer: "He might arrive late.", hint: "Modal không thêm -s." },
    ],
  },
  {
    unit: 22,
    title: "Modals 3: the modal perfect",
    summary: "Suy đoán, tiếc nuối hoặc phê bình về quá khứ.",
    rules: ["modal + have + past participle.", "must have: chắc hẳn đã; can't have: chắc chắn không.", "should have: lẽ ra nên; might/could have: có thể đã."],
    example: "You should have told me earlier.",
    prompts: [
      { type: "Viết lại câu", prompt: "I'm sure Tom forgot. (MUST)", answer: "Tom must have forgotten.", hint: "Suy đoán chắc chắn về quá khứ." },
      { type: "Điền dạng đúng", prompt: "You ___ (tell) me. I could have helped.", answer: "should have told", hint: "Lẽ ra nên làm nhưng đã không làm." },
      { type: "Viết lại câu", prompt: "Perhaps they took the wrong bus. (MIGHT)", answer: "They might have taken the wrong bus.", hint: "Khả năng trong quá khứ." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: She must have went home.", answer: "She must have gone home.", hint: "Sau have dùng past participle gone." },
    ],
  },
  {
    unit: 23,
    title: "Questions, question tags, indirect questions",
    summary: "Đặt câu hỏi trực tiếp, câu hỏi đuôi và câu hỏi gián tiếp lịch sự.",
    rules: ["Câu hỏi trực tiếp đảo trợ động từ trước chủ ngữ.", "Question tag thường trái dấu với mệnh đề chính.", "Indirect question dùng trật tự khẳng định, không đảo."],
    example: "Could you tell me where the station is?",
    prompts: [
      { type: "Đặt câu hỏi", prompt: "Ask about the time she arrived.", answer: "What time did she arrive?", hint: "Past simple question: did + subject + V." },
      { type: "Điền question tag", prompt: "You're new here, ___?", answer: "aren't you", hint: "Mệnh đề khẳng định -> tag phủ định." },
      { type: "Viết lại gián tiếp", prompt: "Where is the bank? (COULD YOU TELL ME)", answer: "Could you tell me where the bank is?", hint: "Không đảo is trước chủ ngữ trong câu hỏi gián tiếp." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: Do you know where does he live?", answer: "Do you know where he lives?", hint: "Indirect question dùng trật tự khẳng định." },
    ],
  },
  {
    unit: 25,
    title: "So and such, too and enough",
    summary: "Nhấn mạnh mức độ và diễn tả quá nhiều/đủ.",
    rules: ["so + adjective/adverb; such + (a/an) + adjective + noun.", "too + adjective + to V: quá... nên không thể.", "adjective + enough / enough + noun."],
    example: "It was such a good film that we watched it twice.",
    prompts: [
      { type: "Điền từ", prompt: "The box is ___ heavy for me to lift.", answer: "too", hint: "Quá nặng để làm gì." },
      { type: "Điền từ", prompt: "It was ___ an exciting match!", answer: "such", hint: "such + a/an + adjective + noun." },
      { type: "Viết lại câu", prompt: "The room is too small for ten people. (ENOUGH)", answer: "The room isn't big enough for ten people.", hint: "not + opposite adjective + enough." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: She is enough old to drive.", answer: "She is old enough to drive.", hint: "Enough đứng sau adjective." },
    ],
  },
  {
    unit: 26,
    title: "Comparatives and superlatives",
    summary: "So sánh hơn, nhất, bằng và mức độ thay đổi.",
    rules: ["short adjective + -er/-est; more/most + long adjective.", "as ... as; not as ... as.", "much/far/a lot nhấn mạnh comparative; by far nhấn mạnh superlative."],
    example: "This route is much shorter than the other one.",
    prompts: [
      { type: "Chia tính từ", prompt: "This puzzle is ___ (difficult) than the last one.", answer: "more difficult", hint: "Tính từ dài dùng more." },
      { type: "Chia tính từ", prompt: "That was the ___ (bad) meal I've ever had.", answer: "worst", hint: "Bad -> worse -> worst." },
      { type: "Viết lại câu", prompt: "Leo is taller than Minh. (AS)", answer: "Minh isn't as tall as Leo.", hint: "not as + adjective + as." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: This is the most easiest question.", answer: "This is the easiest question.", hint: "Không dùng cả most và -est." },
    ],
  },
  {
    unit: 28,
    title: "Conditionals 1: zero, first, second",
    summary: "Nói về sự thật, khả năng thực tế và tình huống giả định.",
    rules: ["Zero: if + present, present.", "First: if + present, will + V.", "Second: if + past, would + V."],
    example: "If I had more time, I would learn Japanese.",
    prompts: [
      { type: "Chia động từ", prompt: "If water ___ (reach) 100°C, it boils.", answer: "reaches", hint: "Zero conditional dùng present ở cả hai vế." },
      { type: "Chia động từ", prompt: "If it rains, we ___ (stay) at home.", answer: "will stay", hint: "First conditional." },
      { type: "Chia động từ", prompt: "If I ___ (be) you, I'd apologise.", answer: "were", hint: "Second conditional thường dùng were cho mọi ngôi." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: If she will call, tell me.", answer: "If she calls, tell me.", hint: "Không dùng will trong mệnh đề if của first conditional." },
    ],
  },
  {
    unit: 29,
    title: "Conditionals 2: third",
    summary: "Nói về điều kiện không có thật trong quá khứ và kết quả tưởng tượng.",
    rules: ["if + past perfect, would have + past participle.", "Dùng để tiếc nuối hoặc tưởng tượng kết quả khác.", "Có thể dùng could/might have ở mệnh đề kết quả."],
    example: "If we had left earlier, we would have caught the train.",
    prompts: [
      { type: "Chia động từ", prompt: "If I ___ (know), I would have helped.", answer: "had known", hint: "Mệnh đề if dùng past perfect." },
      { type: "Chia động từ", prompt: "They would have won if they ___ (practise) more.", answer: "had practised", hint: "Điều kiện không thật trong quá khứ." },
      { type: "Viết lại câu", prompt: "I missed the bus because I woke up late. (IF)", answer: "If I hadn't woken up late, I wouldn't have missed the bus.", hint: "Đảo ngược sự thật trong quá khứ." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: If she had studied, she would pass.", answer: "If she had studied, she would have passed.", hint: "Kết quả third conditional: would have + V3." },
    ],
  },
  {
    unit: 31,
    title: "Reported speech",
    summary: "Tường thuật lời nói với lùi thì, đổi đại từ và trạng từ thời gian.",
    rules: ["Present thường lùi về past; past về past perfect khi reporting verb ở quá khứ.", "Đổi đại từ theo người nói/nghe.", "now -> then, today -> that day, tomorrow -> the next day."],
    example: "'I am tired,' she said. → She said that she was tired.",
    prompts: [
      { type: "Tường thuật", prompt: "'I love this song,' Mia said.", answer: "Mia said that she loved that song.", hint: "I -> she; love -> loved; this -> that." },
      { type: "Tường thuật", prompt: "'We will call tomorrow,' they said.", answer: "They said that they would call the next day.", hint: "will -> would; tomorrow -> the next day." },
      { type: "Tường thuật", prompt: "'I have finished,' Leo said.", answer: "Leo said that he had finished.", hint: "Present perfect -> past perfect." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: She said me that she was busy.", answer: "She told me that she was busy.", hint: "tell + object; say không đi trực tiếp với object." },
    ],
  },
  {
    unit: 32,
    title: "Reported questions, orders, requests",
    summary: "Tường thuật câu hỏi, mệnh lệnh và yêu cầu.",
    rules: ["Reported questions dùng trật tự khẳng định.", "Yes/no question: ask + if/whether.", "Order/request: tell/ask + object + (not) to V."],
    example: "'Please sit down.' → She asked me to sit down.",
    prompts: [
      { type: "Tường thuật câu hỏi", prompt: "'Where do you live?' she asked me.", answer: "She asked me where I lived.", hint: "Không đảo trong reported question." },
      { type: "Tường thuật câu hỏi", prompt: "'Are you ready?' he asked.", answer: "He asked if I was ready.", hint: "Yes/no question dùng if hoặc whether." },
      { type: "Tường thuật yêu cầu", prompt: "'Please open the window,' Mum said to me.", answer: "Mum asked me to open the window.", hint: "ask + object + to V." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: He asked where was the station.", answer: "He asked where the station was.", hint: "Dùng trật tự khẳng định." },
    ],
  },
  {
    unit: 34,
    title: "Direct and indirect objects",
    summary: "Sắp xếp tân ngữ trực tiếp/gián tiếp và dùng to/for.",
    rules: ["verb + indirect object + direct object: give me the book.", "verb + direct object + to/for + indirect object.", "Một số động từ chỉ dùng cấu trúc có to/for."],
    example: "Dad bought me a bike. = Dad bought a bike for me.",
    prompts: [
      { type: "Viết lại câu", prompt: "She sent a postcard to me.", answer: "She sent me a postcard.", hint: "Indirect object có thể đứng trước direct object." },
      { type: "Điền giới từ", prompt: "Can you explain this rule ___ me?", answer: "to", hint: "Explain cần to trước người nhận." },
      { type: "Viết lại câu", prompt: "I made a sandwich for Leo.", answer: "I made Leo a sandwich.", hint: "make + person + thing." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: He suggested me a new plan.", answer: "He suggested a new plan to me.", hint: "Suggest không dùng cấu trúc hai tân ngữ trực tiếp." },
    ],
  },
  {
    unit: 35,
    title: "Wish",
    summary: "Diễn tả mong muốn trái với hiện tại, quá khứ hoặc sự khó chịu.",
    rules: ["wish + past simple: mong hiện tại khác đi.", "wish + past perfect: tiếc về quá khứ.", "wish + would: mong người/sự việc thay đổi."],
    example: "I wish I had more free time.",
    prompts: [
      { type: "Viết lại câu", prompt: "I don't know the answer. (WISH)", answer: "I wish I knew the answer.", hint: "Trái với hiện tại -> past simple." },
      { type: "Viết lại câu", prompt: "I didn't bring an umbrella. (WISH)", answer: "I wish I had brought an umbrella.", hint: "Tiếc về quá khứ -> past perfect." },
      { type: "Điền dạng đúng", prompt: "I wish you ___ (stop) making that noise.", answer: "would stop", hint: "Mong hành vi thay đổi." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: I wish I can swim.", answer: "I wish I could swim.", hint: "Wish về hiện tại lùi can -> could." },
    ],
  },
  {
    unit: 37,
    title: "-ing and infinitive",
    summary: "Chọn gerund, to-infinitive hoặc bare infinitive sau động từ.",
    rules: ["enjoy, avoid, finish + V-ing.", "want, decide, hope + to V.", "modal verbs + bare infinitive; một số động từ đổi nghĩa theo dạng theo sau."],
    example: "I enjoy reading, but I want to watch this film.",
    prompts: [
      { type: "Chia động từ", prompt: "She enjoys ___ (dance).", answer: "dancing", hint: "Enjoy + V-ing." },
      { type: "Chia động từ", prompt: "We decided ___ (leave) early.", answer: "to leave", hint: "Decide + to-infinitive." },
      { type: "Chia động từ", prompt: "You should ___ (check) your work.", answer: "check", hint: "Modal + bare infinitive." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: He suggested to go by bus.", answer: "He suggested going by bus.", hint: "Suggest + V-ing." },
    ],
  },
  {
    unit: 38,
    title: "Both, either, neither, so, nor",
    summary: "Nối hai lựa chọn và diễn tả sự đồng tình.",
    rules: ["both ... and; either ... or; neither ... nor.", "So + auxiliary + subject: đồng tình khẳng định.", "Neither/Nor + auxiliary + subject: đồng tình phủ định."],
    example: "Both Mia and Leo play tennis. So do I.",
    prompts: [
      { type: "Điền cấu trúc", prompt: "___ Lan and Minh speak English well.", answer: "Both", hint: "Cả hai cùng đúng." },
      { type: "Điền cấu trúc", prompt: "You can choose ___ tea or coffee.", answer: "either", hint: "Một trong hai: either ... or." },
      { type: "Đáp lại", prompt: "'I don't like horror films.' → '___ do I.'", answer: "Neither", hint: "Đồng tình với câu phủ định." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: Neither Tom or Ben was late.", answer: "Neither Tom nor Ben was late.", hint: "Neither đi với nor." },
    ],
  },
  {
    unit: 40,
    title: "Connectives",
    summary: "Liên kết ý về bổ sung, đối lập, nguyên nhân và kết quả.",
    rules: ["because + clause; because of + noun/V-ing.", "although/even though + clause; despite/in spite of + noun/V-ing.", "therefore/as a result: kết quả; moreover/in addition: bổ sung."],
    example: "Although it was raining, we went out.",
    prompts: [
      { type: "Điền liên từ", prompt: "We stayed home ___ the heavy rain.", answer: "because of", hint: "Theo sau là cụm danh từ." },
      { type: "Điền liên từ", prompt: "___ she was tired, she finished the race.", answer: "Although", hint: "Đối lập + mệnh đề." },
      { type: "Viết lại câu", prompt: "It was cold, but we went swimming. (DESPITE)", answer: "Despite the cold, we went swimming.", hint: "Despite + noun." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: Because of it was late, we left.", answer: "Because it was late, we left.", hint: "Because + clause; because of + noun." },
    ],
  },
  {
    unit: 41,
    title: "The causative",
    summary: "Nói việc nhờ/thuê người khác làm hoặc khiến ai làm gì.",
    rules: ["have/get + object + past participle: nhờ dịch vụ.", "have + person + bare infinitive.", "get + person + to-infinitive."],
    example: "I had my hair cut yesterday.",
    prompts: [
      { type: "Viết lại câu", prompt: "A photographer took our picture. (HAD)", answer: "We had our picture taken.", hint: "have + object + V3." },
      { type: "Chia động từ", prompt: "I'm going to get my laptop ___ (repair).", answer: "repaired", hint: "get + object + past participle." },
      { type: "Viết lại câu", prompt: "I persuaded Leo to help me. (GOT)", answer: "I got Leo to help me.", hint: "get + person + to V." },
      { type: "Sửa lỗi sai", prompt: "Sửa câu: She had her nails paint.", answer: "She had her nails painted.", hint: "Causative cần past participle." },
    ],
  },
];

export const vocabTopics: VocabTopic[] = [
  { unit: 3, title: "Fun and games", words: [
    ["beat", "đánh bại"], ["board game", "trò chơi bàn cờ"], ["captain", "đội trưởng"], ["challenge", "thử thách"], ["champion", "nhà vô địch"], ["cheat", "gian lận"], ["competition", "cuộc thi"], ["opponent", "đối thủ"], ["referee", "trọng tài"], ["score", "ghi điểm"], ["support", "ủng hộ"], ["train", "luyện tập"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 6, title: "Learning and doing", words: [
    ["achieve", "đạt được"], ["brain", "bộ não"], ["clever", "thông minh"], ["concentrate", "tập trung"], ["consider", "cân nhắc"], ["course", "khóa học"], ["experience", "kinh nghiệm"], ["hesitate", "do dự"], ["instruction", "chỉ dẫn"], ["make progress", "tiến bộ"], ["qualification", "bằng cấp"], ["revise", "ôn tập"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 9, title: "Coming and going", words: [
    ["abroad", "ở nước ngoài"], ["accommodation", "chỗ ở"], ["book", "đặt chỗ"], ["cancel", "hủy"], ["convenient", "thuận tiện"], ["cruise", "chuyến du thuyền"], ["destination", "điểm đến"], ["flight", "chuyến bay"], ["journey", "hành trình"], ["luggage", "hành lý"], ["passport", "hộ chiếu"], ["souvenir", "quà lưu niệm"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 12, title: "Friends and relations", words: [
    ["apologise", "xin lỗi"], ["confident", "tự tin"], ["couple", "cặp đôi"], ["defend", "bảo vệ"], ["generous", "hào phóng"], ["grateful", "biết ơn"], ["independent", "độc lập"], ["loyal", "trung thành"], ["patient", "kiên nhẫn"], ["recognise", "nhận ra"], ["respect", "tôn trọng"], ["trust", "tin tưởng"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 15, title: "Buying and selling", words: [
    ["advertisement", "quảng cáo"], ["afford", "có khả năng chi trả"], ["bargain", "món hời"], ["brand", "thương hiệu"], ["catalogue", "danh mục"], ["customer", "khách hàng"], ["demand", "nhu cầu"], ["fee", "phí"], ["profit", "lợi nhuận"], ["purchase", "mua hàng"], ["receipt", "hóa đơn"], ["supply", "nguồn cung"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 18, title: "Inventions and discoveries", words: [
    ["artificial", "nhân tạo"], ["automatic", "tự động"], ["complicated", "phức tạp"], ["digital", "kỹ thuật số"], ["discover", "khám phá"], ["equipment", "thiết bị"], ["experiment", "thí nghiệm"], ["gadget", "thiết bị nhỏ"], ["invent", "phát minh"], ["laboratory", "phòng thí nghiệm"], ["research", "nghiên cứu"], ["technology", "công nghệ"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 21, title: "Sending and receiving", words: [
    ["announcement", "thông báo"], ["broadcast", "phát sóng"], ["channel", "kênh"], ["contact", "liên hệ"], ["file", "tệp"], ["informal", "không trang trọng"], ["interrupt", "ngắt lời"], ["media", "truyền thông"], ["publish", "xuất bản"], ["request", "yêu cầu"], ["signal", "tín hiệu"], ["whisper", "thì thầm"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 24, title: "People and daily life", words: [
    ["admit", "thừa nhận"], ["charity", "tổ chức từ thiện"], ["community", "cộng đồng"], ["culture", "văn hóa"], ["familiar", "quen thuộc"], ["government", "chính phủ"], ["habit", "thói quen"], ["population", "dân số"], ["resident", "cư dân"], ["responsible", "có trách nhiệm"], ["tradition", "truyền thống"], ["typical", "điển hình"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 27, title: "Working and earning", words: [
    ["ambition", "tham vọng"], ["application", "đơn ứng tuyển"], ["career", "sự nghiệp"], ["colleague", "đồng nghiệp"], ["contract", "hợp đồng"], ["department", "phòng ban"], ["earn", "kiếm tiền"], ["income", "thu nhập"], ["interview", "phỏng vấn"], ["profession", "nghề nghiệp"], ["salary", "lương"], ["staff", "nhân viên"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 30, title: "Body and lifestyle", words: [
    ["affect", "ảnh hưởng"], ["balance", "cân bằng"], ["benefit", "lợi ích"], ["breathe", "hít thở"], ["cough", "ho"], ["cure", "chữa trị"], ["exercise", "tập thể dục"], ["healthy", "khỏe mạnh"], ["infection", "nhiễm trùng"], ["injury", "chấn thương"], ["recover", "hồi phục"], ["treatment", "điều trị"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 33, title: "Creating and building", words: [
    ["ancient", "cổ xưa"], ["cotton", "vải bông"], ["create", "tạo ra"], ["design", "thiết kế"], ["fold", "gấp"], ["gallery", "phòng trưng bày"], ["material", "vật liệu"], ["pattern", "hoa văn"], ["practical", "thực tế"], ["rough", "thô ráp"], ["smooth", "mịn"], ["tool", "dụng cụ"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 36, title: "Nature and the universe", words: [
    ["climate", "khí hậu"], ["environment", "môi trường"], ["extinct", "tuyệt chủng"], ["forecast", "dự báo"], ["global", "toàn cầu"], ["heatwave", "đợt nắng nóng"], ["lightning", "tia chớp"], ["mammal", "động vật có vú"], ["planet", "hành tinh"], ["preserve", "bảo tồn"], ["species", "loài"], ["wildlife", "động vật hoang dã"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 39, title: "Laughing and crying", words: [
    ["amusing", "hài hước"], ["annoy", "làm phiền"], ["attitude", "thái độ"], ["behave", "cư xử"], ["calm", "bình tĩnh"], ["celebrate", "ăn mừng"], ["emotion", "cảm xúc"], ["enthusiastic", "nhiệt tình"], ["miserable", "khổ sở"], ["polite", "lịch sự"], ["regret", "hối tiếc"], ["sense of humour", "khiếu hài hước"],
  ].map(([word, vi]) => ({ word, vi })) },
  { unit: 42, title: "Problems and solutions", words: [
    ["accident", "tai nạn"], ["assume", "giả định"], ["cause", "nguyên nhân"], ["complain", "phàn nàn"], ["convince", "thuyết phục"], ["criticise", "chỉ trích"], ["doubt", "nghi ngờ"], ["encourage", "khuyến khích"], ["investigate", "điều tra"], ["positive", "tích cực"], ["refuse", "từ chối"], ["solution", "giải pháp"],
  ].map(([word, vi]) => ({ word, vi })) },
];

export const stages = vocabTopics.map((vocab, index) => ({
  id: index + 1,
  grammar: [grammarUnits[index * 2], grammarUnits[index * 2 + 1]],
  vocab,
}));

