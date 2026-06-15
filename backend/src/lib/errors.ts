/**
 * Erreurs métier de l'application. Le statut HTTP est porté par l'erreur elle-même,
 * et mappé en réponse par l'error handler central (middlewares/error.middleware.ts).
 */
export class AppError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'AppError'
    this.status = status
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Requête invalide.') {
    super(message, 400)
    this.name = 'BadRequestError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Accès refusé.') {
    super(message, 403)
    this.name = 'ForbiddenError'
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Ressource introuvable.') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflit avec une ressource existante.') {
    super(message, 409)
    this.name = 'ConflictError'
  }
}
