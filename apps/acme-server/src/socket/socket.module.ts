import { Module } from '@nestjs/common'
import { AuthModule } from '~/auth'
import { SocketGateway } from './socket.gateway'

@Module({
  imports: [AuthModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
