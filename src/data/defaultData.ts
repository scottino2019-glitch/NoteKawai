import { NoteItem, WeeklyData, PlannerData } from '../types';

export function getDefaultNotes(): NoteItem[] {
  return [
    {
      id: 'note-1',
      page: 'left',
      shape: 'square',
      color: '#ffffff',
      fontFamily: "'Patrick Hand', cursive",
      fontSize: '16px',
      fontColor: '#1e293b',
      textAlign: 'left',
      corner: 'tl',
      pattern: 'none',
      text: 'Lista della spesa:\n• Latte di soia 🥛\n• Fragole fresche 🍓\n• Biscotti al miele 🍪'
    },
    {
      id: 'note-2',
      page: 'left',
      shape: 'square',
      color: '#fef08a',
      fontFamily: "'Caveat', cursive",
      fontSize: '18px',
      fontColor: '#1e293b',
      textAlign: 'left',
      corner: 'tl',
      pattern: 'none',
      text: 'Idee per il weekend ✨\nPasseggiata nel parco e disegno con gli acquerelli!'
    },
    {
      id: 'note-3',
      page: 'left',
      shape: 'square',
      color: '#fef08a',
      fontFamily: "'Indie Flower', cursive",
      fontSize: '16px',
      fontColor: '#1e293b',
      textAlign: 'left',
      corner: 'tl',
      pattern: 'none',
      text: 'Ricordati di chiamare Silvia alle 17:00! 📞💕'
    },
    {
      id: 'note-4',
      page: 'left',
      shape: 'square',
      color: '#ffffff',
      fontFamily: "'Mali', cursive",
      fontSize: '16px',
      fontColor: '#1e293b',
      textAlign: 'left',
      corner: 'tl',
      pattern: 'none',
      text: 'Frase del giorno:\n"Fai brillare ogni piccolo momento." 🌸'
    },
    {
      id: 'note-5',
      page: 'right',
      shape: 'lined',
      color: '#ffffff',
      fontFamily: "'Patrick Hand', cursive",
      fontSize: '15px',
      fontColor: '#0f172a',
      textAlign: 'left',
      corner: 'none',
      pattern: 'none',
      mascot: 'cat',
      text: 'Compiti:\n1. Leggere capitolo 4 📖\n2. Esercizi di chimica 🔬'
    },
    {
      id: 'note-6',
      page: 'right',
      shape: 'heart',
      color: '#fbcfe8',
      fontFamily: "'Caveat', cursive",
      fontSize: '16px',
      fontColor: '#831843',
      textAlign: 'center',
      corner: 'none',
      pattern: 'none',
      mascot: 'cherries',
      text: 'Sei speciale!\nTi voglio bene! 💕'
    },
    {
      id: 'note-7',
      page: 'right',
      shape: 'daisy',
      color: '#ffffff',
      fontFamily: "'Comfortaa', cursive",
      fontSize: '13px',
      fontColor: '#78350f',
      textAlign: 'center',
      corner: 'none',
      pattern: 'none',
      text: 'Sorridi\noggi! ☀️'
    },
    {
      id: 'note-8',
      page: 'right',
      shape: 'pennant',
      color: '#bae6fd',
      fontFamily: "'Itim', cursive",
      fontSize: '14px',
      fontColor: '#0369a1',
      textAlign: 'center',
      corner: 'none',
      pattern: 'none',
      mascot: 'pens',
      text: 'Progetti Creativi ✨\n• Scrapbook\n• Adesivi DIY\n• Bullet Journal'
    },
    {
      id: 'note-9',
      page: 'right',
      shape: 'checklist',
      color: '#99f6e4',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '13px',
      fontColor: '#134e4a',
      textAlign: 'left',
      corner: 'none',
      pattern: 'none',
      mascot: 'bee',
      title: 'TO DO LIST',
      checklist: [
        { id: 'c1', text: 'Annaffiare piantine 🌱', done: true },
        { id: 'c2', text: 'Preparare la tisana 🍵', done: true },
        { id: 'c3', text: 'Scrivere diario ✨', done: false },
        { id: 'c4', text: 'Ordinare scrivania 🧹', done: false }
      ],
      text: ''
    },
    {
      id: 'note-10',
      page: 'right',
      shape: 'bubble',
      color: '#fbcfe8',
      fontFamily: "'Kalam', cursive",
      fontSize: '15px',
      fontColor: '#831843',
      textAlign: 'left',
      corner: 'none',
      pattern: 'dots',
      text: 'Nota al volo:\n"Il segreto è iniziare!" 💬✨'
    }
  ];
}

export function getDefaultWeekly(): WeeklyData {
  return {
    month: 'Novembre',
    range: '10 - 16',
    days: [
      { name: 'Lunedì', date: '10', notes: 'Pianificare settimana 🎯\nLezione online ore 15:00' },
      { name: 'Martedì', date: '11', notes: 'Palestra e stretching 🧘‍♀️\nSpesa biologica 🥕' },
      { name: 'Mercoledì', date: '12', notes: 'Studio approfondito capitolo 5 📚\nChiamata con mamma 💕' },
      { name: 'Giovedì', date: '13', notes: 'Disegno su diario pastel 🎨\nPulizie e riordino scrivania' },
      { name: 'Venerdì', date: '14', notes: 'Pizza night con amici 🍕\nFilm serale rilassante 🎬' },
      { name: 'Sabato', date: '15', notes: 'Passeggiata nella natura 🍂\nCaffè e libreria ☕' },
      { name: 'Domenica', date: '16', notes: 'Self-care & maschera viso 🌸\nPreparazione per lunedì' }
    ],
    goals: [
      { id: 'wg1', text: 'Bere 2L di acqua al giorno 💧', done: true },
      { id: 'wg2', text: 'Leggere 30 pagine di un libro 📖', done: true },
      { id: 'wg3', text: 'Dormire almeno 7-8 ore 🌙', done: false },
      { id: 'wg4', text: 'Passeggiata all\'aria aperta 🌿', done: false }
    ]
  };
}

export function getDefaultPlannerData(): PlannerData {
  return {
    gratitudeTitle: '✨ Cose di cui sono grata oggi:',
    gratitudeText: '• Il profumo del caffè al mattino ☕\n• Un messaggio dolce inaspettato 💕\n• Una bella passeggiata nel parco 🍂',
    priority1: '1. Completare il capitolo di studio 📖',
    priority2: '2. Allenamento 30 min e stretching 🧘‍♀️',
    priority3: '3. Relax serale con tisana al miele 🍵',
    dailyDayName: 'Lunedì',
    dailyDayNum: '10',
    dailyMonth: 'Novembre',
    activeMood: 'felice',
    activeWeather: 'sole',
    timeline: {
      '08:00': 'Colazione sana & tisana ☕',
      '09:00': 'Studio / Lavoro profondo 💻',
      '10:00': 'Revisione appunti 📝',
      '11:00': 'Pausa snack & frutta 🍓',
      '12:00': 'Pranzo leggero 🥗',
      '13:00': 'Passeggiata rilassante ☀️',
      '14:00': 'Progetti creativi & planner ✨',
      '15:00': 'Chiamata o commissioni 📞',
      '16:00': 'Lettura libro 📖',
      '17:00': 'Allenamento & stretching 🧘‍♀️',
      '18:00': 'Doccia rigenerante 🌸',
      '19:00': 'Cena in famiglia 🍝',
      '20:00': 'Diario & riflessioni serali ✍️',
      '21:00': 'Relax, tisana & skincare 🌙'
    },
    diaryDate: 'Lunedì, 10 Novembre',
    diaryLeftText: 'Caro Diario,\noggi è stata una giornata davvero luminosa. Il cielo era terso e l\'aria fresca di novembre mi ha dato tanta energia.\nHo finalmente completato il capitolo che rimandavo da giorni e mi sono concessa un buon tè con biscotti al burro.\n\nMi sento grata per le piccole cose che rendono ogni giorno unico e prezioso. 🌸✨',
    diaryRightText: 'Penso che domani mi dedicherò a sistemare gli adesivi sul quaderno e a pianificare i prossimi viaggi per la primavera.\nLa tranquillità della sera mi fa sempre sentire in pace.\n\nA domani caro diario! 💕',
    diaryPrompts: [
      'Qual è stato il momento più bello di oggi? 🌸',
      'Che cosa ho imparato su me stessa oggi? ✨'
    ],
    habitMonth: 'Novembre',
    goalTitle: '🎯 Obiettivo Principale del Mese:',
    goalDesc: 'Completare il corso online & Dipingere su tela 🎨',
    goalSteps: [
      { id: 's1', text: 'Pianificare le tappe del progetto 📋', done: true },
      { id: 's2', text: 'Completare il primo modulo 💻', done: true },
      { id: 's3', text: 'Dipingere la prima bozza su tela 🖌️', done: false },
      { id: 's4', text: 'Sessione finale e rifinitura ✨', done: false }
    ],
    booksText: '[✓] "Piccole Donne" 📖\n[✓] "Finché il caffè è caldo" ☕\n[ ] "Il castello errante di Howl" ✨\n[ ] "La libreria dei gatti" 🐱',
    wishlistText: '[✓] Set pennarelli pastel Tombow 🎨\n[ ] Borsa a tracolla vintage 🌸\n[ ] Tazza kawaii in ceramica ☕\n[ ] Nuovi washi tape pastello ✨',
    habits: [
      { id: 'h1', name: 'Lettura 30 min 📖', checks: [true, true, true, false, false, false, false, false, false, false, false, false, false, false] },
      { id: 'h2', name: 'Lezione Cinese 🇨🇳', checks: [true, true, false, false, false, false, false, false, false, false, false, false, false, false] },
      { id: 'h3', name: 'Lezione Coreano 🇰🇷', checks: [false, true, true, false, false, false, false, false, false, false, false, false, false, false] },
      { id: 'h4', name: 'Lezione Python 👾', checks: [true, true, true, false, false, false, false, false, false, false, false, false, false, false] },
      { id: 'h5', name: 'Lezione Javascript 🖥️', checks: [true, false, true, false, false, false, false, false, false, false, false, false, false, false] },
      { id: 'h6', name: 'Lezione HTML 💻', checks: [true, true, false, false, false, false, false, false, false, false, false, false, false, false] }
    ]
  };
}
