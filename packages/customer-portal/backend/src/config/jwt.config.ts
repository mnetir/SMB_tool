import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'pishgaman-portal-jwt-secret-dev',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
}));

export const JwtConfig = {
  secret: process.env.JWT_SECRET || 'pishgaman-portal-jwt-secret-dev',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
};