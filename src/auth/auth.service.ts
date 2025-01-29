import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "src/modules/account/account.service";

@Injectable()
export class AuthService{
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService,
    ){}
    
    async signIn(userId: string): Promise<any>{
        if(!userId || userId == null){
            throw new UnauthorizedException();
        }

        const account = await this.accountService.getAccountByUserId(userId);

        if(!account){
            throw new UnauthorizedException();
        }

        const paylod = { userId: account.userId};

        return{
            access_token: await this.jwtService.signAsync(paylod)
        }
    }
}