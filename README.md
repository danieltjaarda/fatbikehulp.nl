# Reparatie App

Een webapplicatie voor het beheren van fietsreparaties, gebouwd met Next.js, React en Supabase.

## Functies

- **Login systeem** met gebruikersnaam `Gofatbike` en wachtwoord `Gofatbike123!`
- **Reparaties beheer** met status tracking (pending, akkoord, afgewezen, afgehandeld)
- **Klanten beheer** met zoek- en sorteerfunctionaliteit
- **Aanvraag formulier** voor nieuwe reparaties
- **Dashboard** met overzicht van statistieken
- **Supabase integratie** voor data opslag

## Installatie

1. Installeer dependencies:
```bash
npm install
```

2. Configureer Supabase:
   - Maak een Supabase project aan op [supabase.com](https://supabase.com)
   - Kopieer je project URL en anon key
   - Update `lib/config.ts` met je Supabase gegevens

3. Start de development server:
```bash
npm run dev
```

## Database Schema

### Reparaties tabel
```sql
CREATE TABLE reparaties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  klant_naam TEXT NOT NULL,
  klant_email TEXT NOT NULL,
  klant_telefoon TEXT NOT NULL,
  aanvraag_type TEXT NOT NULL CHECK (aanvraag_type IN ('reparatie', 'onderhoud', 'beide')),
  fiets_merk TEXT NOT NULL,
  fiets_model TEXT,
  fiets_jaar TEXT,
  probleem TEXT,
  beschrijving TEXT,
  onderhoudsbeurt_type TEXT CHECK (onderhoudsbeurt_type IN ('klein', 'groot', 'winter', 'zomer')),
  laatste_onderhoud TEXT,
  locatie_type TEXT NOT NULL CHECK (locatie_type IN ('op_locatie', 'in_winkel')),
  adres TEXT,
  postcode TEXT,
  plaats TEXT,
  voorkeur_datum TEXT,
  voorkeur_tijd TEXT,
  opmerkingen TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'akkoord', 'afgewezen', 'afgehandeld')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Klanten tabel
```sql
CREATE TABLE klanten (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  naam TEXT NOT NULL,
  email TEXT NOT NULL,
  telefoon TEXT NOT NULL,
  adres TEXT,
  postcode TEXT,
  plaats TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Gebruik

1. Ga naar `/login` en log in met de credentials
2. Navigeer naar `/reparaties` om reparaties te beheren
3. Ga naar `/klanten` om klanten te bekijken
4. Gebruik het formulier op de hoofdpagina voor nieuwe aanvragen

## Technologieën

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database en backend
- **Lucide React** - Icons

## Project Structuur

```
├── app/
│   ├── dashboard/          # Dashboard pagina
│   ├── klanten/           # Klanten beheer
│   ├── login/             # Login pagina
│   ├── reparaties/        # Reparaties beheer
│   └── layout.tsx         # Root layout
├── components/
│   ├── Layout.tsx         # Hoofd layout met sidebar
│   ├── LoginForm.tsx      # Login formulier
│   └── Sidebar.tsx        # Navigatie sidebar
├── lib/
│   ├── config.ts          # Configuratie
│   ├── reparatieService.ts # Supabase service
│   └── supabase.ts        # Supabase client
├── types/
│   └── database.ts        # TypeScript types
└── page.tsx               # Aanvraag formulier
```







