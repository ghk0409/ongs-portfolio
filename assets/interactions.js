const archive = document.querySelector('#all-work');

if (archive) {
  const openArchiveFromHash = () => {
    if (window.location.hash === '#all-work') {
      archive.open = true;
      archive.querySelector('summary')?.focus({ preventScroll: true });
    }
  };
  openArchiveFromHash();
  window.addEventListener('hashchange', openArchiveFromHash);
  for (const link of document.querySelectorAll('a[href="#all-work"]')) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      archive.open = true;
      if (window.location.hash !== '#all-work') window.location.hash = 'all-work';
      else archive.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      archive.querySelector('summary')?.focus({ preventScroll: true });
    });
  }
}

const policyDemo = document.querySelector("[data-policy-demo]");

for (const panel of document.querySelectorAll('.mobile-nav, .mobile-story-toc')) {
  panel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { panel.open = false; }));
  document.addEventListener('click', event => {
    if (panel.open && !panel.contains(event.target)) panel.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel.open) {
      panel.open = false;
      panel.querySelector('summary')?.focus({ preventScroll: true });
    }
  });
}

if (policyDemo) {
  const examples = {
    same: {
      result: "허용",
      explanation: "소속 관계와 조회 범위가 일치하는 가상 요청입니다."
    },
    other: {
      result: "거부",
      explanation: "역할은 같아도 대상 현장이 관리 범위 밖에 있습니다."
    },
    edit: {
      result: "추가 검증",
      explanation: "조회 권한만으로 관리 범위 변경을 허용하지 않습니다."
    }
  };

  const result = policyDemo.querySelector("[data-policy-result]");
  const explanation = policyDemo.querySelector("[data-policy-explanation]");
  const buttons = [...policyDemo.querySelectorAll("[data-policy-case]")];

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const example = examples[button.dataset.policyCase];
      for (const option of buttons) {
        const selected = option === button;
        option.classList.toggle("is-active", selected);
        option.setAttribute("aria-pressed", String(selected));
      }
      result.textContent = example.result;
      result.dataset.state = button.dataset.policyCase;
      explanation.textContent = example.explanation;
    });
  }
}

for (const demo of document.querySelectorAll('[data-terminal-demo]')) {
  const buttons = [...demo.querySelectorAll('[data-terminal-command]')];
  const panels = [...demo.querySelectorAll('[data-terminal-panel]')];
  for (const button of buttons) {
    button.addEventListener('click', () => {
      for (const option of buttons) option.setAttribute('aria-pressed', String(option === button));
      for (const panel of panels) panel.hidden = panel.dataset.terminalPanel !== button.dataset.terminalCommand;
    });
  }
}
