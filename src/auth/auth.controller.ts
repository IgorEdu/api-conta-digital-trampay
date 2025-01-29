import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { Public } from "./constants/constant";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){
    
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() auth: AuthDto){
        return await this.authService.signIn(auth.userId);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    getProfile(@Request() req){
        return req.userInfo;
    }
}