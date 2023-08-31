import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { EStatus } from '../interfaces/status'
import { Type } from 'class-transformer'

export class CreateOrderDto {
  @IsEnum(EStatus)
  @IsNotEmpty()
  status: EStatus

  @IsString()
  @IsNotEmpty()
  client: string

  @IsString()
  @IsNotEmpty()
  shippingAddress: string

  @IsDateString()
  @IsNotEmpty()
  shippingPromise: Date

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemsDto)
  @IsNotEmpty()
  items: ItemsDto[]
}

class ItemsDto {
  @IsNumber()
  @IsNotEmpty()
  id: number

  @IsNumber()
  @IsNotEmpty()
  quantity: number
}
