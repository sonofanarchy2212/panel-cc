import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { Cc, CcSchema } from 'src/schema/Cc.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cc.name, schema: CcSchema }])
  ],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
