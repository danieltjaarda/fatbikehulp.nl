# 📦 Reparaties Archiveren - Instructies

## Overzicht
De archiveer functionaliteit stelt je in staat om voltooide of oude reparaties te archiveren, zodat je hoofd-overzicht schoon blijft zonder data te verliezen.

## 🔧 Wat is toegevoegd

### 1. Database Wijzigingen
- **Nieuw veld**: `archived` (boolean) toegevoegd aan `Reparatie` interface
- Standaard waarde: `false` (niet gearchiveerd)

### 2. API Endpoints
- **PATCH `/api/reparaties/[id]`** ondersteunt nu:
  - `status` update (zoals voorheen)
  - `archived` update (nieuw)

### 3. UI Functionaliteit
- **Toggle knop**: Schakel tussen actieve en gearchiveerde reparaties
- **Archiveer knop**: Per reparatie een knop om te archiveren/herstellen
- **Filtering**: Gearchiveerde items worden automatisch verborgen in de standaard weergave

## 📝 Supabase Setup

### Stap 1: Log in op Supabase
1. Ga naar [supabase.com](https://supabase.com)
2. Open je project: **Fatbikehulp CRM**

### Stap 2: Open SQL Editor
1. Klik in de linker sidebar op **SQL Editor**
2. Klik op **New Query**

### Stap 3: Voer de Migratie uit
1. Open het bestand `supabase_migration_archived.sql`
2. Kopieer de volledige inhoud
3. Plak in de SQL Editor
4. Klik op **Run** of druk op `Cmd/Ctrl + Enter`

### Stap 4: Verificatie
Controleer of de kolom is toegevoegd:
```sql
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'reparaties' 
AND column_name = 'archived';
```

Je zou moeten zien:
- column_name: `archived`
- data_type: `boolean`
- column_default: `false`

## 🎯 Hoe te gebruiken

### In de UI

#### Actieve Reparaties Bekijken (standaard)
- Open de **Reparaties** pagina
- Je ziet alleen actieve (niet-gearchiveerde) reparaties

#### Archief Bekijken
- Klik op de knop **"Toon Archief"** rechtsboven
- Nu zie je alleen gearchiveerde reparaties

#### Een Reparatie Archiveren
1. Zoek de reparatie die je wilt archiveren
2. In de "Acties" kolom, klik op **"Archiveer"** (📦 icoon)
3. De reparatie verdwijnt uit de actieve lijst

#### Een Reparatie Herstellen
1. Klik op **"Toon Archief"**
2. Zoek de reparatie die je wilt herstellen
3. Klik op **"Herstel"** (↩️ icoon)
4. De reparatie komt terug in de actieve lijst

## 💡 Tips

### Wanneer Archiveren?
- ✅ Reparaties met status "afgehandeld" na 30+ dagen
- ✅ Afgewezen aanvragen die je niet meer wilt zien
- ✅ Test/demo reparaties
- ✅ Oude aanvragen waar geen follow-up meer op komt

### Wanneer NIET Archiveren?
- ❌ Actieve reparaties (status: pending/akkoord)
- ❌ Recente afgehandelde reparaties (< 30 dagen)
- ❌ Reparaties waar je nog garantie/follow-up voor moet doen

### Belangrijk
- ⚠️ Gearchiveerde items worden **NIET verwijderd**, alleen verborgen
- ⚠️ Je kunt altijd herstellen vanuit het archief
- ⚠️ Alle data blijft bewaard in de database
- ⚠️ Filters en zoeken werken ook in het archief

## 🔍 Wat is er veranderd in de code?

### Types (`types/database.ts`)
```typescript
export interface Reparatie {
  // ... bestaande velden
  archived: boolean  // ← NIEUW
  // ...
}
```

### API (`app/api/reparaties/[id]/route.ts`)
```typescript
const { status, archived } = body  // ← archived toegevoegd
```

### UI (`app/reparaties/page.tsx`)
- Nieuw state: `showArchived`
- Nieuwe functie: `toggleArchive()`
- Nieuwe filter logica voor archived items
- Nieuwe UI knop om archief te tonen/verbergen

## 🚀 Volgende Stappen

1. ✅ Voer het SQL script uit in Supabase
2. ✅ Test de archiveer functionaliteit in de UI
3. ✅ Archiveer oude/test reparaties
4. ✅ Controleer of het archief correct werkt

## ❓ Veelgestelde Vragen

**Q: Kan ik gearchiveerde items permanent verwijderen?**  
A: Momenteel niet via de UI, maar je kunt dit doen via SQL in Supabase als echt nodig.

**Q: Worden gearchiveerde items meegeteld in statistieken?**  
A: Dat hangt af van hoe je statistieken implementeert. Je kunt kiezen om ze wel/niet mee te tellen.

**Q: Kan ik meerdere items tegelijk archiveren?**  
A: Niet in de huidige versie, maar dit is eenvoudig toe te voegen als bulk-actie.

**Q: Wat gebeurt er met gearchiveerde items bij export?**  
A: Ze worden standaard niet meegenomen, tenzij je specifiek het archief export.

## 📧 Support
Bij vragen of problemen, neem contact op via het CRM systeem.

---
**Gemaakt:** 15 Oktober 2025  
**Versie:** 1.0


