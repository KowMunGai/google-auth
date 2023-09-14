import { PassportStrategy } from "@nestjs/passport";

import { Injectable } from "@nestjs/common";

import { Strategy, VerifyCallback} from 'passport-google-oauth20'

@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor()
    {
        super
        ({
            clientID: '462122849205-3m3q71qls4qp0g9a0ra7vakpqhk7lsfo.apps.googleusercontent.com',
            clientSecret: "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",
            callbackURL: "https://localhost:3000/auth/google/callback",
            scope: ['email', 'profile']
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback ): Promise<any>
    {
        const { name, emails, photos } = profile
        const user = 
        {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user)
    }
}