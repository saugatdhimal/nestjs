import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {

    signup() {
        return { msg: 'Signed UP' }
    }

    signin() {
        return { msg: 'Signed IN' }
    }
}