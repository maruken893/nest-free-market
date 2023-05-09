import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwrStrategy } from './jwt.strategy';
import { JwtAuthGuards } from './guards/jwt-auth.guards';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwrStrategy, JwtAuthGuards],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  exports: [JwrStrategy, JwtAuthGuards],
})
export class AuthModule {}
