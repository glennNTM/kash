import app from './app.js'
import { env } from './config/env.js'
import { setupSwagger } from './config/swagger.js'

// Documentation interactive de l'API (dev), sur son propre port : http://localhost:10000/api-docs
setupSwagger()

app.listen(env.PORT, () => {
  console.log(`Serveur sur http://localhost:${env.PORT}`)
})
