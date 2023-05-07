import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  findById(id: string): Item {
    const foundItem = this.items.find((item) => item.id === id);
    if (!foundItem) {
      throw new NotFoundException();
    }
    return foundItem;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto);
  }

  // updateStatus(id: string): Item {
  //   const item = this.findById(id);
  //   item.status = ItemStatus.SOLD_OUT;
  //   return item;
  // }

  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
