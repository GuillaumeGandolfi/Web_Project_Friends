import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// Middleware pour l'autentification (passport permet de gérer les stratégies d'auth)
import { PassportModule } from '@nestjs/passport';
// Service pour gérer la logique d'autentification
import { AuthService } from './auth.service';
// Pour gérer la validation et la vérification des tokens JWT
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-key',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
