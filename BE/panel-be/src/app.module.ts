import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InformationModule } from './information/information.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [InformationModule,
    MongooseModule.forRoot('mongodb+srv://misha24021988:BOzqOTw9JbPDSDZd@2024.ea150.mongodb.net/2024'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
