
# Documentation and notes

## Links
- https://www.pwabuilder.com
- https://developer.mozilla.org/en-US/docs/Web/Manifest
- https://search.google.com
- SEO Check: https://seorch.de/
- Keyword tool: https://keywordtool.io/
- Keyword tool alternativen: https://www.onlinesolutionsgroup.de/blog/keyword-tool-alternativen-kostenlos/#1_Google_Suggest
- seo meta one click extension für chrome 


- lighthouse google chrome add one 


## Mobile First?

- mobile first mabos schreiben
- navigation durch app: 
  - item details auf eigener route
  - header titel anpassen
- offline modus für PWA? 
- Objekt erstellen, auf Antwort warten und weiter...


## Routing und Navigation in Angular: Desktop vs. Mobile
Optionen:

    Routing mit Item ID:
        Desktop & Mobile: Nutze Links zur Master Page, aktualisiere URL mit Item ID für Detail Page. Erlaubt direktes Aufrufen und Navigieren via Zurück-Button.
        Vorteile: Direkter Aufruf der Detailseite; History-Navigation unterstützt.
        Nachteile: Kann auf dem Desktop umständlich sein.

    Anzeigen ohne URL-Update:
        Desktop & Mobile: Routing zur Master Page via Link, Detail Page wird bei Klick angezeigt, ohne URL zu ändern.
        Vorteile: Einfache Navigation ohne History.
        Nachteile: Direktes Aufrufen der Detailseite nicht möglich.

    Routing mit Query Param:
        Desktop & Mobile: Routing zur Master Page via Link, Detail Page über Query Param Item ID anzeigen.
        Vorteile: Direkter Aufruf und klare URLs.
        Nachteile: Navigation zwischen Detailseiten mit Vor- und Zurück-Button eingeschränkt.

Fazit:

    Direkte Aufrufbarkeit: Wichtig für tiefere Links und Sharing. Optionen 1 und 3 bieten direkte URLs.
    History-Navigation: Nützlich auf mobilen Geräten. Option 1 unterstützt dies am besten.
    Simplicität vs. Flexibilität: Ohne URL-Update (Option 2) ist einfach, beschränkt aber die Flexibilität.

Entscheidungshilfe:

    Desktop-Apps: Brauchen oft weniger dynamisches Routing. Direktes Anzeigen kann ausreichend sein, besonders wenn eine komplexe Master-Detail-Ansicht genutzt wird.
    Mobile Apps: Profitieren von History-Navigation. Item ID im URL-Pfad oder als Query Param ist empfehlenswert.

Wähle basierend auf deiner App-Struktur und dem Nutzererlebnis, das du bieten möchtest.


## offline capabilities

https://docs.pwabuilder.com/#/home/native-features?id=background-sync

https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/core-concepts/04