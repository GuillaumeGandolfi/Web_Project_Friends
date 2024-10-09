import {  Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot(), // Pour charger les variables d'environnement
    MongooseModule.forRoot(process.env.MONGODB_URI),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('Connected to MongoDB successfully!');
  }
}