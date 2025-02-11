import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ token: string }> {
    const { username, email, password } = registerDto;

    const existingUser = await this.userModel.findOne({ $or: [{ username }, { email }] }).exec();
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, email, password: hashedPassword });
    await user.save();

    const token = this.jwtService.sign({ id: user._id, username: user.username, role: user.role });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const token = this.jwtService.sign({ id: user._id, username: user.username, role: user.role });
    return { token };
  }

  async getProfile(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).select('-password').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  
}
