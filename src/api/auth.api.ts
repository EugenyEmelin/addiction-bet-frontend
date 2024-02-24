import http from './http'
import {LoginResponse} from "./api.types";

export const AuthApi = {
    async login(signature: string, walletAddress) {
        const response = await http.post<LoginResponse>('auth/login', {
            json: { signature, walletAddress }
        })
        const result = await response.json();
        localStorage.setItem('access_token', result.access_token)
        return result;
    }
}