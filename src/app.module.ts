import { AccomodationModule } from './accomodation/accomodation.module';
import { TagModule } from './tag/tag.module';
import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';

@Module({
  imports: [
    AccomodationModule, TypeOrmModule.forRoot(ormconfig),
    TagModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
