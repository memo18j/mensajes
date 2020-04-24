import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from '../../entities/mensaje.entity';
import { Repository } from 'typeorm';
import { MensajeDto } from '../../dto/mensaje-dto';

@Injectable()
export class MensajeService {
  constructor(
    @InjectRepository(Mensaje)
    private mensajeRepository: Repository<Mensaje>,
  ) {}

  async findAll(): Promise<Mensaje[]> {
    return this.mensajeRepository.find();
  }

  async addMsg(msgNew: MensajeDto): Promise<Mensaje> {
    const guardar = new Mensaje();
    guardar.nick = msgNew.nick;
    guardar.texto = msgNew.texto;
    return this.mensajeRepository.save(guardar);
  }

  async editMsg(id: number, updateMsg: MensajeDto): Promise<Mensaje> {
    const actualizar = await this.mensajeRepository.findOne(id);
    actualizar.nick = updateMsg.nick;
    actualizar.texto = updateMsg.texto;
    return await this.mensajeRepository.save(actualizar);
  }

  async removeMsg(id: number): Promise<any> {
    return await this.mensajeRepository.delete(id);
  }
}
