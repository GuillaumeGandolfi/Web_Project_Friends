import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { Types } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default-key',
    });
  }

  async validate(payload: { sub: string }) {
    const userId = new Types.ObjectId(payload.sub);
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token or user not found');
    }
    return { id: user._id, email: user.email };
  }
}
