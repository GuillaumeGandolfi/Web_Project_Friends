/**
 * #### IMPORT ####
 * - Injectable : Il permet à la classe (AuthGuard) d'être injectée dans
 * d'autres parties de l'appli. Si j'ai bien compris, c'est nécessaire parce
 * Nest.js utilise l'injection de dépendances pour ses services.
 *
 * Pour résumer : quand on fait un export de classe, par exemple en js vanilla,
 * on peut créer des instances de cette classe, manuellement, et appeler ses méthodes.
 * Mais Nest.js il repose sur un système d'injection de dépendances, on délègue la
 * création et la gestion des instances des classes au lieu de les instancier manuellement.
 * C'est un peu une 'automatisation' du framework
 *
 * - CanActivable : C'est une interface fournie par Nest.js, utilisée pour créer
 * des guards. Tous les guards créés doivent implémenter cette interface et la méthode
 * canActivate() va permettre de déterminer si un user peut accéder à une route donnée.
 *
 * - ExecutionContext : Permet d'accéder à tout le contexte d'exécution d'une requête
 * HTTP (infos sur la requête, réponse, en-têtes, etc...)
 *
 * - UnauthorizedException : Si l'utilisateur n'est pas connecté, ou le token n'est
 * pas valide, on va renvoyer une erreur 401 Unauthorized.
 *
 * - JwtService : Pour gérer les tokens, c'est le module JWT de Nest.js.
 *
 * - FatifyRequest : C'est le type de requête spécifique à fastify
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  // Ici on injecte le service JWT dans le guard pour vérifier et décoder les tokens
  constructor(private jwtService: JwtService) {}

  /** Cette route est appelée à chaque fois qu'une route protégée par ce guard
  est appelée, elle renvoie un boolean selon l'autorisation ou non du user **/
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    // On récupère le tokenJWT depuis les headers de la requête
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Token non fourni');
    }

    // On extrait le token avec le split pour la forme Bearer <token>
    const token = authHeader.split(' ')[1];
    // On décode et on vérifie le token
    // S'il est valide on renvoie true et l'user peut accéder à la route
    try {
      const user = this.jwtService.verify(token);
      (request as any).user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}
