import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../../users/services/user.mapper';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { ITokenPair } from '../models/interfaces/token-pair.interface';
import { IUserData } from '../models/interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);

    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await this.saveTokens(tokens, {
      userId: user.id,
      deviceId: dto.deviceId,
      email: user.email,
    });

    // await Promise.all([
    //   this.authCacheService.saveToken(
    //     tokens.accessToken,
    //     user.id,
    //     dto.deviceId,
    //   ),
    //   this.refreshTokenRepository.save(
    //     this.refreshTokenRepository.create({
    //       user_id: user.id,
    //       deviceId: dto.deviceId,
    //       refreshToken: tokens.refreshToken,
    //     }),
    //   ),
    // ]);

    return { user: UserMapper.toResDto(user), tokens };
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isCompare = await bcrypt.compare(dto.password, user.password);

    if (!isCompare) {
      throw new UnauthorizedException();
    }

    await this.deleteTokens({
      userId: user.id,
      deviceId: dto.deviceId,
      email: user.email,
    });

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await this.saveTokens(tokens, {
      userId: user.id,
      deviceId: dto.deviceId,
      email: user.email,
    });

    // await Promise.all([
    //   this.authCacheService.saveToken(
    //     tokens.accessToken,
    //     user.id,
    //     dto.deviceId,
    //   ),
    //   this.refreshTokenRepository.save(
    //     this.refreshTokenRepository.create({
    //       user_id: user.id,
    //       deviceId: dto.deviceId,
    //       refreshToken: tokens.refreshToken,
    //     }),
    //   ),
    // ]);
    const userEntity = await this.userRepository.findOneBy({ id: user.id });

    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  public async signOut(userData: IUserData): Promise<void> {
    // await Promise.all([
    //   this.authCacheService.deleteToken(userData.userId, userData.deviceId),
    //   this.refreshTokenRepository.delete({
    //     user_id: userData.userId,
    //     deviceId: userData.deviceId,
    //   }),
    // ]);
    await this.deleteTokens(userData);
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    // await Promise.all([
    //   this.authCacheService.deleteToken(userData.userId, userData.deviceId),
    //   this.refreshTokenRepository.delete({
    //     user_id: userData.userId,
    //     deviceId: userData.deviceId,
    //   }),
    // ]);

    await this.deleteTokens(userData);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: userData.userId,
      deviceId: userData.deviceId,
    });

    await this.saveTokens(tokens, userData);

    // await Promise.all([
    //   this.authCacheService.saveToken(
    //     tokens.accessToken,
    //     userData.userId,
    //     userData.deviceId,
    //   ),
    //   this.refreshTokenRepository.save(
    //     this.refreshTokenRepository.create({
    //       user_id: userData.userId,
    //       deviceId: userData.deviceId,
    //       refreshToken: tokens.refreshToken,
    //     }),
    //   ),
    // ]);

    return tokens;
  }

  private async saveTokens(
    tokens: ITokenPair,
    userData: IUserData,
  ): Promise<void> {
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        userData.userId,
        userData.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: userData.userId,
          deviceId: userData.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
  }

  private async deleteTokens(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);
  }

  private async isEmailNotExistOrThrow(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new Error('Email already exists');
    }
  }
}
