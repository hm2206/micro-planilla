import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthHttpService } from '../../../client-http/application/auth-http.service';
import { ShippingService } from '../../../microservices/shipping/shipping.service';
import { HistorialRepository } from '../domain/historial.repository';
import * as urlJoin from 'url-join';
import { HistorialService } from './historial.service';

@Injectable()
export class SendBoletaService {
  constructor(
    private historialService: HistorialService,
    private shippingService: ShippingService,
    private authService: AuthHttpService,
    private historialRepository: HistorialRepository) {}

  private host = process.env.BOLETA_HOST;
  private clientId = process.env.BOLETA_ID;
  private clientSecret = process.env.BOLETA_SECRET;

  public async sendMail(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const history = await this.historialRepository.findOneOrFail(id);
        // validar token
        if (!history.tokenVerify) throw new InternalServerErrorException("Aún no tiene token generado");
        // obtener meta data
        const metaData = await this.historialRepository.createQueryBuilder('his')
          .innerJoin('works', 'w', 'w.id = his.work_id')
          .innerJoin('cronogramas', 'cro', 'cro.id = his.cronograma_id')
          .innerJoin('planillas', 'pla', 'pla.id = cro.planilla_id')
          .where(`his.id = ${history.id}`)
          .select(`w.person_id as id`)
          .addSelect('pla.nombre as displayPlanilla')
          .addSelect('cro.year as displayYear')
          .addSelect('cro.mes as displayMes') 
          .getRawOne();
        // generar link
        const link = urlJoin(this.host, `?ClientId=${this.clientId}&ClientSecret=${this.clientSecret}&token_verify=${history.tokenVerify}`);
        // obtener persona
        this.authService.findPerson(metaData.id)
        .subscribe({
          next: ({ data }) => {
            const person = data.person;
            if (!person.email_contact) return reject(new InternalServerErrorException("El trabajador no tiene correo"))
            this.shippingService.sendMail({
              objectId: history.id,
              email: person.email_contact,
              subject: `Boleta de Pago de la Planilla ${metaData?.displayPlanilla} ${metaData?.displayYear}/${metaData?.displayMes}`,
              content: `Hola ${person.name.toUpperCase()}, su boleta de pago ya está lista`,
              displayLink: 'Ver Boleta de Pago',
              link
            }).subscribe({
              next: async (data) => {
                return resolve(data);
              },
              error: (err) => reject(err)
            })
          },
          error: (err) => reject(err)
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}