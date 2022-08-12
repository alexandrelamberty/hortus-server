import {
  Controller,
  Get,
  Param,
  Query
} from '@nestjs/common'
import { NetworkService } from './network.service'
import { SensorsService } from './sensors.service'

@Controller('network')
export class NetworkController {
  constructor(
    private readonly networkService: NetworkService
  ) { }

  @Get('scan')
  scanNetwork() {
    return this.networkService.scanNetwork()
  }

  @Get('reverse/:ip')
  dnsRevers(@Param('ip') ip: string) {
    return this.networkService.dnsReverse(ip)
  }

  @Get('lookup/:ip')
  dnslookupservice(@Param('ip') ip: string, @Query('port') port: number) {
    return this.networkService.dnsLookupService(ip, port)
  }
}
