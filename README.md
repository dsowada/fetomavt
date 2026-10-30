# FeToMa – lokale Website-Überarbeitung

Separate statische Umsetzung der [FeToMa-Website](https://www.fetoma-vt.de/), geprüft am 30.10.2026. Der Projektordner war leer. Die Referenz verwendet **Jimdo Dolphin**; dessen interner Quellcode und Verwaltungszugang lagen nicht vor. Daher wurde kein vorhandenes Projekt überschrieben und keine Änderung am Baukasten vorgenommen.

**Nichts veröffentlicht. Keine Änderungen an Domain, DNS oder bestehenden Konten.**

## Lokal ansehen

Voraussetzung: aktuelles Node.js. Beim ersten Start:

```bash
npm ci
npm run build
npm run dev
```

Dann http://127.0.0.1:4173 öffnen. Beenden mit Strg+C.

`src/` enthält die gemeinsamen Komponenten, Inhalte, Styles und Interaktionen. `scripts/build.mjs` erzeugt gewöhnliche HTML-Dateien in `dist/`. Der Browser benötigt weder Framework noch Backend. Bilder werden lokal ausgeliefert. Der Build verwendet die gespeicherten Quellen und benötigt keinen erneuten Abruf der Referenz.

## Umgesetzt und phasenweise geprüft

1. Kompakter Header, Tastaturmenü, gewünschte Hauptüberschrift, zwei Einstiegsbuttons und mobiler Bildzuschnitt. Die primäre Anfrage bleibt auf den geprüften Smartphones im ersten sichtbaren Bereich.
2. Startseite in der gewünschten Reihenfolge: Einstieg, vier Angebotsbereiche, Set 1/2, Blowup-Zelt, echte Faschingsreferenzen von 2025, Anfrageablauf, Kontakt und Footer.
3. Angebotskarten mit Originalbildern, Preisen, unmittelbar zugeordneten Mietbedingungen und passenden Anfragen. Technische Listen sind per Klick und Tastatur aufklappbar. Alle 11 Dekorationsangebote und die Einzelgerätelisten sind erhalten.
4. Bestehender WhatsApp-Kontakt **+49 171 9108314**, bestätigte E-Mail **fetoma-vt@web.de**, Telefon und Instagram. Jede Angebotsanfrage enthält Datum, Ort, Anlass und Gästezahl. Der Kontaktassistent erstellt nur eine Vorschau; WhatsApp wird erst über einen eigenen Link geöffnet. Nichts wird automatisch versendet oder hier dauerhaft gespeichert.
5. Responsive WebP-Bilder mit Größenangaben, Lazy Loading unterhalb des Einstiegs, sichtbare Fokuszustände, Sprunglink, Fließtext ab 16 px, große Touchflächen und mobile Kontaktleiste mit Platz am Seitenende. Keine automatisch geladenen externen Medien, Webfonts, Analyse- oder Marketingdienste. Die Cookie-Auswahl liegt im Dokumentfluss und sperrt weder Navigation noch Kontakt.

Name, Logo und vorhandene Fotos wurden übernommen. Die aus den Jimdo-Daten ermittelte Palette: `#000000`, `#FFFFFF`, `#94568d`, `#060606`, `#3e4049`, `#1089e6`. Die Buttons verwenden für den Textkontrast einen dunkleren Ton des vorhandenen Blaus. Es wurden keine weiteren Akzentfarben ergänzt.

Folgende Pfade sind lokal vorhanden: `/`, `/eventtechnik/`, `/dekoration/`, `/kontakt/`, `/impressum/`, `/datenschutz/`, `/cookie-einstellungen/`, `/widerruf/`.

Impressum und Datenschutzerklärung wurden textlich unverändert übernommen; die öffentliche E-Mail-Verschleierung wurde lediglich aufgelöst. Bildnachweise bleiben erhalten. Die originale Cookie-Richtlinie und die bisherige Widerrufsfunktion sind über ausdrücklich bezeichnete Links zur Originalwebsite erreichbar. Eine Jimdo-Widerrufsfunktion kann ohne dessen Backend nicht lokal nachgebildet werden.

## Abnahme

```bash
npm test
```

Die Tests benötigen Chromium unter `/usr/bin/chromium`; auf anderen Rechnern den Browserpfad in `playwright.config.mjs` anpassen.

- **55 Tests bestanden** in Chromium. Alle acht Seiten wurden bei **360, 390, 768 und 1440 px** geprüft.
- Menü öffnen/schließen, Escape, Tastaturfokus, Sprunglink, Angebotsdetails, Bilder, alle internen Seiten/Sprungziele, Footer und Cookie-Auswahl geprüft.
- Preise der Mietkarten, WhatsApp-Zielnummer, Nachrichtenvorlagen und befüllte Kontaktvorschau kontrolliert. Keine externen Requests beim normalen Seitenbesuch oder beim Erstellen der Vorschau.
- Automatisierte axe-Prüfungen für WCAG A/AA ohne gemeldete Verstöße; Textgleichheit der beiden Rechtstexte geprüft. Diese Checks ersetzen keine vollständige manuelle Barrierefreiheitszertifizierung.
- Keine horizontalen Überläufe; wichtige Kontaktbuttons und Angebotsdetails mindestens 44 × 44 px. Footer am unteren Seitenende bleibt oberhalb der mobilen Kontaktleiste. Navigation und direkte Kontakte bleiben auch ohne JavaScript nutzbar.
- Screenshots aller vier Breiten unter `docs/screenshots/`; Bildausschnitte, Textumbrüche und Überlagerungen visuell kontrolliert. Erzeugung mit `node scripts/capture.mjs` bei laufendem Lokalserver.

Die Prüfung erfolgte mit Browserfenstern in den genannten Größen, nicht auf physischen Smartphones oder in Safari. Externe WhatsApp-/Telefon-/Mail-Apps wurden nicht geöffnet; es wurden keine Nachrichten oder Formulare an Dritte gesendet.

## Offene Angaben und fehlende Originaldateien

- **Blowup-Zelt:** 250 € sind bestätigt. Der Geltungsbereich des am Ende der Angebotsseite stehenden Hinweises „Mietpreise pro Tag“ ist für dieses separate Paket nicht eindeutig. Deshalb wird keine eigene Mietdauer behauptet. Auch die Mietdauer des zusätzlichen 100-€-Musik-Lichtpakets muss geklärt werden.
- **Lieferung:** 10 km kostenlos und danach 0,30 €/km wurden übernommen. Bezugspunkt, einfache/gesamte Strecke sowie sonstige Fahrtkosten sind nicht näher beschrieben.
- **Techniksets/Einzelmiete:** Preise auf Anfrage; keine zusätzlichen Kautionen, Steuerangaben, Mindestmietzeiten, Verfügbarkeits- oder Reaktionszusagen ergänzt. „Barzubehör“ wird in der Referenz genannt, konkrete Artikel fehlen.
- **Bilder:** Produktfotos für den 3×3-m-Pavillon und den 6×3-m-Faltpavillon fehlen. Statt fremder Produktbilder stehen eindeutig bezeichnete Größenskizzen. Für das 12×6-m-Zelt liegt nur das vorhandene kleine Bild (360×140 px) vor; ein größeres Original wäre hilfreich.
- **Dekoration:** Die Angabe „Bunte Vasen – Durchmesser 2cm“ wurde unverändert übernommen und sollte inhaltlich bestätigt werden.
- **Rechtstexte:** Die bestehende Datenschutzerklärung (Stand 11.06.2025) beschreibt auch das bisherige Hosting. Für einen späteren Wechsel müssten Betreiber und zuständige Fachperson die tatsächlichen Dienste und Texte abstimmen. Hier wurde nichts eigenmächtig rechtlich umformuliert.

Quellensicherung: `reference/` enthält die öffentlich abrufbaren Seiten, Bildherkünfte und die ausgelesene Originalpalette. Diese Dateien werden nicht in die auslieferbare Website kopiert. Alle fachlichen Angaben stammen aus der Referenz; es wurden keine Bewertungen, Gästezahlen, Einsatzregionen oder Leistungsversprechen erfunden. Die Zahl im automatisierten Kontaktformular-Test ist ausschließlich ein lokaler Testwert.
