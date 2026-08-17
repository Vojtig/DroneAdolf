# Design: Webová prezentace dronových video/foto služeb

Datum: 2026-08-17

## Účel

Jednostránkový (one-page) reklamní/portfolio web, který nabízí služby
natáčení videí a focení fotek dronem. Cílem je prezentovat službu
potenciálním zákazníkům, ukázat ukázkovou práci (portfolio/galerie) a
umožnit snadný kontakt/poptávku.

## Rozsah

- Statický web (HTML/CSS/JS), bez buildovacího procesu, bez backendu.
- Jedna stránka se sekcemi propojenými scroll navigací (kotvy).
- Obsah v češtině.
- Placeholder foto/video obsah — reálné materiály doplní uživatel
  později.
- Kontaktní formulář odesílá přes Formspree (nebo podobnou službu),
  žádný vlastní server.
- Web je psaný modulárně (jasně oddělené sekce, BEM-like třídy), aby
  šel v budoucnu snadno přepsat do Reactu — ale React samotný **není**
  součástí tohoto rozsahu.

Mimo rozsah: vícejazyčnost (CZ/EN přepínač), CMS/administrace obsahu,
blog, vlastní backend/API, platby.

## Architektura

Čistě statická stránka:

```
/
├── index.html          # veškerý obsah stránky, sekce v pořadí níže
├── css/
│   └── style.css       # CSS proměnné (barvy, spacing), layout, komponenty
├── js/
│   └── script.js       # hamburger menu, smooth scroll, lightbox, form submit
├── assets/
│   ├── images/          # placeholder fotky/thumbnaily (SVG/placeholder)
│   └── video/            # placeholder hero video/poster obrázek
└── CLAUDE.md
```

Žádný build krok — soubory se servírují tak, jak jsou (GitHub Pages).

## Sekce stránky (pořadí shora dolů)

1. **Hero** — fullscreen dronový záběr/video na pozadí (poster obrázek
   jako fallback), hlavní nadpis, podnadpis, CTA tlačítko vedoucí na
   kontakt sekci.
2. **O službě** — krátký text popisující nabízené služby (video, foto,
   aerial mapping…).
3. **Portfolio/Galerie** — grid s placeholder thumbnaily; kliknutí
   otevře lightbox s větším náhledem.
4. **Služby a ceník** — 3 karty balíčků (Základní / Střední /
   Prémium), každá s cenou a seznamem co je součástí.
5. **Reference/O mně** — krátký profil poskytovatele služby +
   placeholder reference od zákazníků.
6. **Kontakt** — formulář (jméno, email, telefon, zpráva) odesílaný
   na Formspree endpoint + zobrazené kontaktní údaje (telefon/email).

Navigace (sticky header s odkazy na kotvy jednotlivých sekcí +
hamburger menu na mobilu) je nad sekcí Hero.

## Vizuální styl

Tmavá, cinematic paleta: tmavě šedé/černé pozadí, jeden výrazný
akcentní odstín (oranžová/žlutá — "drone" barva) pro CTA tlačítka a
zvýraznění. Velké, dramatické vizuály v Hero a Portfolio sekcích.
Typografie: jeden výrazný headline font + čitelný text font.

Layout je mobile-first, responzivní přes flexbox/grid a media queries.
Placeholder texty jsou reálné (ne lorem ipsum), aby je bylo možné
rovnou upravovat; placeholder obrázky jsou jednoduché barevné plochy
nebo SVG ikony dronu.

## Chování / interakce (JS)

- Hamburger menu pro mobilní navigaci (otevře/zavře seznam odkazů).
- Smooth scroll na kotvy sekcí.
- Lightbox pro galerii (klik na thumbnail → zvětšený náhled, zavření
  klikem mimo/na křížek).
- Validace a odeslání kontakt formuláře přes `fetch` POST na
  Formspree endpoint; zobrazení stavové zprávy (úspěch/chyba) bez
  reloadu stránky.

Žádný stavový management nad rámec DOM (žádný framework, žádný
routing — jedna stránka).

## Testování / QA

Ruční ověření v prohlížeči:

- Vizuální kontrola desktop + mobil (přes DevTools breakpointy).
- Kontrola kontrastu/čitelnosti textu na tmavém pozadí.
- Funkční ověření: hamburger menu, smooth scroll, lightbox otevření/
  zavření, odeslání kontakt formuláře (ověřit že POST na Formspree
  projde a zobrazí se potvrzení).

Žádné automatizované testy (statický obsahový web bez logiky, kterou
by mělo smysl pokrývat testy).

## Nasazení

GitHub Pages z repozitáře `Vojtig/DroneAdolf` (branch `main`, root
adresář). Žádná CI/CD pipeline potřeba pro statický obsah.

## Otevřené otázky pro uživatele (mimo rozsah tohoto spec)

- Skutečný Formspree form ID / endpoint — uživatel si založí účet a
  dodá endpoint před ostrým nasazením kontakt formuláře (do té doby
  formulář použije placeholder endpoint / bude označen jako TODO v
  kódu).
- Reálné foto/video materiály a konkrétní texty o poskytovateli
  služby (jméno, kontakt, ceny) — doplní uživatel po prvním nasazení.
