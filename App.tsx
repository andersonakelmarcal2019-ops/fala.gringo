
import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Headphones, 
  Smartphone, 
  Star, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck,
  Zap,
  MousePointer2,
  Clock,
  Download,
  Infinity as InfinityIcon,
  Lightbulb,
  Target,
  ShoppingBag
} from 'lucide-react';

// --- Static Data ---
const BRAZILIAN_NAMES = [
  "João Silva", "Maria Oliveira", "Pedro Santos", "Ana Souza", "Carlos Pereira",
  "Juliana Lima", "Ricardo Costa", "Fernanda Rocha", "Lucas Mendes", "Beatriz Alves",
  "Gabriel Barbosa", "Camila Castro", "Marcos Vinícius", "Patrícia Gomes", "Felipe Machado",
  "Amanda Ribeiro", "Rodrigo Nogueira", "Larissa Fernandes", "Thiago Silva", "Letícia Martins"
];

const IDEAL_POINTS = [
  "Já tentou estudar inglês, mas nunca conseguiu aprender",
  "Não tem tempo para cursos longos e aulas chatas",
  "Quer aprender só o que realmente importa pra entender o idioma",
  "Não quer gastar dinheiro com cursos e aplicativos sem aprender",
  "Quer entender músicas, filmes e conversas sem tradução",
  "Sempre sonhou em falar inglês, mas acha que já é tarde demais"
];

// --- Optimized Components ---

const CTAButton = memo(({ text, className, onClick }: { text: string; className?: string; onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    whileInView={{ scale: [1, 1.05, 1] }}
    viewport={{ once: false, amount: 0.8 }}
    onClick={onClick}
    className={`bg-orange-500 hover:bg-orange-600 text-white font-black py-5 px-8 md:px-12 rounded-2xl shadow-xl cta-shadow transition-all duration-300 text-lg md:text-2xl uppercase tracking-tighter flex items-center justify-center gap-3 w-full md:w-auto ${className}`}
  >
    {text}
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
    </motion.div>
  </motion.button>
));

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-sky-600 transition-colors"
      >
        <span className="text-lg md:text-xl font-bold pr-8 text-slate-800 leading-tight">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-6 h-6 text-sky-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-500 text-lg leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SalesNotification = memo(() => {
  const [visible, setVisible] = useState(false);
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    let hideTimeout: number;
    const showNotification = () => {
      const randomName = BRAZILIAN_NAMES[Math.floor(Math.random() * BRAZILIAN_NAMES.length)];
      setCurrentName(randomName);
      setVisible(true);
      hideTimeout = window.setTimeout(() => setVisible(false), 4000);
    };

    const initialTimeout = window.setTimeout(showNotification, 3000);
    const interval = window.setInterval(showNotification, 7000);

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearTimeout(hideTimeout);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          className="fixed top-24 right-4 z-[110] glass bg-white/95 p-4 rounded-2xl shadow-2xl border border-sky-100 flex items-center gap-4 max-w-[280px] md:max-w-[320px]"
        >
          <div className="bg-sky-500 p-2 rounded-full shrink-0">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 leading-tight">{currentName}</p>
            <p className="text-xs text-slate-500 font-medium">Acabou de adquirir o Guia!</p>
          </div>
          <div className="absolute -top-1 -right-1">
             <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// --- Main Page Sections ---

const TopBanner = memo(() => {
  const [today, setToday] = useState('');
  useEffect(() => setToday(new Date().toLocaleDateString('pt-BR')), []);

  return (
    <div className="bg-red-600 text-white py-3 px-4 text-center font-bold text-sm md:text-base sticky top-0 z-[100] shadow-lg">
      <p className="flex items-center justify-center gap-2">
        <span className="animate-pulse">⚠️</span> Atenção: Oferta Promocional Apenas HOJE ({today})
      </p>
    </div>
  );
});

const Hero = memo(() => (
  <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-16 pb-16 overflow-hidden bg-white">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] translate-y-1/2"></div>
    </div>
    <div className="container mx-auto px-6 relative z-10 text-center">
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-4xl md:text-7xl lg:text-8xl font-[900] mb-8 leading-[1] tracking-tighter text-slate-900">
        Apenas 7 Dias e Mais Nada <br />
        <span className="gradient-text italic">e Você Já Entende Inglês!</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-semibold px-4">
        🤡 Não caia no golpe das escolas de inglês e não pague por curso, apenas decore essas palavras!
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mb-16 max-w-3xl mx-auto px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-sky-100 blur-[80px] rounded-full opacity-40 -z-10"></div>
          {/* Fix: changed fetchpriority to fetchPriority for React compatibility */}
          <img 
            src="https://i.imgur.com/JYNq1RG.png" 
            alt="Guia e Audiobook Mockup" 
            width="800" height="500" 
            decoding="async" fetchPriority="high"
            className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-transform duration-700"
          />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col items-center gap-6">
        <CTAButton text="SIM! QUERO APRENDER AGORA" />
        <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
          <MousePointer2 className="w-4 h-4" /> Acesso Vitalício + Download Imediato
        </div>
      </motion.div>
    </div>
  </section>
));

const Statistics = memo(() => (
  <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
    <div className="container mx-auto max-w-4xl text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
        <h3 className="text-3xl md:text-5xl font-[900] leading-tight text-slate-900 uppercase italic tracking-tighter">
          85% do inglês falado usa sempre <br />
          <span className="text-sky-600 underline decoration-sky-300 underline-offset-[12px]">as mesmas palavras.</span>
        </h3>
        <p className="text-xl md:text-2xl text-slate-500 font-medium">Aprenda essas palavras e o inglês para de parecer impossível.</p>
      </motion.div>
    </div>
  </section>
));

const WhyMethod = memo(() => (
  <section className="py-24 px-6 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
    <div className="container mx-auto max-w-5xl text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-sky-100 p-4 rounded-full mb-8 inline-block">
        <Lightbulb className="w-10 h-10 text-sky-600 fill-sky-600" />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
        💡 Por que aprender apenas <span className="text-sky-600">1000 palavras</span> é o jeito mais rápido de entender inglês?
      </motion.h2>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0, scale: [1, 1.02, 1] }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.5 }} className="glass p-8 md:p-12 rounded-[40px] bg-white border-2 border-sky-100 mb-12 shadow-xl text-lg md:text-2xl text-slate-700 font-medium leading-relaxed space-y-6 text-left md:text-center">
        <p>Você sabia que em qualquer idioma, a maior parte das conversas acontece com um número pequeno de palavras?</p>
        <p className="font-bold text-slate-900">No inglês, as <span className="text-sky-600">1000 palavras mais usadas</span> aparecem em mais de 80% das conversas reais.</p>
        <p>Isso significa que você já entende o essencial dos diálogos do dia a dia — <span className="italic underline decoration-sky-400">sem precisar estudar gramática por anos.</span></p>
      </motion.div>
      <CTAButton text="SIM! QUERO APRENDER RÁPIDO!" />
    </div>
  </section>
));

const DifferenceSection = memo(() => (
  <section className="py-24 px-6 bg-white overflow-hidden">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase italic mx-auto">
          Esse método é <br /> <span className="text-sky-600">diferente de tudo</span> <br /> que você já viu!
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          {[
            { icon: <Target className="w-7 h-7 text-sky-500" />, title: "Aprenda apenas o necessário", text: "Essas 1000 palavras são as mais usadas in 80% das conversas reais." },
            { icon: <BookOpen className="w-7 h-7 text-sky-500" />, title: "Tradução e pronúncia lado a lado", text: "Você conhece a palavra, o seu significado e como é a pronúncia correta." },
            { icon: <Headphones className="w-7 h-7 text-sky-500" />, title: "Acompanhamento em áudio (audiobook)", text: "Ouça enquanto faz outras coisas e aprenda de forma natural." },
            { icon: <Download className="text-sky-500 w-7 h-7" />, title: "Acesso imediato e vitalício", text: "Baixe e comece agora, estude quando e onde quiser, no seu tempo." },
            { icon: <Star className="w-7 h-7 text-sky-500" />, title: "Método validado por alunos reais", text: "Mais de 500 alunos já comprovaram que é possível entender inglês em poucos dias." }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0, scale: [1, 1.03, 1] }} viewport={{ once: false, amount: 0.8 }} transition={{ delay: i * 0.05 }} className="flex gap-5 group">
              <div className="mt-1 bg-sky-50 p-3 rounded-2xl group-hover:bg-sky-100 transition-colors shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-xl font-black text-slate-900 mb-1">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div className="relative mb-10 w-full">
            <div className="absolute inset-0 bg-sky-100 blur-[100px] rounded-full opacity-30 -z-10 scale-150"></div>
            <img 
              src="https://i.imgur.com/DHF0gfL.png" alt="Diferencial do Método" 
              width="600" height="450" loading="lazy" decoding="async"
              className="w-full h-auto drop-shadow-2xl rounded-[40px] hover:rotate-1 transition-transform duration-500"
            />
          </div>
          <CTAButton text="SIM! QUERO APRENDER AGORA!" />
        </div>
      </div>
    </div>
  </section>
));

const IdealForSection = memo(() => (
  <section className="py-24 px-6 bg-slate-50">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
          Esse método é <span className="text-sky-600">ideal para quem:</span>
        </h2>
        <div className="w-24 h-2 bg-sky-500 mx-auto rounded-full"></div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {IDEAL_POINTS.map((text, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0, scale: [1, 1.02, 1] }} viewport={{ once: false, amount: 0.8 }} transition={{ delay: i * 0.1 }} className="glass p-6 rounded-3xl flex gap-4 items-center bg-white hover:bg-sky-50 transition-colors group">
            <CheckCircle className="w-6 h-6 text-sky-500 shrink-0 group-hover:scale-125 transition-transform" />
            <p className="text-slate-700 font-bold text-lg">{text}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center"><CTAButton text="SIM! QUERO APRENDER!" /></div>
    </div>
  </section>
));

const ProductDetails = memo(() => (
  <section className="py-24 px-6 bg-white">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase text-slate-900 tracking-tighter">
          Aqui não tem <span className="text-sky-600 italic">teoria inútil.</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto">Você vai aprender o que realmente aparece em 80% das conversas do dia a dia.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <BookOpen className="w-10 h-10 text-sky-600" />, title: "📘 Guia", features: ["Palavra em inglês", "Tradução em português", "Pronúncia simplificada"] },
          { icon: <Headphones className="w-10 h-10 text-indigo-600" />, title: "🎧 Audiobook", features: ["Ouça e repita", "Aprenda no carro", "Sem precisar sentar"] },
          { icon: <Smartphone className="w-10 h-10 text-purple-600" />, title: "📱 Estude onde quiser", features: ["Celular", "Computador", "Tablet"] }
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }} viewport={{ once: false, amount: 0.8 }} transition={{ delay: i * 0.1 }} className="glass p-10 rounded-[48px] bg-white hover:border-sky-200 transition-all flex flex-col items-center text-center group">
            <div className="mb-8 p-6 bg-slate-50 rounded-full group-hover:scale-110 transition-transform">{card.icon}</div>
            <h3 className="text-3xl font-black mb-6 uppercase text-slate-900 italic tracking-tighter">{card.title}</h3>
            <ul className="space-y-4">
              {card.features.map((f, j) => (
                <li key={j} className="text-slate-600 text-lg font-medium flex items-center justify-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />{f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const SocialProof = memo(() => (
  <section className="py-24 px-6 bg-white">
    <div className="container mx-auto max-w-5xl text-center">
      <div className="flex justify-center gap-1 mb-6">
        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-8 h-8 fill-yellow-400 text-yellow-400" />)}
      </div>
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
        Mais de 500 pessoas comuns já começaram a entender inglês.
      </h2>
      <p className="text-xl text-sky-600 font-black mb-16">Avaliação média: 4,9 / 5 ⭐</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Raimunda Costa", age: 59, text: "Achava que inglês não era pra mim. Em poucos dias já reconheço várias palavras." },
          { name: "Milton Ferreira", age: 72, text: "Nunca pensei que fosse aprender. Esse método é simples demais." },
          { name: "Renata Mendonça", age: 43, text: "Escuto o áudio enquanto arrumo a casa. Não tem desculpa." }
        ].map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0, scale: [1, 1.03, 1] }} viewport={{ once: false, amount: 0.8 }} transition={{ delay: i * 0.1 }} className="glass p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:bg-white transition-colors text-left">
            <div>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-slate-600 italic text-lg leading-relaxed mb-8">"{p.text}"</p>
            </div>
            <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center font-bold text-sky-600 uppercase shrink-0">{p.name[0]}</div>
              <div>
                <p className="font-bold text-slate-900 leading-none mb-1">{p.name}</p>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{p.age} ANOS</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const Pricing = memo(() => (
  <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
    <div className="container mx-auto max-w-4xl text-center relative z-10">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass p-8 md:p-16 rounded-[60px] border-4 border-white bg-white shadow-2xl">
        <div className="inline-block bg-red-600 text-white px-8 py-2 rounded-full font-black uppercase text-sm tracking-[0.2em] mb-10 shadow-lg shadow-red-200">Oferta por Tempo Limitado</div>
        <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase italic text-slate-900 tracking-tighter">O QUE VOCÊ RECEBE HOJE:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-16 font-bold text-lg text-slate-700">
          <div className="flex items-center gap-4"><CheckCircle className="text-sky-600 w-6 h-6 shrink-0" /> Guia 1000 Palavras Mais Usadas</div>
          <div className="flex items-center gap-4"><Headphones className="text-sky-600 w-6 h-6 shrink-0" /> Audiobook para ouvir e repetir</div>
          <div className="flex items-center gap-4"><BookOpen className="text-sky-600 w-6 h-6 shrink-0" /> Tradução e pronúncia simplificada</div>
          <div className="flex items-center gap-4"><Download className="text-sky-600 w-6 h-6 shrink-0" /> Download imediato</div>
          <div className="flex items-center gap-4"><InfinityIcon className="text-sky-600 w-6 h-6 shrink-0" /> Acesso vitalício</div>
          <div className="flex items-center gap-4"><Clock className="text-sky-600 w-6 h-6 shrink-0" /> Sem mensalidades</div>
        </div>
        <div className="mb-12">
          <p className="text-slate-400 line-through text-2xl font-black mb-2 opacity-50">De R$ 97,00</p>
          <div className="flex flex-col items-center justify-center">
            <span className="text-slate-900 text-3xl font-black uppercase">POR APENAS</span>
            <span className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter">R$ 29,90</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <CTAButton text="QUERO APRENDER AGORA" className="mb-8" />
          <div className="flex flex-col md:flex-row items-center gap-8 text-slate-400 font-bold uppercase tracking-widest text-xs">
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-green-500" /> 7 Dias de Garantia Total</div>
            <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-sky-500" /> Acesso Imediato</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
));

const Comparison = memo(() => (
  <section className="py-24 px-6 bg-white">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase text-slate-900 tracking-tighter italic">⚠️ AGORA A VERDADE:</h2>
        <p className="text-2xl font-black text-sky-600 uppercase tracking-widest">Você tem duas opções</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div whileHover={{ y: -5 }} className="bg-red-50/50 border-2 border-red-100 p-10 md:p-14 rounded-[50px] relative overflow-hidden">
          <div className="flex items-center gap-4 mb-10"><XCircle className="w-12 h-12 text-red-500" /><h3 className="text-2xl font-black text-red-900 uppercase">OPÇÃO 1</h3></div>
          <ul className="space-y-6 mb-12 text-red-800 font-medium text-lg">
            {["Desistir toda vez que tenta", "Depender de legenda", "Achar que inglês é difícil", "Ficar parado", "Sentir que já passou da idade"].map((t, i) => (
              <li key={i} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />{t}</li>
            ))}
          </ul>
          <p className="text-red-600 font-black italic text-xl text-center">👉 Se você não fizer nada, nada muda.</p>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-green-50/50 border-2 border-green-100 p-10 md:p-14 rounded-[50px] relative overflow-hidden">
          <div className="flex items-center gap-4 mb-10"><CheckCircle className="w-12 h-12 text-green-500" /><h3 className="text-2xl font-black text-green-900 uppercase">OPÇÃO 2</h3></div>
          <ul className="space-y-6 mb-12 text-green-800 font-bold text-lg">
            {["Entender o inglês falado", "Reconhecer palavras", "Sentir orgulho", "Parar de depender de tradutor", "Provar que é capaz"].map((t, i) => (
              <li key={i} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />{t}</li>
            ))}
          </ul>
          <p className="text-green-600 font-black italic text-xl text-center">👉 A escolha é sua.</p>
        </motion.div>
      </div>
      <div className="mt-16 flex justify-center"><CTAButton text="SIM! QUERO APRENDER" /></div>
    </div>
  </section>
));

const FAQ = memo(() => (
  <section className="py-24 px-6 bg-slate-50">
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase text-slate-900 tracking-tighter italic">❓ FREQUENTES</h2>
      <div className="glass p-8 md:p-12 rounded-[48px] bg-white border-2 border-slate-100">
        {[
          { question: "Funciona pra quem nunca estudou?", answer: "Sim. Foi feito exatamente para iniciantes." },
          { question: "Preciso de muito tempo?", answer: "Não. Apenas 10 a 15 minutos por dia." },
          { question: "Vou falar fluente em 7 dias?", answer: "Não. Você vai entender o básico e destravar o aprendizado." },
          { question: "É indicado para qualquer idade?", answer: "Sim. Temos alunos de 18 a 70+ anos." },
          { question: "Como recebo o material?", answer: "Enviado automaticamente para seu e-mail." },
          { question: "E se eu não gostar?", answer: "Garantia de 7 dias com reembolso total." }
        ].map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} />)}
      </div>
    </div>
  </section>
));

const Footer = memo(() => (
  <footer className="py-24 px-6 bg-white border-t border-slate-100 text-center">
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-3xl md:text-6xl font-black mb-12 uppercase italic text-slate-900 tracking-tighter">🚀 COMECE AGORA.</h2>
      <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium">O inglês não é difícil. Difícil é continuar do mesmo jeito.</p>
      <div className="flex justify-center mb-20"><CTAButton text="SIM! QUERO APRENDER AGORA!" /></div>
      <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 font-bold uppercase tracking-widest text-xs">
        <p>© 2025 INGLÊS REAL. TODOS OS DIREITOS RESERVADOS.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-sky-600 transition-colors">Termos</a>
          <a href="#" className="hover:text-sky-600 transition-colors">Privacidade</a>
        </div>
      </div>
    </div>
  </footer>
));

export default function App() {
  return (
    <div className="antialiased overflow-x-hidden selection:bg-sky-500 selection:text-white bg-white">
      <TopBanner />
      <SalesNotification />
      <Hero />
      <Statistics />
      <WhyMethod />
      <DifferenceSection />
      <IdealForSection />
      <ProductDetails />
      <SocialProof />
      <Pricing />
      <Comparison />
      <FAQ />
      <Footer />
    </div>
  );
}
