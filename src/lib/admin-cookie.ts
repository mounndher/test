/**
 * Nom du cookie de session d'administration.
 * Module volontairement sans aucun import (utilisable depuis le proxy, qui s'exécute
 * en environnement edge où le driver PostgreSQL n'est pas disponible).
 */
export const ADMIN_COOKIE = "blexmann_admin";
