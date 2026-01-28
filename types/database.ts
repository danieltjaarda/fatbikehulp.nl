export interface Reparatie {
  id: string
  reparatie_nummer?: number
  klant_naam: string
  klant_email: string
  klant_telefoon: string
  aanvraag_type: 'reparatie' | 'onderhoud' | 'beide'
  fiets_merk: string
  fiets_model?: string
  fiets_jaar?: string
  probleem?: string
  beschrijving?: string
  onderhoudsbeurt_type?: 'klein' | 'groot' | 'winter' | 'zomer'
  laatste_onderhoud?: string
  locatie_type: 'op_locatie' | 'in_winkel'
  adres?: string
  postcode?: string
  plaats?: string
  voorkeur_datum?: string
  voorkeur_tijd?: string
  opmerkingen?: string
  herkomst_platform?: 'google' | 'gofatbike.nl' | 'instagram' | 'tiktok' | 'facebook' | 'mond_op_mond'
  status: 'pending' | 'akkoord' | 'afgewezen' | 'afgehandeld'
  archived: boolean
  created_at: string
  updated_at: string
}

export interface Klant {
  id: string
  naam: string
  email: string
  telefoon: string
  adres?: string
  postcode?: string
  plaats?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  naam: string
  beschrijving: string
  prijs: number
  categorie: 'banden' | 'remmen' | 'verlichting' | 'onderdelen' | 'accessoires' | 'elektrisch'
  merk?: string
  model?: string
  afbeelding_url?: string
  gallery_images?: string[]
  voorraad: number
  actief: boolean
  positie?: number
  specificaties?: Record<string, string>
  created_at: string
  updated_at: string
}








