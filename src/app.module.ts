import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { MensajesController } from './controllers/mensajes/mensajes.controller';

import { AppService } from './app.service';
import { MensajeService } from './services/mensaje/mensaje.service';

import { Mensaje } from './entities/mensaje.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'memo',
      password: 'memo',
      database: 'mensaje',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mensaje]),
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajeService],
})
export class AppModule {}
