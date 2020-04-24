import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { MensajeDto } from '../../dto/mensaje-dto';
import { MensajeService } from '../../services/mensaje/mensaje.service';
import { response } from 'express';

@Controller('mensajes')
export class MensajesController {
  constructor(private serviceMsg: MensajeService) {}

  // Post para crear un nuevo mensaje
  @Post()
  create(@Body() createMensajeDto: MensajeDto, @Res() response) {
    this.serviceMsg
      .addMsg(createMensajeDto)
      .then(mensaje => {
        response.status(HttpStatus.CREATED).json(mensaje);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la creacion del mensaje' });
      });
  }

  @Get()
  getAll(@Res() response) {
    this.serviceMsg
      .findAll()
      .then(lista => {
        response.status(HttpStatus.OK).json(lista);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la obtencion de los mensajes' });
      });
  }

  @Put(':id')
  update(
    @Body() updateMensajeDto: MensajeDto,
    @Res() response,
    @Param('id') idmensaje,
  ) {
    this.serviceMsg
      .editMsg(idmensaje, updateMensajeDto)
      .then(mensaje => {
        response.status(HttpStatus.OK).json(mensaje);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la actualizacion del mensaje' });
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') idmensaje) {
    this.serviceMsg
      .removeMsg(idmensaje)
      .then(resp => {
        response.status(HttpStatus.OK).json(resp);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la eliminacion del mensaje' });
      });
  }
}
