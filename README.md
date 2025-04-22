# 🌱 SåPlanera – Odlingsapp för din såplanering

**SåPlanera** är en personlig odlingsplanerare byggd med Next.js. Appen hjälper dig att hålla koll på dina fröer och växter, samt ger översikt på så- och planteringsperioder i din region. 

<img width="279" alt="odlingsapp-logo" src="https://github.com/user-attachments/assets/10e53af5-0be9-4530-8820-8b2526aaf8de" />

---

## ✨ Funktioner (mål)
### 🌿 Växtlista
- Skapa och spara en personlig växtlista
- Lägg till växter manuellt med namn och egenskaper
- Redigera och ta bort växter (full CRUD-funktionalitet)
- All data sparas lokalt i webbläsaren (via LocalStorage)
### 🔗 Växtdata & kopplingar
- Varje sparad växt kopplas till en fördefinierad växttyp
- Hämta generell odlingsinformation automatiskt för varje växt
- Anpassa informationen för just dina växter baserat på växttypen
### 📆 Odlingsplanering
- Ange odlingsort för att få lokalt anpassad så- och planteringskalender
- Se rekommenderade datum för sådd och utplantering per växt i en personlig kalender
### 📱 Användargränssnitt
- Responsiv design – fungerar på både mobil och desktop
- Enkelt, överskådligt gränssnitt med fokus på användarvänlighet

---

## Teknikstack
- **Next.js**
- **React**
- **TypeScript**
- **CSS Modules**
- **LocalStorage** för personlig data
- **Next.js route handlers** som inbyggt API

---

## Kom igång
**Installera:**
```bash
git clone https://github.com/erba-stella/odlingsapp.git
cd odlingsapp
npm install
```
**Testa lokalt** (run development server):
```bash
npm run dev
```
Appen körs som standard på http://localhost:3000

---

## 📝 Licens
Projektet är open source under MIT-licensen.
