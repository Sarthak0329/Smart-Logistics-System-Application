import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/Products/product.entity';
import { Order, OrderStatus } from 'src/order/order.entity';
import { Delivery_agent } from 'src/Delivery_agent/delivery_agent.entity';

@Injectable()
export class WarehouseService {
    
    constructor(
        @InjectRepository(Order)
        private orderRepo : Repository<Order>,
        @InjectRepository(Product)
        private productRepo : Repository<Product>,
        @InjectRepository(Delivery_agent)
        private agentRepo : Repository<Delivery_agent>
    ){}
//check if the required product is available in the inventory or not 
    async checkInventory(product_id : number,quantity : number){
        const product = await this.productRepo.findOne({
            where : {id : product_id},
        })
             if (!product || product.stock < quantity) {
                throw new BadRequestException('Insufficient stock');
         }
            return true;
    }
 //updating the inventory when the customer orders the product!
    async reserveInventory(productId : number,quantity : number){
        const product = await this.productRepo.findOne({
            where : {id : productId}
        })
        if (!product) {
             throw new NotFoundException('Product not found');
        }
        product.stock -= quantity;

        await this.productRepo.save(product);
    }
    //when the order is placed the warehouse staff will update the package status to PACKED
    async markOrderPacked(orderId: string) {
        const order = await this.orderRepo.findOne({
        where: { id: orderId }
    });

    if (!order) {
        throw new NotFoundException('Order not found');
    }

    order.status = OrderStatus.PACKED;

    await this.orderRepo.save(order);

    return { message: 'Order packed and ready for delivery' };
   }
//Assign the deliveries to the delivery agent
    async assignDeliveryAgent(orderId: string, agentId: number) {
    const order = await this.orderRepo.findOne({
    where: { id: orderId }
  });

    const agent = await this.agentRepo.findOne({
        where: { id: agentId }
    });

    if(!order) {
        throw new NotFoundException('Order not found');
  }

    if (!agent) {
        throw new NotFoundException('Agent not found');
    }

    order.delivery_agent_id = agent.id;
    order.status = OrderStatus.SHIPPED;

    await this.orderRepo.save(order);
 }

 async getOrdersToPack() {
  return this.orderRepo.find({
    where: { status: OrderStatus.CONFIRMED }
  });
 }
}
