const { jsPDF } = window.jspdf;

const elements = {
  title: document.getElementById("docTitle"),
  text: document.getElementById("sourceText"),
  fontSize: document.getElementById("fontSize"),
  lineSpacing: document.getElementById("lineSpacing"),
  pageFormat: document.getElementById("pageFormat"),
  download: document.getElementById("downloadPdf"),
  pasteClipboard: document.getElementById("pasteClipboard"),
  status: document.getElementById("status"),
  charCount: document.getElementById("charCount"),
  wordCount: document.getElementById("wordCount"),
  fontSizeLabel: document.getElementById("fontSizeLabel"),
  lineSpacingLabel: document.getElementById("lineSpacingLabel"),
  windowTitle: document.getElementById("windowTitle"),
  kickerText: document.getElementById("kickerText"),
  heroTitle: document.getElementById("heroTitle"),
  heroSubtitle: document.getElementById("heroSubtitle"),
  labelDocTitle: document.getElementById("labelDocTitle"),
  labelFontSize: document.getElementById("labelFontSize"),
  labelLineSpacing: document.getElementById("labelLineSpacing"),
  labelPageFormat: document.getElementById("labelPageFormat"),
  labelSourceText: document.getElementById("labelSourceText")
};

const i18n = {
  en: {
    languageTag: "en",
    windowTitle: "Classic Draft Printer",
    kickerText: "Basic IA setup active",
    heroTitle: "AI Output to PDF",
    heroSubtitle: "Paste content from any AI, customize the format, and export as PDF.",
    labelDocTitle: "Document title",
    labelFontSize: "Font size",
    labelLineSpacing: "Line spacing",
    labelPageFormat: "Page format",
    labelSourceText: "AI output",
    generatePdf: "Generate PDF",
    pasteFromClipboard: "Paste from clipboard",
    sourcePlaceholder: "Paste your AI output here...",
    titlePlaceholder: "Quarterly AI Notes",
    emptyError: "Paste some text first.",
    clipboardEmpty: "Clipboard is empty.",
    clipboardUnsupported: "Clipboard access requires localhost/https and browser permission.",
    clipboardPasted: "Clipboard text pasted.",
    pdfOk: "PDF generated successfully.",
    defaultTitle: "AI Output",
    chars: "chars",
    words: "words"
  },
  es: {
    languageTag: "es",
    windowTitle: "Impresora Clasica de Borradores",
    kickerText: "Basic IA setup activo",
    heroTitle: "Output de IA a PDF",
    heroSubtitle: "Pega contenido de cualquier IA, ajusta el formato y exporta en PDF.",
    labelDocTitle: "Titulo del documento",
    labelFontSize: "Tamano de fuente",
    labelLineSpacing: "Espaciado de linea",
    labelPageFormat: "Formato de pagina",
    labelSourceText: "Output de IA",
    generatePdf: "Generar PDF",
    pasteFromClipboard: "Pegar desde portapapeles",
    sourcePlaceholder: "Pega aqui el output de tu IA...",
    titlePlaceholder: "Notas trimestrales de IA",
    emptyError: "Pega primero algo de texto.",
    clipboardEmpty: "El portapapeles esta vacio.",
    clipboardUnsupported: "El acceso al portapapeles requiere localhost/https y permiso del navegador.",
    clipboardPasted: "Texto pegado desde el portapapeles.",
    pdfOk: "PDF generado correctamente.",
    defaultTitle: "Output IA",
    chars: "caracteres",
    words: "palabras"
  },
  pt: {
    languageTag: "pt",
    windowTitle: "Impressora Classica de Rascunhos",
    kickerText: "Basic IA setup ativo",
    heroTitle: "Saida de IA para PDF",
    heroSubtitle: "Cole conteudo de qualquer IA, ajuste o formato e exporte em PDF.",
    labelDocTitle: "Titulo do documento",
    labelFontSize: "Tamanho da fonte",
    labelLineSpacing: "Espacamento entre linhas",
    labelPageFormat: "Formato da pagina",
    labelSourceText: "Saida da IA",
    generatePdf: "Gerar PDF",
    pasteFromClipboard: "Colar da area de transferencia",
    sourcePlaceholder: "Cole aqui a saida da sua IA...",
    titlePlaceholder: "Notas trimestrais de IA",
    emptyError: "Cole algum texto primeiro.",
    clipboardEmpty: "A area de transferencia esta vazia.",
    clipboardUnsupported: "O acesso a area de transferencia requer localhost/https e permissao do navegador.",
    clipboardPasted: "Texto colado da area de transferencia.",
    pdfOk: "PDF gerado com sucesso.",
    defaultTitle: "Saida de IA",
    chars: "caracteres",
    words: "palavras"
  },
  fr: {
    languageTag: "fr",
    windowTitle: "Imprimante Classique de Brouillons",
    kickerText: "Basic IA setup actif",
    heroTitle: "Sortie IA vers PDF",
    heroSubtitle: "Collez le contenu de n'importe quelle IA, ajustez le format et exportez en PDF.",
    labelDocTitle: "Titre du document",
    labelFontSize: "Taille de police",
    labelLineSpacing: "Interligne",
    labelPageFormat: "Format de page",
    labelSourceText: "Sortie IA",
    generatePdf: "Generer le PDF",
    pasteFromClipboard: "Coller depuis le presse-papiers",
    sourcePlaceholder: "Collez ici la sortie de votre IA...",
    titlePlaceholder: "Notes IA trimestrielles",
    emptyError: "Collez d'abord du texte.",
    clipboardEmpty: "Le presse-papiers est vide.",
    clipboardUnsupported: "L'acces au presse-papiers exige localhost/https et l'autorisation du navigateur.",
    clipboardPasted: "Texte colle depuis le presse-papiers.",
    pdfOk: "PDF genere avec succes.",
    defaultTitle: "Sortie IA",
    chars: "caracteres",
    words: "mots"
  }
};

let activeLocale = i18n.en;

function mapCountryToLocale(countryCode, languageHint) {
  const country = (countryCode || "").toUpperCase();
  const hint = (languageHint || "").toLowerCase();

  if (["MX", "ES", "AR", "CO", "CL", "PE", "EC", "UY", "BO", "PY", "VE", "CR", "PA", "GT", "HN", "SV", "NI", "DO", "PR"].includes(country)) {
    return i18n.es;
  }

  if (["BR", "PT"].includes(country)) {
    return i18n.pt;
  }

  if (["FR", "BE", "CH", "LU", "CA"].includes(country)) {
    return i18n.fr;
  }

  if (hint.startsWith("es")) {
    return i18n.es;
  }

  if (hint.startsWith("pt")) {
    return i18n.pt;
  }

  if (hint.startsWith("fr")) {
    return i18n.fr;
  }

  return i18n.en;
}

async function detectCountryCode() {
  try {
    const response = await fetch("https://ipapi.co/json/");

    if (!response.ok) {
      throw new Error("Geo lookup failed");
    }

    const data = await response.json();
    return data.country_code || "";
  } catch {
    return "";
  }
}

function applyLocaleTexts() {
  const t = activeLocale;

  document.documentElement.lang = t.languageTag;
  document.title = `${t.windowTitle} - ${t.heroTitle}`;

  elements.windowTitle.textContent = t.windowTitle;
  elements.kickerText.textContent = t.kickerText;
  elements.heroTitle.textContent = t.heroTitle;
  elements.heroSubtitle.textContent = t.heroSubtitle;
  elements.labelDocTitle.textContent = t.labelDocTitle;
  elements.labelPageFormat.textContent = t.labelPageFormat;
  elements.labelSourceText.textContent = t.labelSourceText;
  elements.download.textContent = t.generatePdf;
  elements.pasteClipboard.textContent = t.pasteFromClipboard;

  elements.title.placeholder = t.titlePlaceholder;
  elements.text.placeholder = t.sourcePlaceholder;
}

function updateStats() {
  const text = elements.text.value.trim();
  const chars = text.length;
  const words = text ? text.split(/\s+/).length : 0;

  elements.charCount.textContent = `${chars} ${activeLocale.chars}`;
  elements.wordCount.textContent = `${words} ${activeLocale.words}`;
}

function setStatus(message, isError = false) {
  elements.status.textContent = message;
  elements.status.style.color = isError ? "#ff6f9f" : "#abff4d";
}

function sanitizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function generatePdf() {
  const text = elements.text.value.trim();

  if (!text) {
    setStatus(activeLocale.emptyError, true);
    return;
  }

  const title = elements.title.value.trim() || activeLocale.defaultTitle;
  const fontSize = Number(elements.fontSize.value);
  const lineSpacing = Number(elements.lineSpacing.value);
  const format = elements.pageFormat.value;

  const doc = new jsPDF({
    unit: "pt",
    format
  });

  const margin = 54;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const usableWidth = pageWidth - margin * 2;
  const usableHeight = pageHeight - margin * 2;

  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(fontSize + 4);
  doc.text(title, margin, y);
  y += (fontSize + 8) * lineSpacing;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(fontSize);

  const lines = doc.splitTextToSize(text, usableWidth);
  const lineHeight = fontSize * lineSpacing;

  for (const line of lines) {
    if (y + lineHeight > margin + usableHeight) {
      doc.addPage();
      y = margin;
    }

    doc.text(line, margin, y);
    y += lineHeight;
  }

  const safeTitle = sanitizeFileName(title) || "ai-output";
  doc.save(`${safeTitle}.pdf`);
  setStatus(activeLocale.pdfOk);
}

async function pasteFromClipboard() {
  if (!navigator.clipboard || !window.isSecureContext) {
    setStatus(activeLocale.clipboardUnsupported, true);
    return;
  }

  try {
    const clipText = await navigator.clipboard.readText();

    if (!clipText || !clipText.trim()) {
      setStatus(activeLocale.clipboardEmpty, true);
      return;
    }

    elements.text.value = clipText;
    updateStats();
    setStatus(activeLocale.clipboardPasted);
  } catch {
    setStatus(activeLocale.clipboardUnsupported, true);
  }
}

function updateLabelsWithValues() {
  elements.labelFontSize.innerHTML = `${activeLocale.labelFontSize}: <span id="fontSizeLabel">${elements.fontSize.value}</span>pt`;
  elements.labelLineSpacing.innerHTML = `${activeLocale.labelLineSpacing}: <span id="lineSpacingLabel">${elements.lineSpacing.value}</span>`;

  elements.fontSizeLabel = document.getElementById("fontSizeLabel");
  elements.lineSpacingLabel = document.getElementById("lineSpacingLabel");
}

async function init() {
  const localeHint = navigator.language || "en-US";
  const countryCode = await detectCountryCode();
  activeLocale = mapCountryToLocale(countryCode, localeHint);

  applyLocaleTexts();
  updateLabelsWithValues();

  elements.text.addEventListener("input", updateStats);
  elements.download.addEventListener("click", generatePdf);
  elements.pasteClipboard.addEventListener("click", pasteFromClipboard);

  elements.fontSize.addEventListener("input", () => {
    updateLabelsWithValues();
  });

  elements.lineSpacing.addEventListener("input", () => {
    updateLabelsWithValues();
  });

  updateStats();
}

init();
