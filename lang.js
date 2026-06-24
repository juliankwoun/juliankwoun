const T = {
  ko: {
    'hero-title':      '음악으로<br><em>말하는 사람</em>',
    'hero-desc':       '소리와 침묵 사이에서 작업합니다.<br>아래에서 더 알아보세요.',
    'card-01-desc':    '저를 소개합니다. 음악을 시작하게 된 이야기와 지금까지의 여정.',
    'card-02-desc':    '작곡한 곡들과 악보를 모아두었습니다.',
    'card-03-desc':    '협업 문의, 연주 의뢰 또는 그냥 인사도 환영합니다.',

    'bio-heading':       '안녕하세요,<br><em>저는 이름입니다</em>',
    'bio-intro-label':   '소개',
    'bio-intro-text':    '여기에 자기소개를 작성하세요. 어떤 음악을 하는지, 어디서 공부했는지, 어떤 계기로 음악을 시작했는지 자유롭게 써주세요.',
    'bio-career-label':  '경력 / 학력',
    'bio-career-text':   '학교, 수상 경력, 공연 이력 등 중요한 이력을 여기에 적어주세요. 여러 줄로 나눠도 좋습니다.',
    'bio-interest-label':'관심 분야',
    'bio-interest-text': '주로 작업하는 장르나 악기, 영향을 받은 작곡가나 아티스트에 대해 이야기해보세요.',

    'score-heading':   '악보 &amp;<br><em>작품 목록</em>',
    'score-meta-1':    '2024 · 피아노 솔로',
    'score-meta-2':    '2024 · 현악 4중주',
    'score-meta-3':    '2023 · 성악 + 피아노',
    'score-meta-4':    '2023 · 플루트 솔로',
    'score-note-label':'안내',
    'score-note-text': '악보 파일이나 음원이 필요하시면 <a href="contact.html" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Contact</a>로 문의해주세요.',

    'contact-heading':        '연락<br><em>언제든지 환영합니다</em>',
    'contact-location-label': '위치',
    'contact-location':       '대한민국',
  },
  en: {
    'hero-title':      'Speaking<br><em>through music</em>',
    'hero-desc':       'Working between sound and silence.<br>Learn more below.',
    'card-01-desc':    'An introduction to who I am — the story of how I began in music and the journey so far.',
    'card-02-desc':    'A collection of compositions and scores.',
    'card-03-desc':    'Open to collaboration, performance commissions, or just a friendly hello.',

    'bio-heading':       'Hello,<br><em>I am [Name]</em>',
    'bio-intro-label':   'Introduction',
    'bio-intro-text':    'Write your introduction here. Feel free to share what kind of music you make, where you studied, and what led you to music.',
    'bio-career-label':  'Career / Education',
    'bio-career-text':   'List your important credentials here — schools attended, awards, performance history. Feel free to use multiple lines.',
    'bio-interest-label':'Interests',
    'bio-interest-text': 'Talk about the genres or instruments you work with most, and the composers or artists who have influenced you.',

    'score-heading':   'Scores &amp;<br><em>Works</em>',
    'score-meta-1':    '2024 · Piano Solo',
    'score-meta-2':    '2024 · String Quartet',
    'score-meta-3':    '2023 · Voice + Piano',
    'score-meta-4':    '2023 · Flute Solo',
    'score-note-label':'Note',
    'score-note-text': 'If you need a score file or audio recording, please reach out via <a href="contact.html" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Contact</a>.',

    'contact-heading':        'Get in Touch —<br><em>always welcome</em>',
    'contact-location-label': 'Location',
    'contact-location':       'South Korea',
  }
};

function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (T[lang][key] !== undefined) el.innerHTML = T[lang][key];
  });
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'ko' ? 'EN' : '한';
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'ko';
  applyLang(saved);
  document.getElementById('lang-toggle').addEventListener('click', () => {
    applyLang(localStorage.getItem('lang') === 'ko' ? 'en' : 'ko');
  });

  // Dark mode
  const themeBtn = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeBtn) themeBtn.textContent = '☀';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeBtn) themeBtn.textContent = '☾';
    }
    localStorage.setItem('theme', theme);
  }
  applyTheme(localStorage.getItem('theme') || 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
    });
  }
});
