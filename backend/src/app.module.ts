import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Pour charger les variables d'environnement
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('Connected to MongoDB successfully!');
  }
}
