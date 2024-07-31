import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'soheibmohammadidev@gmail ', // your Gmail address
            pass: 'Kaka1374@', // your Gmail app password
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@gmail.com>', // default sender address
        },
        template: {
          dir: `${process.cwd()}/src/service/mail`,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
      imports: undefined,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
