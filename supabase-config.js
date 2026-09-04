// Configurazione Supabase del sito.
// La anon key è pubblica per definizione: protegge il database la Row Level
// Security, non la segretezza di questa chiave. La service_role key non va
// MAI messa qui.
window.C3_SUPABASE = {
  url: '',      // es. https://xxxxxxxxxxxx.supabase.co
  anonKey: ''   // es. eyJhbGciOi...
};
