// ============================================
// Investigation data — the five featured writeups
// ============================================
const featuredWriteups = [
  {
    title: "The Greenholt Phish",
    category: "phishing / email forensics",
    finding: "Traced a phishing email back to its true origin by analyzing raw headers, comparing the From and Reply-To fields, and checking SPF and DMARC authentication. The attachment was disguised with a misleading double extension, confirmed as a different file type entirely through hash lookup on VirusTotal.",
    verdict: "This is the exact triage work a SOC L1 analyst does daily when a phishing report comes in.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-04-04-Phishing-The%20Greenholt%20Phish"
  },
  {
    title: "OSINT — Missing Person",
    category: "open source intelligence",
    finding: "Reconstructed a missing person's location and contact details using only two photos. Identified a racing circuit from visual cues, cross-referenced event dates, traced a restaurant, and pivoted through a tagged social media post to recover a phone number — six independent pivots chained into one trail.",
    verdict: "Shows how publicly shared images leak far more operational detail than people realize — a real concern in insider threat and executive protection contexts.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-03-18-OSINT-Missing%20Person"
  },
  {
    title: "IDOR — Corridor",
    category: "insecure direct object reference",
    finding: "Identified that a series of hashed URLs were just MD5 hashes of sequential integers. Noticed a gap in the sequence, tested edge cases, and found the missing resource by hashing the value zero.",
    verdict: "Demonstrates enumeration thinking — not just running a tool, but reasoning about what should exist and testing for it deliberately.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-03-17-IDOR-Corridor.md"
  },
  {
    title: "LLMborghini",
    category: "ai security / prompt injection",
    finding: "Direct jailbreak attempts against an internal AI assistant failed. An indirect approach worked instead: asking the model what it was never supposed to reveal caused it to disclose the exact data it was protecting.",
    verdict: "A practical example of why guardrails that block direct queries are not enough — AI systems need testing against reflective and indirect extraction too.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-05-19-LLMborghini%20Challenge"
  },
  {
    title: "ContAInment",
    category: "dfir / ransomware analysis",
    finding: "Investigated a compromised system where an AI assistant's memory had leaked credentials. Recovered a ransomware password from reassembled network traffic and used it to unlock an encrypted archive containing the flag.",
    verdict: "Covers both classic DFIR evidence recovery and an emerging risk category — AI assistants as a new kind of internal attack surface.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-02-11-DFIR-ContAInment"
  }
];

// ============================================
// Render log entries
// ============================================
const logList = document.getElementById('log-list');

featuredWriteups.forEach((inv, i) => {
  const entry = document.createElement('div');
  entry.className = 'log-entry';

  const idx = String(i + 1).padStart(2, '0');

  entry.innerHTML = `
    <div class="log-entry-head" role="button" tabindex="0" aria-expanded="false">
      <span class="log-index">${idx}</span>
      <span class="log-entry-title">${inv.title}</span>
      <span class="log-entry-cat">${inv.category}</span>
      <span class="log-chevron">›</span>
    </div>
    <div class="log-entry-body">
      <div class="log-entry-body-inner">
        <p class="log-finding">${inv.finding}</p>
        <p class="log-verdict"><span class="log-verdict-label">why it matters:</span>${inv.verdict}</p>
        <a class="log-link" href="${inv.link}" target="_blank">read the full investigation →</a>
      </div>
    </div>
  `;

  const head = entry.querySelector('.log-entry-head');
  const toggle = () => {
    const isOpen = entry.classList.toggle('open');
    head.setAttribute('aria-expanded', isOpen);
  };

  head.addEventListener('click', toggle);
  head.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });

  logList.appendChild(entry);
});

// open the first entry by default so the page demonstrates its own interaction
if (logList.firstElementChild) {
  logList.firstElementChild.classList.add('open');
  logList.firstElementChild.querySelector('.log-entry-head').setAttribute('aria-expanded', 'true');
}
