# CLAUDE.md

**Lingua**: Rispondi sempre in italiano.

## Panoramica

Landing page bilingue del marchio editoriale Aenigma Press (Amazon KDP,
collana Kakuro e futuri titoli, presto anche narrativa). Obiettivo
primario: spingere i lanci dei volumi, avvisando gli iscritti alla
newsletter a ogni uscita. Obiettivo secondario: presidio del marchio.
La pagina presenta la CASA EDITRICE, non "il sito del Kakuro".

Incentivo di iscrizione: 10 puzzle Kakuro inediti in PDF gratuito.
Fonte di traffico principale: QR code stampato nei libri, dal Volume 3.

**Il sito e' LIVE su aenigmapress.com** (GitHub Pages, repo pubblico
StE2808/aenigmapress, branch main = produzione: ogni push pubblica).

## Design

- **LIVE ora: design "Dalla Notte al Giorno" con hero "Planetario"**
  (13 lug 2026, merge del branch `hero-planetario` su main dopo
  checkpoint visivo di Stefano). L'impianto a tre atti resta quello
  approvato il 12 lug (merge 35849a7); il 13 lug l'hero e' stato
  arricchito e reso piu' vivo (variante "Planetario", scelta da Stefano
  fra due prototipi: "profondo" sobrio e "planetario" spettacolare).
  Il design "Galleria" (9 lug, 3795a46) resta superato.
  Spec di base (tre atti):
  `~/Desktop/Scrittura e Libri/Libri ludici/docs/superpowers/specs/2026-07-11-aenigmapress-notte-giorno-design.md`
  Racconto verticale in tre atti:
  1. Notte (hero "Planetario"): cielo a TRE piani in parallasse
     (far/mid/near) mossi da mouse e scroll, nebulosa blu che deriva,
     velo galattico diagonale, rotazione celeste lentissima del campo
     lontano attorno alla costellazione (giro in 600s, solo desktop
     pointer fine), meteore e brillamenti casuali generati via JS,
     orizzonte che respira, vignettatura. Al centro la costellazione
     "AEnigma" (legatura AE tracciata da 7 stelle unite da linee oro,
     etichetta da atlante) che si disegna al load e ha un lieve tilt 3D.
     Header sospeso trasparente sul cielo (wrapper `.site-top`
     absolute). Niente newsletter nell'hero, CTA a #collection.
  2. Alba: fascia gradiente di transizione.
  3. Giorno (carta): Collection (copertine + Buy on Amazon + slot III
     tratteggiato) e newsletter (box con doppia cornice da frontespizio,
     costellazione stampata in bronzo accanto) su fondo carta avorio.
  Palette doppia: notte/oro (`#080d16`/`#d9a441`) e carta/bronzo
  (`#f2ecdd`/`#8a6420`). Tipografia: Playfair Display WOFF2 locale
  subsettato, fallback Didot/Bodoni 72/Georgia.
  Prototipo di riferimento hero: `prototipo/hero-planetario.html`
  (gitignored); il precedente `hero-finale2.html` e' superato.
- Le due lingue sono generate speculari (stessi tag nello stesso
  ordine): ogni modifica strutturale va fatta su ENTRAMBE le pagine.
- Mockup e prototipi in `prototipo/` (gitignored), brief in
  `docs/brief-*.md` (gitignored).

## Stack

- HTML e CSS puri, statici, zero build. Niente framework.
- JS: dal 13 lug 2026 e' ammesso un SOLO file JS locale
  `assets/hero.js` (~90 righe), che anima l'hero (parallasse mouse+
  scroll, meteore/brillamenti a intervalli, IntersectionObserver che
  mette in pausa fuori viewport, spegnimento se scatta reduced-motion).
  E' progressive enhancement: senza JS l'hero resta statico ma leggibile.
- VINCOLO DURO (invariato): zero richieste esterne (no CDN, no Google
  Fonts, no analytics, no cookie). Il JS e' locale e inline-friendly,
  non viola il vincolo. Font = file WOFF2 locali in `assets/fonts/`.
  Uniche URL esterne: form MailerLite (POST) e link Amazon.
- Hosting: GitHub Pages, dominio aenigmapress.com su Cloudflare
  (DNS: 4 A apex + CNAME www, DNS only).
- Newsletter: MailerLite, double opt-in ATTIVO. Form nativo POST verso
  assets.mailerlite.com/jsonp/2497131/forms/192421754859160744/subscribe
  (campi fields[email], ml-submit, anticsrf): non cambiarne la sostanza.
- Link Amazon per marketplace: EN -> amazon.com (Vol1 B0H7ZVGM59,
  Vol2 B0H7T36LHT), IT -> amazon.it (Vol1 B0H81H7VZJ, Vol2 B0H7T2SH2H).

## Spec, piano, ledger

- Spec design corrente (approvata): `.../specs/2026-07-11-aenigmapress-notte-giorno-design.md`
- Spec precedente (Galleria, superata): `.../specs/2026-07-08-aenigmapress-landing-design.md`
- Piano redesign: `.../plans/2026-07-11-aenigmapress-notte-giorno.md`
- Ledger di avanzamento (stato vero del progetto):
  `.../docs/superpowers/sdd-progress-aenigmapress.md`
- Base path: `~/Desktop/Scrittura e Libri/Libri ludici/docs/superpowers/`

## Credenziali

Token MailerLite e Cloudflare SOLO in `~/.secrets/credentials.yaml`
(sezioni `mailerlite` e `cloudflare`). Mai nel repo, che e' PUBBLICO.
Il `.gitignore` esclude anche `docs/brief-*.md` e `prototipo/`.

## Regole dure

- NIENTE trattini lunghi in nessun testo, IT o EN, HTML compreso.
- File .md: scrivere il file completo via Write o Python, mai col tool
  Edit. Edit va bene su .py, .html, .css.
- Brand: il logo grafico usa la legatura AE stilizzata; in ogni testo,
  meta e title la grafia e' "Aenigma Press".
- Copy: mai promettere consegna istantanea del PDF (il flusso e' double
  opt-in: email di conferma, poi email di benvenuto col PDF). Modifiche
  di copy solo con ok esplicito di Stefano (il copy del redesign e'
  stato RATIFICATO il 12 lug 2026; l'hero Planetario NON ha cambiato
  copy, solo animazione e layout).
- Mobile: le griglie dell'hero usano `minmax(0,1fr)` sulle colonne e
  `min-width:0` sugli item per evitare il grid blowout (l'SVG della
  costellazione gonfiava la colonna oltre il viewport). Il `<br>` del
  titolo e' `<br class="brk">`, nascosto sotto 880px (lo spazio sta
  prima del br), cosi' il titolo va a capo da solo su smartphone.
- Push su main = pubblicazione: per lavori non banali usare un branch e
  chiedere checkpoint visivo a Stefano prima del merge.
- Commit in inglese convenzionale, trailer
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

## Mappa dei file

- `index.html` (EN, root) / `it/index.html` (IT): home speculari.
- `privacy.html` / `it/privacy.html`: privacy essenziale.
- `404.html`, `CNAME`, `assets/style.css` (tokens in testa),
  `assets/hero.js` (animazione hero Planetario, caricato con `defer`
  da entrambe le home; privacy/404 non lo usano),
  `assets/img/` (logo.png bianco trasparente, copertine kakuro-vol*.png),
  `assets/fonts/` (Playfair Display 400 + italic WOFF2, 43 KB totali).
- `docs/` (gitignored i brief) e `prototipo/` (gitignored): materiali
  di design; `prototipo/hero-planetario.html` = prototipo hero approvato.
- Il PDF regalo NON sta nel repo: vivra' su MailerLite (file manager),
  link solo nell'email di benvenuto.

## Stato (13 lug 2026)

- LIVE con hero "Planetario" (merge branch `hero-planetario` su main,
  13 lug 2026), dopo checkpoint visivo di Stefano. Copy invariato e gia'
  ratificato. La costellazione AE nell'hero e' stata ingrandita
  (`.sky` max-width 600px, colonna desktop `.85/1.15fr`); su desktop il
  titolo va su 4 righe, accettato "per ora" da Stefano (da ribilanciare
  eventualmente in seguito).
- Fix mobile (13 lug): risolto un overflow orizzontale che tagliava
  titolo/sottotitolo/costellazione su smartphone (grid blowout), via
  `minmax(0,1fr)` + `min-width:0` e `<br class="brk">` responsivo.
  Verificato con sonda JS: scrollWidth - innerWidth = 0 a 320/360/390px
  su EN e IT.
- Note dal design "Notte al Giorno" (12 lug) ancora valide: Lighthouse
  perf 100 / a11y 96 (da rifare dopo Planetario); link lingua attiva nel
  footer a contrasto 4.11:1, ok di Stefano.
- HTTPS ATTIVO (dal 12 lug 2026): Let's Encrypt apex + www, scadenza
  10 ott 2026, rinnovo automatico GitHub; http -> 301 https, www -> apex.
- PENDENTI: PDF regalo (10 kakuro inediti, anti-doppioni vs Vol 1-3);
  automazione di benvenuto MailerLite; test end-to-end iscrizione;
  QR nel Vol 3; Email Routing contact@aenigmapress.com (opzionale);
  ri-QA Lighthouse sull'hero Planetario; eventuale ribilanciamento del
  titolo hero su desktop (4 righe).
