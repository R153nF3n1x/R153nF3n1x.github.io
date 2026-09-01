// ============================================
// Investigation data — the five featured writeups
// ============================================
const featuredWriteups = [
  {
    title: "DetectMare",
    category: "detection engineering / sigma / splunk",
    finding: "Reviewed five broken Sigma rules submitted to a Detection-as-Code CI pipeline after a full APT21 kill chain — spearphishing, credential dumping, pass-the-hash lateral movement, and data staging — ran undetected end to end. Each rule had a different failure mode: wrong field names, missing legitimate process filters, insufficient GrantedAccess scoping, service account exclusion gaps, and binary name dependence on a renamed tool. Tuned all five to 100% true positive detection with zero false positives against the real environment log.",
    verdict: "Detection rules written without validating against real environment logs will almost always fail in production. This is the iterative, evidence-driven discipline that separates detection engineering from just writing SIEM queries.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-08-23-Detection%20Engineering-DetectMare"
  },
  {
    title: "The Silent Transfer",
    category: "threat hunting / network forensics",
    finding: "Reconstructed a full attack chain from Snort, Zeek, and FortiGate logs after a developer workstation was flagged for C2 beaconing. Traced the kill chain from dropper delivery via a typosquatted domain, through repeated short-duration TLS connections to a C2 server, SMB discovery across internal IPs, RDP lateral movement to a file server, and a large outbound archive transfer. Decoded a multi-layer obfuscated C2 command encoded as hex, then JSON, then Base64.",
    verdict: "No single alert source told the full story. The attack was only reconstructable by pivoting across Zeek HTTP, DNS, TLS, conn, and files logs alongside firewall records — exactly the cross-source correlation that defines real threat hunting.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-08-23-Forensics_Analysis-The%20Silent%20Transfer"
  },
  {
    title: "The Vantara Leak",
    category: "dfir / windows forensics",
    finding: "Investigated a compromised finance workstation using a full KAPE triage collection. Used PECmd, AmcacheParser, MFTECmd, and Registry Explorer to separate a legitimate contractor's activity from an attacker's on the same machine — confirming initial execution from Downloads, a native Windows binary used for payload delivery, a scheduled task persistence mechanism mimicking a Microsoft service, PowerShell-based domain enumeration, an unauthorised local account, and a staged compressed archive ready for exfiltration.",
    verdict: "Prefetch alone is misleading — Amcache provides stronger execution evidence for deleted binaries. Distinguishing legitimate from malicious activity on a shared workstation required correlating artefacts across five separate sources, which is what real DFIR looks like.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-08-22-DFIR-The%20Vantara%20Leak"
  },
  {
    title: "New Hire Old Artifacts",
    category: "siem / splunk / threat hunting",
    finding: "Investigated a Finance Dept endpoint in Splunk using Sysmon logs across a window when endpoint protection was disabled. Identified a NirSoft credential harvesting tool running from Temp, a renamed C2 binary (IonicLarge.exe with OriginalFileName PalitExplorer.exe) beaconing to an external IP, a scripted WMIC sequence targeting four specific Windows Defender threat IDs to disable protection, and a persistence payload disguised as EasyCalc built on the NW.js Chromium-embedded framework.",
    verdict: "Sysmon telemetry preserved the full attack chain even after the endpoint product was disabled. Executable OriginalFileName mismatches and outbound connections from Temp-staged binaries are detection rules every SOC should have in production.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-08-02-Splunk-New%20Hire%20Old%20Artifacts"
  },
  {
    title: "The Greenholt Phish",
    category: "phishing / email forensics",
    finding: "Analyzed a suspicious .eml file to trace the email back to its true origin. Identified a Reply-To mismatch indicating reply hijacking, extracted the originating IP from raw headers and traced it to a generic hosting provider inconsistent with the claimed sender, verified SPF and DMARC policy gaps, and confirmed the attachment was a RAR archive disguised with a double extension through SHA256 hash lookup on VirusTotal.",
    verdict: "Reply-To mismatches, originating IPs resolving to generic hosting infrastructure, and file type mismatches between extension and actual format are the three indicators that flag this as malicious — and are the exact checks a SOC L1 analyst runs on every phishing report.",
    link: "https://github.com/R153nF3n1x/tryhackme-writeups/blob/main/2026-04-04-Phishing-The%20Greenholt%20Phish"
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
