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

- **LIVE ora: design "Dalla Notte al Giorno"** (12 lug 2026, merge
  35849a7 su main dopo checkpoint visivo e ratifica copy di Stefano).
  Il design precedente "Galleria" (9 lug, 3795a46) e' superato.
  Spec completa:
  `~/Desktop/Scrittura e Libri/Libri ludici/docs/superpowers/specs/2026-07-11-aenigmapress-notte-giorno-design.md`
  In sintesi, racconto verticale in tre atti:
  1. Notte (hero): cielo stellato animato (twinkle + 5 pulsar con 3
     battiti al load), costellazione "AEnigma" (legatura AE tracciata
     da 7 stelle unite da linee oro, etichetta da atlante). Niente
     newsletter nell'hero, CTA ancora a #collection.
  2. Alba: fascia gradiente di transizione.
  3. Giorno (carta): Collection (copertine + Buy on Amazon + slot III
     tratteggiato) e newsletter (box con doppia cornice da frontespizio,
     costellazione stampata in bronzo accanto) su fondo carta avorio.
  Palette doppia: notte/oro (`#080d16`/`#d9a441`) e carta/bronzo
  (`#f2ecdd`/`#8a6420`). Tipografia: Playfair Display WOFF2 locale
  subsettato (budget 120 KB), fallback Didot/Bodoni 72/Georgia.
  Prototipo di riferimento: `prototipo/hero-finale2.html` (gitignored).
- Le due lingue sono generate speculari (stessi tag nello stesso
  ordine): ogni modifica strutturale va fatta su ENTRAMBE le pagine.
- Mockup e prototipi in `prototipo/` (gitignored), brief in
  `docs/brief-*.md` (gitignored).

## Stack

- HTML e CSS puri, statici, zero build, zero JS. Niente framework.
- VINCOLO DURO: zero richieste esterne (no CDN, no Google Fonts, no
  analytics, no cookie). Font = file WOFF2 locali in `assets/fonts/`.
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
- Piano redesign corrente: `.../plans/2026-07-11-aenigmapress-notte-giorno.md`
  (checkbox = avanzamento; branch `design-notte-giorno`)
- Piano precedente (Galleria): `.../plans/2026-07-08-aenigmapress-landing.md`
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
  stato RATIFICATO il 12 lug 2026 col checkpoint pre-merge).
- Push su main = pubblicazione: per lavori non banali usare un branch e
  chiedere checkpoint visivo a Stefano prima del merge.
- Commit in inglese convenzionale, trailer
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

## Mappa dei file

- `index.html` (EN, root) / `it/index.html` (IT): home speculari.
- `privacy.html` / `it/privacy.html`: privacy essenziale.
- `404.html`, `CNAME`, `assets/style.css` (tokens in testa),
  `assets/img/` (logo.png bianco trasparente, copertine kakuro-vol*.png),
  `assets/fonts/` (Playfair Display 400 + italic WOFF2, 43 KB totali).
- `docs/` (gitignored i brief) e `prototipo/` (gitignored): materiali
  di design; `prototipo/hero-finale2.html` = prototipo approvato.
- Il PDF regalo NON sta nel repo: vivra' su MailerLite (file manager),
  link solo nell'email di benvenuto.

## Stato (12 lug 2026)

- LIVE con design "Dalla Notte al Giorno" (merge 35849a7, 12 lug 2026):
  piano 2026-07-11 completato, checkpoint visivo superato e copy
  ratificato da Stefano. Lighthouse al QA: perf 100 / a11y 96 su EN e
  IT. Il branch `design-notte-giorno` resta nel repo come storico.
- Nota a11y accettata: il link lingua attiva nel footer (bronzo su
  carta) ha contrasto 4.11:1, poco sotto AA; ok di Stefano al checkpoint.
- HTTPS ATTIVO (12 lug 2026): certificato emesso dopo reset del custom
  domain (rimozione + riaggiunta via API Pages, che ha sbloccato
  l'emissione ferma da 4 giorni), enforce HTTPS on. Cert Let's Encrypt
  per apex + www, scadenza 10 ott 2026, rinnovo automatico GitHub;
  http redirige 301 su https, www redirige sull'apex.
- PENDENTI: PDF regalo (10 kakuro inediti, anti-doppioni vs Vol 1-3);
  automazione di benvenuto MailerLite; test end-to-end iscrizione;
  QR nel Vol 3; Email Routing contact@aenigmapress.com (opzionale).
