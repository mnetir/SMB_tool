import { Module, Injectable, Controller, Post, Get, Body, UnauthorizedException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PortalUser } from '../portal-users/entities/portal-user.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PortalUser) private userRepo: Repository<PortalUser>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username }, select: ['id', 'username', 'passwordHash', 'roles', 'status', 'displayName', 'email'] });
    if (!user || user.status !== 'active') throw new UnauthorizedException('Invalid credentials');
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    if (user.passwordHash !== hash) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, username: user.username, roles: user.roles };
    return { accessToken: this.jwtService.sign(payload), user: { id: user.id, username: user.username, displayName: user.displayName, email: user.email, roles: user.roles } };
  }

  async validateUser(payload: any) {
    return this.userRepo.findOne({ where: { id: payload.sub } });
  }
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('login') @ApiOperation({ summary: 'Login' }) login(@Body() dto: { username: string; password: string }) { return this.service.login(dto.username, dto.password); }
}

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ secret: config.get('jwt.secret', 'pishgaman-portal-jwt-secret-dev'), signOptions: { expiresIn: '24h' } }),
    }),
    TypeOrmModule.forFeature([PortalUser]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}