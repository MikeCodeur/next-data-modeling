import * as dotenv from 'dotenv'

function initDotEnv() {
  const environment = process.env.NODE_ENV || 'development' // Par défaut 'development' si NODE_ENV n'est pas défini
  // Choisir le fichier .env en fonction de l'environnement
  const envFilePath =
    environment === 'production' ? '.env.production' : '.env.local'

  // Charger le fichier .env approprié
  dotenv.config({path: envFilePath})
}

export default initDotEnv
