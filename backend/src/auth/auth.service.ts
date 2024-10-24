import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    // Pour vérifier les tokens
    private readonly jwtService: JwtService,
    // Pour vérifier les infos de connexions des utilisateurs
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    // On vérifie les infos de connexion de l'utilisateur
    const user = await this.userService.findByEmail(email);
    // On vérifie s'il existe et si le mdp correspond
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    // pour gérer s'il y a une erreur
    throw new UnauthorizedException('Invalid email or password');
  }

  async generateToken(userId: Types.ObjectId): Promise<string> {
    const payload = { sub: userId.toHexString() };
    return this.jwtService.sign(payload);
  }
}
