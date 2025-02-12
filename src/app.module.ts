import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { CartModule } from './shop/cart.module';  
import { OrderModule } from './shop/order.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb+srv://yusufovamina:nfpFT4gUltpMOZSj@cluster.pott4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"),
    AuthModule,
    ShopModule,
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
