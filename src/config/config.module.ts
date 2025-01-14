import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// custom
import { databaseConfig } from './database.config';
import { authConfig } from './auth.config';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true, // Makes the module globally available
            load: [ databaseConfig , authConfig], // Load custom configuration files
            envFilePath: ['.env'], // Define environment file paths
            validationSchema: Joi.object({
                DB_HOST : Joi.string().required(),
                DB_PORT : Joi.number().required(),
                DB_DATABASE  : Joi.string().required(),
                DB_USERNAME  : Joi.string().required(),
                // DB_PASSWORD  : Joi.string().required(),
                DB_SYNCHRONIZE  : Joi.bool().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.string().required(),
            }),
        }),
    ],
})
export class ConfigModule {}
