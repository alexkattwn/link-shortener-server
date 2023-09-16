import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('api')
    app.enableCors({
        credentials: true,
        methods: ["GET", "POST", "PATCH"],
        origin: [process.env.CLIENT_URL]
    })

    const config = new DocumentBuilder()
        .setTitle('Short Linker')
        .setDescription('API Documentation')
        .setVersion('1.0')
        .addTag('API')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)

    const PORT = process.env.PORT || 5000

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

bootstrap()
