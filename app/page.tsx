"use client";

import { useEffect, useMemo, useState } from "react";
import { grammarUnits, stages, vocabTopics, type GrammarUnit, type VocabTopic } from "./content";

type View = "home" | "grammar" | "vocab" | "progress" | "teacher";
type Progress = {
  date: string;
  grammarDone: number;
  vocabDone: number;
  grammarGoal: number;
  vocabGoal: number;
  xp: number;
  streak: number;
  unlockedStage: number;
  correct: number;
  total: number;
  weekly: number[];
  weak: string[];
  lastGoalDate: string;
};
type Question = { type: string; prompt: string; answer: string; hint: string; choices?: string[] };
type CustomQuestion = Question & { mode: "grammar" | "vocab"; unit: number };
type Practice = {
  mode: "grammar" | "vocab";
  title: string;
  unit: number;
  question: Question;
  number: number;
  correct: number;
  answered: boolean;
  wasCorrect: boolean;
  response: string;
  explanation: string;
  sourceIndex: number;
};

const dateKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
const initial: Progress = {
  date: dateKey(), grammarDone: 0, vocabDone: 0, grammarGoal: 5, vocabGoal: 3,
  xp: 0, streak: 0, unlockedStage: 1, correct: 0, total: 0,
  weekly: [0, 0, 0, 0, 0, 0, 0], weak: [], lastGoalDate: "",
};
const dayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];
const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const norm = (value: string) => value.toLowerCase().replace(/[’']/g, "'").replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim();

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [], field = "", quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"' && quoted && text[index + 1] === '"') { field += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(field.trim()); field = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(field.trim());
      if (row.some(Boolean)) rows.push(row);
      row = []; field = "";
    } else field += char;
  }
  row.push(field.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function csvCell(value: string) { return `"${value.replace(/"/g, '""')}"`; }

function grammarQuestion(unit: GrammarUnit, bank: CustomQuestion[] = []): Question {
  if (unit.unit === 1 && Math.random() > 0.35) {
    const data = pick([
      ["Mia", "study", "studies", "is studying"],
      ["Leo", "play", "plays", "is playing"],
      ["My brother", "watch", "watches", "is watching"],
      ["They", "study", "study", "are studying"],
      ["We", "play", "play", "are playing"],
    ]);
    const ongoing = Math.random() > 0.5;
    return {
      type: "Chia động từ · câu ngẫu nhiên",
      prompt: `${data[0]} ___ (${data[1]}) ${pick(ongoing ? ["right now", "at the moment", "today"] : ["every afternoon", "on Saturdays", "after school"])}.`,
      answer: ongoing ? data[3] : data[2],
      hint: ongoing ? "Việc đang diễn ra hoặc chỉ mang tính tạm thời." : "Một thói quen được lặp lại.",
    };
  }
  if (unit.unit === 2 && Math.random() > 0.45) {
    const name = pick(["Mia", "Leo", "Nora", "The students", "My cousins"]);
    const plural = /students|cousins/.test(name);
    const verb = pick([["study", "studying"], ["play", "playing"], ["cook", "cooking"]]);
    return {
      type: "Chia động từ · câu ngẫu nhiên",
      prompt: `${name} ___ (${verb[0]}) at 8 p.m. when the lights went out.`,
      answer: `${plural ? "were" : "was"} ${verb[1]}`,
      hint: "Dùng thì quá khứ tiếp diễn cho hành động đang diễn ra tại một thời điểm trong quá khứ.",
    };
  }
  const custom = bank.filter((question) => question.mode === "grammar" && question.unit === unit.unit);
  return { ...pick([...unit.prompts, ...custom]) };
}

function vocabQuestion(topic: VocabTopic, bank: CustomQuestion[] = []): Question {
  const custom = bank.filter((question) => question.mode === "vocab" && question.unit === topic.unit);
  if (custom.length && Math.random() < 0.5) return { ...pick(custom) };
  const target = pick(topic.words);
  const distractors = shuffle(topic.words.filter((word) => word.word !== target.word)).slice(0, 3).map((word) => word.word);
  return {
    type: "Chọn từ đúng",
    prompt: `Từ nào trong Unit ${topic.unit} có nghĩa là “${target.vi}”?`,
    answer: target.word,
    hint: `Đáp án nằm trong chủ đề “${topic.title}”.`,
    choices: shuffle([target.word, ...distractors]),
  };
}

function makePractice(mode: "grammar" | "vocab", index: number, bank: CustomQuestion[] = []): Practice {
  if (mode === "grammar") {
    const unit = grammarUnits[index];
    return { mode, title: unit.title, unit: unit.unit, question: grammarQuestion(unit, bank), number: 1, correct: 0, answered: false, wasCorrect: false, response: "", explanation: "", sourceIndex: index };
  }
  const topic = vocabTopics[index];
  return { mode, title: topic.title, unit: topic.unit, question: vocabQuestion(topic, bank), number: 1, correct: 0, answered: false, wasCorrect: false, response: "", explanation: "", sourceIndex: index };
}

function playSiu() {
  try {
    const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Context) {
      const context = new Context();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.setValueAtTime(320, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(620, context.currentTime + 0.16);
      gain.gain.setValueAtTime(0.08, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.32);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.34);
    }
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const voice = new SpeechSynthesisUtterance("Siuuu!");
      voice.rate = 0.82;
      voice.pitch = 0.72;
      voice.volume = 0.78;
      speechSynthesis.speak(voice);
    }
  } catch { /* Âm thanh không ảnh hưởng tới việc học. */ }
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [progress, setProgress] = useState<Progress>(initial);
  const [ready, setReady] = useState(false);
  const [practice, setPractice] = useState<Practice | null>(null);
  const [theory, setTheory] = useState<GrammarUnit | null>(null);
  const [sound, setSound] = useState(true);
  const [toast, setToast] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("b1-boost-progress");
      if (saved) {
        const next = { ...initial, ...JSON.parse(saved) };
        if (next.date !== dateKey()) {
          next.date = dateKey();
          next.grammarDone = 0;
          next.vocabDone = 0;
        }
        setProgress(next);
      }
      const savedSound = localStorage.getItem("b1-boost-sound");
      if (savedSound !== null) setSound(savedSound === "true");
      const savedQuestions = localStorage.getItem("b1-boost-custom-questions");
      if (savedQuestions) setCustomQuestions(JSON.parse(savedQuestions));
    } catch { /* Dùng dữ liệu mặc định nếu trình duyệt chặn lưu trữ. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("b1-boost-progress", JSON.stringify(progress));
    localStorage.setItem("b1-boost-sound", String(sound));
    localStorage.setItem("b1-boost-custom-questions", JSON.stringify(customQuestions));
  }, [progress, sound, customQuestions, ready]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const grammarUnlocked = progress.unlockedStage * 2;
  const vocabUnlocked = progress.unlockedStage;
  const completed = Math.min(progress.grammarDone, progress.grammarGoal) + Math.min(progress.vocabDone, progress.vocabGoal);
  const totalGoal = progress.grammarGoal + progress.vocabGoal;
  const dailyPercent = Math.round((completed / totalGoal) * 100);
  const accuracy = progress.total ? Math.round((progress.correct / progress.total) * 100) : 0;
  const grammarLeft = Math.max(0, progress.grammarGoal - progress.grammarDone);
  const vocabLeft = Math.max(0, progress.vocabGoal - progress.vocabDone);
  const nextMode: "grammar" | "vocab" = grammarLeft > 0 ? "grammar" : "vocab";
  const suggestedGrammar = Math.min(grammarUnlocked - 1, (progress.grammarDone * 3 + progress.vocabDone) % grammarUnlocked);
  const suggestedVocab = Math.min(vocabUnlocked - 1, (progress.vocabDone + progress.grammarDone) % vocabUnlocked);
  const todayLabel = useMemo(() => new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit" }).format(new Date()), []);

  const navigate = (nextView: View) => {
    setView(nextView);
    setPractice(null);
  };

  const launch = (mode: "grammar" | "vocab", index?: number) => {
    const max = mode === "grammar" ? grammarUnlocked : vocabUnlocked;
    const selected = Math.min(index ?? Math.floor(Math.random() * max), max - 1);
    setPractice(makePractice(mode, selected, customQuestions));
  };

  const grade = (response: string) => {
    if (!practice || practice.answered || !response.trim()) return;
    const isCorrect = practice.question.answer.split("|").map(norm).includes(norm(response));
    setPractice({
      ...practice,
      answered: true,
      wasCorrect: isCorrect,
      response,
      correct: practice.correct + (isCorrect ? 1 : 0),
      explanation: isCorrect ? "Đáp án và cách dùng đều chính xác." : `Đáp án phù hợp là: ${practice.question.answer}`,
    });
    setProgress((old) => ({
      ...old,
      total: old.total + 1,
      correct: old.correct + (isCorrect ? 1 : 0),
      weak: isCorrect ? old.weak : [practice.title, ...old.weak.filter((item) => item !== practice.title)].slice(0, 4),
    }));
    if (isCorrect) {
      if (sound) playSiu();
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 900);
    }
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    grade(String(new FormData(event.currentTarget).get("answer") || ""));
  };

  const finishPractice = () => {
    if (!practice) return;
    const grammarMode = practice.mode === "grammar";
    setProgress((old) => {
      const grammarDone = old.grammarDone + (grammarMode ? 1 : 0);
      const vocabDone = old.vocabDone + (grammarMode ? 0 : 1);
      const reachedGoal = grammarDone >= old.grammarGoal && vocabDone >= old.vocabGoal;
      const firstCompletionToday = reachedGoal && old.lastGoalDate !== dateKey();
      const weekly = [...old.weekly];
      weekly[(new Date().getDay() + 6) % 7] += grammarMode ? 40 : 30;
      return {
        ...old,
        grammarDone,
        vocabDone,
        xp: old.xp + (grammarMode ? 40 : 30),
        weekly,
        streak: firstCompletionToday ? old.streak + 1 : old.streak,
        lastGoalDate: firstCompletionToday ? dateKey() : old.lastGoalDate,
        unlockedStage: firstCompletionToday ? Math.min(14, old.unlockedStage + 1) : old.unlockedStage,
      };
    });
    setToast(grammarMode ? "+40 XP · Đã hoàn thành 1 bài ngữ pháp" : "+30 XP · Đã hoàn thành 1 chủ đề từ vựng");
    setPractice(null);
    setView("home");
  };

  const nextQuestion = () => {
    if (!practice) return;
    if (practice.number === 4) {
      finishPractice();
      return;
    }
    const question = practice.mode === "grammar"
      ? grammarQuestion(grammarUnits[practice.sourceIndex], customQuestions)
      : vocabQuestion(vocabTopics[practice.sourceIndex], customQuestions);
    setPractice({ ...practice, question, number: practice.number + 1, answered: false, wasCorrect: false, response: "", explanation: "" });
  };

  return (
    <div className="app-shell">
      {celebrate && <div className="confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</div>}
      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}

      <header className="topbar">
        <button className="brand" onClick={() => navigate("home")} aria-label="Về trang Hôm nay">
          <span className="brand-mark">B1</span>
          <span className="brand-name">B1 Boost<small>Học mỗi ngày</small></span>
        </button>
        <nav aria-label="Điều hướng chính">
          {(["home", "grammar", "vocab", "progress"] as View[]).map((item) => (
            <button key={item} className={view === item && !practice ? "active" : ""} onClick={() => navigate(item)}>
              {item === "home" ? "Hôm nay" : item === "grammar" ? "Ngữ pháp" : item === "vocab" ? "Từ vựng" : "Tiến độ"}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <button className="icon-button" onClick={() => setSound(!sound)} aria-label={sound ? "Tắt âm thanh" : "Bật âm thanh"}>{sound ? "Âm thanh: Bật" : "Âm thanh: Tắt"}</button>
          <button className="streak-pill" onClick={() => navigate("progress")} aria-label={`${progress.streak} ngày học liên tiếp`}><span>Chuỗi ngày</span><b>{progress.streak}</b></button>
          <button className="teacher-button" onClick={() => navigate("teacher")}>Giáo viên</button>
        </div>
      </header>

      <main>
        {practice ? (
          <PracticeScreen practice={practice} close={() => setPractice(null)} submit={submit} grade={grade} next={nextQuestion} />
        ) : view === "home" ? (
          <>
            <section className="home-hero">
              <div className="hero-main">
                <div className="hero-date"><span className="status-dot" />{todayLabel}</div>
                <p className="overline">KẾ HOẠCH HỌC HÔM NAY</p>
                <h1>Học một chút.<br /><em>Nhớ thật lâu.</em></h1>
                <p className="hero-lead">Hoàn thành từng bài ngắn, xem đáp án ngay và duy trì thói quen học tiếng Anh mỗi ngày.</p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => launch(nextMode)}>{dailyPercent === 100 ? "Luyện thêm một bài" : "Bắt đầu bài tiếp theo"}<span>→</span></button>
                  <button className="secondary-button" onClick={() => navigate("grammar")}>Xem lộ trình</button>
                </div>
                <div className="hero-note"><b>4 câu / bài</b><span>Khoảng 3 phút, có giải thích sau mỗi câu.</span></div>
              </div>

              <aside className="today-card">
                <div className="today-head">
                  <div><p>TIẾN ĐỘ HÔM NAY</p><strong>{dailyPercent}%</strong></div>
                  <span>{completed}/{totalGoal} bài</span>
                </div>
                <div className="overall-track" aria-label={`Hoàn thành ${dailyPercent}%`}><i style={{ width: `${dailyPercent}%` }} /></div>
                <DailyTask label="Ngữ pháp" description={grammarLeft ? `Còn ${grammarLeft} bài` : "Đã đủ mục tiêu"} value={progress.grammarDone} goal={progress.grammarGoal} tone="green" action={() => launch("grammar")} />
                <DailyTask label="Từ vựng" description={vocabLeft ? `Còn ${vocabLeft} chủ đề` : "Đã đủ mục tiêu"} value={progress.vocabDone} goal={progress.vocabGoal} tone="orange" action={() => launch("vocab")} />
                <div className="unlock-note"><span>{progress.unlockedStage}/14</span><p><b>Chặng đang mở</b><small>Hoàn thành mục tiêu ngày để mở chặng kế tiếp.</small></p></div>
              </aside>
            </section>

            <section className="content-section">
              <div className="section-heading">
                <div><p className="overline">GỢI Ý CHO EM</p><h2>Tiếp tục từ đây</h2></div>
                <button className="link-button" onClick={() => navigate("grammar")}>Xem toàn bộ lộ trình →</button>
              </div>
              <div className="lesson-grid">
                <LessonCard mode="grammar" index={suggestedGrammar} go={() => launch("grammar", suggestedGrammar)} />
                <LessonCard mode="vocab" index={suggestedVocab} go={() => launch("vocab", suggestedVocab)} />
              </div>
            </section>

            <section className="stats-grid">
              <StatCard label="CHUỖI NGÀY HỌC" value={`${progress.streak} ngày`} copy="Hoàn thành đủ mục tiêu mỗi ngày để nối dài chuỗi." accent="gold" />
              <StatCard label="ĐỘ CHÍNH XÁC" value={`${accuracy}%`} copy={progress.total ? `${progress.correct}/${progress.total} câu trả lời đúng.` : "Kết quả sẽ xuất hiện sau câu trả lời đầu tiên."} accent="blue" />
              <StatCard label="CẦN ÔN LẠI" value={progress.weak[0] || "Chưa có"} copy={progress.weak.length ? "Chủ điểm này xuất hiện trong câu trả lời sai gần đây." : "Hệ thống sẽ tự ghi lại những chủ điểm em thường sai."} accent="coral" />
            </section>
          </>
        ) : view === "grammar" ? (
          <Library kind="grammar" unlocked={grammarUnlocked}>
            {stages.map((stage, stageIndex) => {
              const locked = stageIndex + 1 > progress.unlockedStage;
              return (
                <section className={`stage ${locked ? "locked" : ""}`} key={stage.id}>
                  <div className="stage-rail"><span>{locked ? "—" : stage.id}</span><i /></div>
                  <div className="stage-content">
                    <div className="stage-title"><div><small>CHẶNG {stage.id}</small><h2>{stage.grammar[0].title.split(",")[0]} → {stage.vocab.title}</h2></div>{locked && <span>Chưa mở khóa</span>}</div>
                    <div className="unit-grid">
                      {stage.grammar.map((unit) => {
                        const index = grammarUnits.findIndex((item) => item.unit === unit.unit);
                        return <article className="unit-card" key={unit.unit}><span className="unit-number">UNIT {unit.unit}</span><h3>{unit.title}</h3><p>{unit.summary}</p><div><button disabled={locked} onClick={() => setTheory(unit)}>Xem lý thuyết</button><button disabled={locked} onClick={() => launch("grammar", index)}>Luyện 4 câu →</button></div></article>;
                      })}
                    </div>
                  </div>
                </section>
              );
            })}
          </Library>
        ) : view === "vocab" ? (
          <Library kind="vocab" unlocked={vocabUnlocked}>
            <div className="topic-grid">
              {vocabTopics.map((topic, index) => {
                const locked = index >= progress.unlockedStage;
                return <article className={`topic-card ${locked ? "locked" : ""}`} key={topic.unit}><div className="topic-head"><span>UNIT {topic.unit}</span><b>{locked ? "Chưa mở" : `${topic.words.length} từ`}</b></div><h2>{topic.title}</h2><p>Chủ đề {index + 1} trong lộ trình từ vựng.</p><div className="word-cloud">{topic.words.slice(0, 6).map((word) => <span key={word.word}>{word.word}</span>)}</div><button disabled={locked} onClick={() => launch("vocab", index)}>{locked ? "Hoàn thành chặng trước để mở" : "Luyện chủ đề này →"}</button></article>;
              })}
            </div>
          </Library>
        ) : view === "progress" ? (
          <ProgressPage progress={progress} accuracy={accuracy} />
        ) : (
          <TeacherPage progress={progress} setProgress={setProgress} customQuestions={customQuestions} setCustomQuestions={setCustomQuestions} toast={setToast} />
        )}
      </main>

      {theory && <TheoryModal unit={theory} close={() => setTheory(null)} go={() => { const index = grammarUnits.findIndex((item) => item.unit === theory.unit); setTheory(null); launch("grammar", index); }} />}
      <footer><span><b>B1 Boost</b> · Học ít, nhớ lâu.</span><span>Tiến độ được lưu trên thiết bị này.</span></footer>
    </div>
  );
}

function DailyTask({ label, description, value, goal, tone, action }: { label: string; description: string; value: number; goal: number; tone: string; action: () => void }) {
  const percent = Math.min(100, (value / goal) * 100);
  return <button className="daily-task" onClick={action}><span className={`task-icon ${tone}`}>{label === "Ngữ pháp" ? "Aa" : "W"}</span><span className="task-copy"><b>{label}<small>{description}</small></b><span className="task-track"><i className={tone} style={{ width: `${percent}%` }} /></span></span><strong>{value}/{goal}</strong></button>;
}

function LessonCard({ mode, index, go }: { mode: "grammar" | "vocab"; index: number; go: () => void }) {
  if (mode === "grammar") {
    const unit = grammarUnits[index];
    return <article className="lesson-card"><div className="lesson-kicker"><span className="lesson-icon green">Aa</span><small>NGỮ PHÁP · UNIT {unit.unit}</small></div><h3>{unit.title}</h3><p>{unit.summary}</p><div className="lesson-footer"><span>4 câu · khoảng 3 phút</span><button onClick={go}>Bắt đầu →</button></div></article>;
  }
  const topic = vocabTopics[index];
  return <article className="lesson-card"><div className="lesson-kicker"><span className="lesson-icon orange">W</span><small>TỪ VỰNG · UNIT {topic.unit}</small></div><h3>{topic.title}</h3><p>Ôn nghĩa tiếng Việt bằng câu hỏi trắc nghiệm được xáo trộn ở mỗi lượt.</p><div className="lesson-footer"><span>4 câu · khoảng 3 phút</span><button onClick={go}>Bắt đầu →</button></div></article>;
}

function StatCard({ label, value, copy, accent }: { label: string; value: string; copy: string; accent: string }) {
  return <article className={`stat-card ${accent}`}><div className="stat-mark" /><small>{label}</small><strong>{value}</strong><p>{copy}</p></article>;
}

function PracticeScreen({ practice, close, submit, grade, next }: { practice: Practice; close: () => void; submit: (event: React.FormEvent<HTMLFormElement>) => void; grade: (value: string) => void; next: () => void }) {
  return <section className="practice-page"><div className="practice-top"><button onClick={close} aria-label="Thoát bài luyện">×</button><div><span style={{ width: `${(practice.number / 4) * 100}%` }} /></div><b>Câu {practice.number}/4</b></div><div className="practice-layout"><aside className="practice-context"><span className={practice.mode === "grammar" ? "green" : "orange"}>{practice.mode === "grammar" ? "Aa" : "W"}</span><small>{practice.mode === "grammar" ? "NGỮ PHÁP" : "TỪ VỰNG"} · UNIT {practice.unit}</small><h2>{practice.title}</h2><p>{practice.mode === "grammar" ? "Nhập đáp án bằng tiếng Anh. Dấu câu và chữ hoa không ảnh hưởng kết quả." : "Chọn từ tiếng Anh phù hợp với nghĩa tiếng Việt."}</p><div className="practice-score"><strong>{practice.correct}</strong><span>câu đúng<br />trong lượt này</span></div></aside><article className={`question-card ${practice.answered ? (practice.wasCorrect ? "correct" : "wrong") : ""}`}><div className="question-meta"><span>{practice.question.type}</span><small>CÂU {String(practice.unit * 173 + practice.number * 41).padStart(4, "0")}</small></div><h1>{practice.question.prompt}</h1>{practice.question.choices ? <div className="choice-grid">{practice.question.choices.map((choice, index) => <button key={choice} disabled={practice.answered} className={practice.answered && choice === practice.question.answer ? "answer" : practice.answered && choice === practice.response ? "picked-wrong" : ""} onClick={() => grade(choice)}><span>{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div> : <form onSubmit={submit}><label htmlFor="answer">Câu trả lời của em</label><div className="answer-row"><input id="answer" name="answer" autoFocus autoComplete="off" disabled={practice.answered} placeholder="Nhập đáp án bằng tiếng Anh…" /><button disabled={practice.answered}>Kiểm tra</button></div></form>}{!practice.answered ? <details className="hint"><summary>Xem gợi ý</summary><p>{practice.question.hint}</p></details> : <div className="feedback"><span>{practice.wasCorrect ? "SIUUU!" : "Chưa đúng"}</span><div><b>{practice.wasCorrect ? "Chính xác!" : "Mình xem lại nhé."}</b><p>{practice.explanation}</p></div><button onClick={next}>{practice.number === 4 ? "Hoàn thành bài" : "Câu tiếp theo"} →</button></div>}</article></div></section>;
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="page-intro"><p className="overline">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>;
}

function Library({ kind, unlocked, children }: { kind: "grammar" | "vocab"; unlocked: number; children: React.ReactNode }) {
  return <section className="page-wrap"><PageIntro eyebrow={kind === "grammar" ? "LỘ TRÌNH NGỮ PHÁP" : "LỘ TRÌNH TỪ VỰNG"} title={kind === "grammar" ? "Hiểu quy tắc, rồi luyện thật chắc." : "Học đúng nhóm từ trong sách."} copy={kind === "grammar" ? `${unlocked}/28 unit đang mở. Mỗi unit có phần lý thuyết tóm tắt và bài luyện ngắn.` : `${unlocked}/14 chủ đề đang mở. Mỗi lượt gồm 4 câu trắc nghiệm được xáo trộn.`} />{children}</section>;
}

function ProgressPage({ progress, accuracy }: { progress: Progress; accuracy: number }) {
  return <section className="page-wrap"><PageIntro eyebrow="TIẾN ĐỘ CÁ NHÂN" title="Nhìn rõ từng bước tiến." copy="Mọi kết quả được lưu ngay trên thiết bị này, không cần tạo tài khoản." /><div className="metric-grid"><Metric value={`${progress.xp}`} label="Tổng điểm XP" accent="green" /><Metric value={`${progress.streak}`} label="Ngày học liên tiếp" accent="gold" /><Metric value={`${accuracy}%`} label="Độ chính xác" accent="blue" /><Metric value={`${progress.unlockedStage}/14`} label="Chặng đã mở" accent="coral" /></div><div className="progress-layout"><article className="chart-card"><div className="card-heading"><div><small>7 NGÀY GẦN ĐÂY</small><h2>Nhịp học trong tuần</h2></div><span>{progress.weekly.reduce((a, b) => a + b, 0)} XP</span></div><div className="bar-chart">{progress.weekly.map((value, index) => <div key={dayLabels[index]}><span>{value || ""}</span><i style={{ height: `${Math.max(8, Math.min(100, value / 2))}%` }} /><small>{dayLabels[index]}</small></div>)}</div></article><article className="focus-card"><small>GỢI Ý ÔN TẬP</small><h2>Chủ điểm cần chú ý</h2>{progress.weak.length ? progress.weak.map((item, index) => <div className="focus-row" key={item}><span>{index + 1}</span><div><b>{item}</b><small>Xuất hiện trong câu trả lời sai gần đây</small></div></div>) : <div className="empty-focus"><span>✓</span><b>Chưa có dữ liệu</b><p>Hoàn thành một bài để hệ thống đưa ra gợi ý.</p></div>}</article></div></section>;
}

function Metric({ value, label, accent }: { value: string; label: string; accent: string }) {
  return <article className={`metric ${accent}`}><strong>{value}</strong><span>{label}</span></article>;
}

function TeacherPage({ progress, setProgress, customQuestions, setCustomQuestions, toast }: { progress: Progress; setProgress: React.Dispatch<React.SetStateAction<Progress>>; customQuestions: CustomQuestion[]; setCustomQuestions: React.Dispatch<React.SetStateAction<CustomQuestion[]>>; toast: (value: string) => void }) {
  const changeGoal = (key: "grammarGoal" | "vocabGoal", amount: number) => setProgress((old) => ({ ...old, [key]: Math.max(key === "grammarGoal" ? 3 : 2, Math.min(key === "grammarGoal" ? 8 : 4, old[key] + amount)) }));
  const reset = () => { if (confirm("Xóa toàn bộ chuỗi ngày học, điểm XP và tiến độ trên thiết bị này?")) { setProgress({ ...initial, date: dateKey() }); toast("Đã đặt lại toàn bộ tiến độ."); } };
  const grammarCount = customQuestions.filter((question) => question.mode === "grammar").length;
  const vocabCount = customQuestions.length - grammarCount;
  const downloadCsv = (questions?: CustomQuestion[]) => {
    const header = "phan,unit,dang_bai,cau_hoi,dap_an,goi_y,lua_chon";
    const sample = [
      ["ngữ pháp", "1", "Chia động từ", "Mia usually ___ (study) after dinner.", "studies", "Chủ ngữ ngôi thứ ba số ít.", ""],
      ["từ vựng", "3", "Chọn từ đúng", "Từ nào có nghĩa là ghi điểm?", "score", "Chọn từ thuộc chủ đề Fun and games.", "score|beat|train|support"],
    ];
    const rows = questions?.length ? questions.map((question) => [question.mode === "grammar" ? "ngữ pháp" : "từ vựng", String(question.unit), question.type, question.prompt, question.answer, question.hint, question.choices?.join("|") || ""]) : sample;
    const csv = `\uFEFF${header}\n${rows.map((row) => row.map(csvCell).join(",")).join("\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = questions?.length ? "b1-boost-ngan-hang-cau-hoi.csv" : "b1-boost-file-mau.csv"; anchor.click();
    URL.revokeObjectURL(url);
  };
  const importCsv = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const rows = parseCsv((await file.text()).replace(/^\uFEFF/, ""));
      const headers = rows[0]?.map((value) => value.toLowerCase().trim()) || [];
      const column = (name: string) => headers.indexOf(name);
      if (["phan", "unit", "dang_bai", "cau_hoi", "dap_an"].some((name) => column(name) < 0)) throw new Error("Thiếu cột bắt buộc");
      const imported: CustomQuestion[] = rows.slice(1).map((row) => {
        const modeText = row[column("phan")]?.toLowerCase() || "";
        const mode = modeText.includes("ngữ") || modeText === "grammar" ? "grammar" : modeText.includes("từ") || modeText === "vocab" ? "vocab" : null;
        const unit = Number(row[column("unit")]);
        const validUnit = mode === "grammar" ? unit >= 1 && unit <= 28 : mode === "vocab" ? vocabTopics.some((topic) => topic.unit === unit) : false;
        if (!mode || !validUnit || !row[column("cau_hoi")] || !row[column("dap_an")]) throw new Error("Có dòng sai phần, unit, câu hỏi hoặc đáp án");
        const choices = row[column("lua_chon")]?.split("|").map((choice) => choice.trim()).filter(Boolean);
        return { mode, unit, type: row[column("dang_bai")] || "Câu bổ sung", prompt: row[column("cau_hoi")], answer: row[column("dap_an")], hint: row[column("goi_y")] || "Hãy nhớ lại quy tắc của unit này.", choices: choices?.length ? choices : undefined };
      });
      setCustomQuestions((old) => [...old, ...imported]);
      toast(`Đã nhập ${imported.length} câu hỏi mới.`);
    } catch (error) { alert(`Không thể nhập file: ${error instanceof Error ? error.message : "định dạng không hợp lệ"}. Hãy dùng file mẫu để kiểm tra lại.`); }
    event.target.value = "";
  };
  const clearBank = () => { if (customQuestions.length && confirm(`Xóa ${customQuestions.length} câu hỏi đã nhập trên thiết bị này?`)) { setCustomQuestions([]); toast("Đã xóa ngân hàng câu hỏi bổ sung."); } };
  return <section className="page-wrap"><PageIntro eyebrow="GÓC GIÁO VIÊN" title="Thiết lập mục tiêu học mỗi ngày." copy="Các thay đổi chỉ áp dụng trên thiết bị hiện tại, phù hợp cho một học sinh hoặc một máy tính trong lớp." /><div className="teacher-grid"><Setting icon="Aa" label="MỤC TIÊU NGỮ PHÁP" title={`${progress.grammarGoal} bài / ngày`} copy="Mỗi bài gồm 4 câu: chia động từ, sửa lỗi, viết lại câu hoặc điền từ."><Counter value={progress.grammarGoal} minus={() => changeGoal("grammarGoal", -1)} plus={() => changeGoal("grammarGoal", 1)} /></Setting><Setting icon="W" label="MỤC TIÊU TỪ VỰNG" title={`${progress.vocabGoal} chủ đề / ngày`} copy="Mỗi chủ đề gồm 4 câu trắc nghiệm từ danh sách Destination B1."><Counter value={progress.vocabGoal} minus={() => changeGoal("vocabGoal", -1)} plus={() => changeGoal("vocabGoal", 1)} /></Setting><article className="setting-card wide"><div><small>MỞ KHÓA LỘ TRÌNH</small><h2>Đang ở chặng {progress.unlockedStage}/14</h2><p>Mỗi chặng gồm 2 unit ngữ pháp và 1 chủ đề từ vựng theo thứ tự trong sách.</p><div className="stage-dots">{stages.map((stage) => <i key={stage.id} className={stage.id <= progress.unlockedStage ? "done" : ""} />)}</div></div><div className="teacher-actions"><button disabled={progress.unlockedStage >= 14} onClick={() => setProgress((old) => ({ ...old, unlockedStage: Math.min(14, old.unlockedStage + 1) }))}>Mở chặng kế tiếp</button><button className="danger" onClick={reset}>Đặt lại dữ liệu</button></div></article></div><article className="question-bank"><div className="bank-heading"><div><small>NGÂN HÀNG CÂU HỎI</small><h2>Nạp thêm câu hỏi bằng file CSV</h2><p>Tải file mẫu, điền câu hỏi trong Excel rồi nhập lại. Câu mới sẽ được trộn vào đúng Unit khi học sinh luyện tập.</p></div><div className="bank-total"><strong>{customQuestions.length}</strong><span>câu đã thêm<small>{grammarCount} ngữ pháp · {vocabCount} từ vựng</small></span></div></div><div className="bank-steps"><span><b>1</b>Tải file mẫu</span><span><b>2</b>Điền câu hỏi trong Excel</span><span><b>3</b>Nhập file trở lại</span></div><div className="bank-actions"><button onClick={() => downloadCsv()}>Tải file mẫu CSV</button><label className="upload-button">Nhập file CSV<input type="file" accept=".csv,text/csv" onChange={importCsv} /></label><button disabled={!customQuestions.length} onClick={() => downloadCsv(customQuestions)}>Xuất bản sao lưu</button><button className="danger" disabled={!customQuestions.length} onClick={clearBank}>Xóa câu đã thêm</button></div><p className="bank-note"><b>Lưu ý:</b> ngân hàng bổ sung hiện được lưu trên thiết bị này. Hãy dùng “Xuất bản sao lưu” trước khi đổi máy hoặc xóa dữ liệu trình duyệt.</p></article><div className="source-note"><span>✓</span><div><b>Nguồn nội dung</b><p>Lý thuyết ngữ pháp và danh sách từ vựng được xây dựng theo Destination B1. Câu luyện được tạo từ mẫu riêng, không sao chép bài tập trong sách.</p></div></div></section>;
}

function Setting({ icon, label, title, copy, children }: { icon: string; label: string; title: string; copy: string; children: React.ReactNode }) {
  return <article className="setting-card"><span className="setting-icon">{icon}</span><div><small>{label}</small><h2>{title}</h2><p>{copy}</p></div>{children}</article>;
}

function Counter({ value, minus, plus }: { value: number; minus: () => void; plus: () => void }) {
  return <div className="counter"><button onClick={minus} aria-label="Giảm mục tiêu">−</button><span>{value}</span><button onClick={plus} aria-label="Tăng mục tiêu">+</button></div>;
}

function TheoryModal({ unit, close, go }: { unit: GrammarUnit; close: () => void; go: () => void }) {
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}><article className="theory-modal" role="dialog" aria-modal="true" aria-labelledby="theory-title"><button className="modal-close" onClick={close} aria-label="Đóng">×</button><span className="unit-number">UNIT {unit.unit} · LÝ THUYẾT</span><h1 id="theory-title">{unit.title}</h1><p className="lead">{unit.summary}</p><div className="rule-box"><small>QUY TẮC CẦN NHỚ</small>{unit.rules.map((rule, index) => <div key={rule}><span>{index + 1}</span><p>{rule}</p></div>)}</div><div className="example-box"><small>VÍ DỤ</small><p>{unit.example}</p></div><button className="primary-button full" onClick={go}>Luyện 4 câu về chủ điểm này →</button></article></div>;
}
