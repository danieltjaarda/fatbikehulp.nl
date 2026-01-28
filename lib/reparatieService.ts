import { supabase } from './supabase'
import { Reparatie } from '@/types/database'

export const reparatieService = {
  // Voeg een nieuwe reparatie toe
  async createReparatie(data: Omit<Reparatie, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data: reparatie, error } = await supabase
        .from('reparaties')
        .insert([{
          ...data,
          status: 'pending'
        }])
        .select()
        .single()

      if (error) throw error
      return { data: reparatie, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Haal alle reparaties op
  async getReparaties() {
    try {
      const { data: reparaties, error } = await supabase
        .from('reparaties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data: reparaties, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update reparatie status
  async updateReparatieStatus(id: string, status: Reparatie['status']) {
    try {
      const { data: reparatie, error } = await supabase
        .from('reparaties')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data: reparatie, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Haal klanten op
  async getKlanten() {
    try {
      const { data: klanten, error } = await supabase
        .from('klanten')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data: klanten, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Voeg een nieuwe klant toe
  async createKlant(data: Omit<Reparatie, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const klantData = {
        naam: data.klant_naam,
        email: data.klant_email,
        telefoon: data.klant_telefoon,
        adres: data.adres,
        postcode: data.postcode,
        plaats: data.plaats
      }

      const { data: klant, error } = await supabase
        .from('klanten')
        .insert([klantData])
        .select()
        .single()

      if (error) throw error
      return { data: klant, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}







