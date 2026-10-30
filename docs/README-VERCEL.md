# Hosting: Vercel und kostenlose Alternative

Stand der Anbieterprüfung: **30.10.2026**. Diese Anleitung bereitet das Hosting vor. Es wurde kein Projekt bei einem Anbieter angelegt, nichts hochgeladen und nichts veröffentlicht. Domain und DNS bleiben unverändert.

## Ist Vercel für FeToMa gratis?

**Für den beschriebenen geschäftlichen Einsatz ist Vercel Hobby nicht geeignet.** Der kostenlose Hobby-Tarif ist auf persönliche, nicht kommerzielle Nutzung beschränkt. Die FeToMa-Seite wirbt für kostenpflichtige Vermietungen und dient damit nach unserer Einschätzung geschäftlichen Zwecken. Ein kostenloser Zugriff für Besucher ändert daran nichts. Siehe [Hobby-Tarif](https://vercel.com/docs/plans/hobby) und [Fair-Use-Regeln](https://vercel.com/docs/limits/fair-use-guidelines).

Wer Vercel für diese Geschäftswebsite nutzen möchte, braucht einen passenden kommerziellen Tarif. Vercel nennt für Pro aktuell **20 US-Dollar monatliche Plattformgebühr** einschließlich eines bereitstellenden Teammitglieds; zusätzliche Nutzung, weitere Mitglieder und Zusatzoptionen können Kosten verursachen. Das ist kein dauerhaft kostenloser Tarif. [Pro-Preise](https://vercel.com/docs/plans/pro-plan)

## Was ist technisch vorbereitet?

Die Website ist vollständig statisch. Sie benötigt weder Datenbank noch laufenden Node-Server, Serverless Functions, Formularanbieter oder API-Schlüssel. Node.js wird nur beim Erstellen der HTML-Dateien benötigt.

| Einstellung | Wert |
| --- | --- |
| Node.js | `26.x`, in `package.json` und `.nvmrc` festgelegt |
| Projektverzeichnis / Root Directory | Repository-Hauptverzeichnis mit `package.json` |
| Framework Preset | `Other` |
| Install Command | `npm ci --include=dev` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | Keine erforderlich |

Die Einstellungen stehen bereits in [`vercel.json`](../vercel.json). `trailingSlash: true` erhält die bisherigen Pfade wie `/eventtechnik/` und `/kontakt/`. Die einzelnen Unterseiten werden als echte HTML-Dateien erzeugt; eine Umleitung aller Seiten auf die Startseite ist nicht erforderlich. [Build-Einstellungen](https://vercel.com/docs/builds/configure-a-build), [Vercel-Konfiguration](https://vercel.com/docs/project-configuration/vercel-json), [Node-Versionen](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)

Die Entwicklungsabhängigkeiten werden ausdrücklich installiert, weil der Build `cheerio` für die unverändert übernommenen Rechtstexte benötigt. Bilder liegen bereits optimiert in `assets/`; ein erneuter Abruf der Referenzwebsite ist nicht erforderlich.

`.vercelignore` lässt Testdateien, Screenshots und lokale Ausgaben beim Quellupload weg. **`assets/`, `src/`, `scripts/` und `reference/` müssen im Repository bleiben:** Der Build liest daraus Bilder, Bildgrößen, Rechtstexte und Bildnachweise. Öffentlich ausgeliefert wird ausschließlich `dist/`, nicht der Projektstamm. [Upload-Ausschlüsse](https://vercel.com/docs/deployments/vercel-ignore)

## Vercel einrichten, wenn du den kommerziellen Tarif verwenden möchtest

Die folgenden Schritte führen später zu einer tatsächlichen Veröffentlichung. Sie wurden hier nicht ausgeführt.

1. Zuerst die [offenen Website-Angaben](../README-OFFENE-INFORMATIONEN.md) mit Tobias klären, besonders Preise/Mietdauer, Rechtstexte für das neue Hosting und den Widerrufsweg.
2. Den Projektcode in ein eigenes, vorzugsweise privates GitHub-, GitLab- oder Bitbucket-Repository hochladen. `package-lock.json`, `vercel.json`, Bilder und die oben genannten Build-Verzeichnisse einschließen. `node_modules/`, `.env`-Dateien, `.vercel/` und `dist/` nicht einchecken.
3. Bei Vercel ein Konto bzw. Team mit einem geeigneten kommerziellen Tarif verwenden und **Add New → Project** öffnen.
4. Das Repository importieren. Als Root Directory den Ordner mit `package.json` auswählen und die Einstellungen aus der Tabelle kontrollieren. `npm run dev` ist nur die lokale Vorschau und gehört nicht in das Feld Build Command.
5. Erst wenn du die Website veröffentlichen möchtest, **Deploy** ausführen. Für den ersten Aufruf genügt die von Vercel zugewiesene `vercel.app`-Adresse; dazu muss die bestehende Domain nicht geändert werden.
6. Unterseiten direkt öffnen: `/eventtechnik/`, `/dekoration/`, `/kontakt/`, `/impressum/`, `/datenschutz/`, `/cookie-einstellungen/` und `/widerruf/`. Menü, Bilder, Kontaktvorlagen und Footer prüfen. Bei künftigen Pushes auf den verbundenen Produktionsbranch kann Vercel automatisch neu bereitstellen.

Die bestehende Jimdo-Website muss für die derzeit noch verlinkte Cookie-Richtlinie und den Widerrufsweg erreichbar bleiben. Ein späterer Domainwechsel würde die absoluten Links zurück zur bisherigen Website auf dieselbe neue Domain lenken; diese Abhängigkeiten müssen deshalb **vor einem Domainumzug** ersetzt bzw. abgestimmt werden.

## Kostenlose Alternative: Netlify Free

Netlify erlaubt nach eigener aktueller Darstellung auch kommerzielle Projekte im Free-Tarif. Der Tarif ist jedoch begrenzt: aktuell **300 Credits pro Monat**, die unter anderem durch Veröffentlichungen, Datenübertragung und Anfragen verbraucht werden. Kostenlos bedeutet daher kein unbegrenztes Hosting. [Kommerzielle Nutzung](https://www.netlify.com/guides/netlify-vs-vercel/), [aktuelle Limits](https://www.netlify.com/pricing/)

Für diese fertige statische Website ist der manuelle Upload einfach:

```bash
npm ci --include=dev
npm run build
```

Danach bei Netlify im eigenen Free-Konto anmelden und **nur den erzeugten Ordner `dist/`** in den manuellen Upload ziehen. Dieser enthält `index.html`, die Unterseiten, Styles und Bilder. Der Upload erstellt ein Deployment; die Sichtbarkeit vor einer öffentlichen Freigabe im Netlify-Projekt kontrollieren. Die bestehende Domain muss dafür nicht umgestellt werden. [Anleitung zum manuellen Upload](https://docs.netlify.com/deploy/create-deploys/#drag-and-drop)

Vor der Nutzung Anbieterbedingungen und Kontolimits noch einmal im eigenen Konto kontrollieren. Die offenen Inhalte und Hostingangaben in den Rechtstexten betreffen auch diese Alternative.

## Lokal prüfen

```bash
npm ci --include=dev
npm run build
npm run dev
```

Dann `http://127.0.0.1:4173` öffnen. Vercel-Anmeldung und Bezahlkonto sind dafür nicht notwendig. Nach Änderungen stehen die bestehenden Browserprüfungen über `npm test` bereit. Ein erfolgreicher lokaler Build bestätigt noch kein erfolgreiches Deployment beim Anbieter.

## Tatsächlich geprüft

Am 30.10.2026 mit Node.js 26.8.2: frische Installation über `npm ci --include=dev` und erfolgreicher Build in einer separaten Kopie ohne vorhandenes `node_modules/` oder `dist/`. Die `vercel.json` ist gegen Vercels offizielles JSON-Schema gültig. Alle acht HTML-Seiten und 173 lokale Datei-/Seitenverweise sind vorhanden; die 94 erzeugten Dateien stimmen mit dem lokalen Build überein. Quelldateien und Projektdokumentation liegen nicht im öffentlichen Ausgabeordner.

Es wurde kein Vercel-Deployment ausgeführt. Anbieter-Routing, Kontoberechtigungen und eine dort erreichbare URL sind daher noch nicht praktisch geprüft. Die Website selbst wurde durch diese Hosting-Vorbereitung nicht verändert; ihre bisherigen Browserprüfungen sind in der Haupt-README dokumentiert.
