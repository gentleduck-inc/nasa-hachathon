import { Module } from '@nestjs/common'
import { AuthModule } from '~/auth'
import { SocketGateway } from './socket.gateway'

@Module({
  exports: [SocketGateway],
  imports: [AuthModule],
  providers: [SocketGateway],
})
export class SocketModule {}
