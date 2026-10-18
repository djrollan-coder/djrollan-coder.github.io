// Переключение языка страницы: английский по умолчанию, перевод из словаря T.
function setupI18n(T) {
  const sel = document.getElementById("lang");
  const en = {};
  document.querySelectorAll("[data-i18n]").forEach(e => en[e.dataset.i18n] ??= e.textContent);
  document.querySelectorAll("[data-i18n-html]").forEach(e => en[e.dataset.i18nHtml] ??= e.innerHTML);
  function apply(lang) {
    const t = T[lang] || {};
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t[e.dataset.i18n] ?? en[e.dataset.i18n]);
    document.querySelectorAll("[data-i18n-html]").forEach(e => e.innerHTML = t[e.dataset.i18nHtml] ?? en[e.dataset.i18nHtml]);
    if (sel) sel.value = lang;
    try { localStorage.setItem("lang", lang); } catch {}
  }
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch {}
  const browser = (navigator.language || "en").slice(0, 2);
  apply(saved || (T[browser] || browser === "en" ? browser : "en"));
  if (sel) sel.addEventListener("change", () => apply(sel.value));
}
