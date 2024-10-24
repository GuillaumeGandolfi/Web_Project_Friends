import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  /** ExectutionContext c'est pour accéder à l'objet 'requete', ça va nous servir pour
   * obtenir la requête HTTP, puis récupérer l'utilisateur ajouté par le Guard.
   */
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    /** On récupère l'utilisateur ajouté dans le guard depuis la requête et
     * on retourne son ID directement dans le controleur (utilisateur ne pourra donc
     * pas le soumettre manuellement).
     */
    return request.user?.id;
  },
);
