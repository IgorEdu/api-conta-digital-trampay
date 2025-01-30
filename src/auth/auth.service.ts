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
            throw new UnauthorizedException('Obrigatório o envio do ID do usuário');
        }

        const account = await this.accountService.getAccountByUserId(userId);

        if(!account){
            throw new UnauthorizedException('Conta não existente');
        }

        const paylod = { userId: account.userId};

        return{
            access_token: await this.jwtService.signAsync(paylod)
        }
    }
}