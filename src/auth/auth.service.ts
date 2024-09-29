import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(
    username: string,
    password: string,
    password2: string
  ): Promise<ResponseDto> {
    var errors: string[] = []
    if(this.usersService.findOne(username))
        errors.push("Already exists a user with this username")
    if(password !== password2)
        errors.push("Passwords mismatch")
    if(!this.isPasswordValid(password)) 
        errors.push("Passwords must follow the next rules: Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
    if(errors.length !== 0)
        throw new BadRequestException(
            <ResponseDto>{
                result: "Error creating the user",
                errors
            }
        )
    const user = this.usersService.insertOne(username, password);
    return <ResponseDto>{
      result: "User successfully created.",
    };
  }

  private isPasswordValid(password: string): boolean {
    if(password.length < 6)
        return false
    if(!/[A-Z]/.test(password))
        return false
    if(!/[a-z]/.test(password))
        return false
    if(!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
        return false
    if(!/\d/.test(password))
        return false
    return true
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ token: string }> {
    const user = this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException("Cannot login with provided credentials");
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}