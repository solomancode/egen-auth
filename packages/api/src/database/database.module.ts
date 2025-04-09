import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get<string>(
          'MONGO_INITDB_ROOT_USERNAME',
        );
        const password = configService.get<string>(
          'MONGO_INITDB_ROOT_PASSWORD',
        );
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<string>('DB_PORT');
        const dbname = configService.get<string>('DB_NAME');
        const uri = `mongodb://${username}:${password}@${host}:${port}/${dbname}?authSource=admin`;
        console.log('connecting to: ', uri);
        return { uri };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
