import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsUrl()
  @IsNotEmpty()
  url: string

  @IsNumber()
  @IsNotEmpty()
  price: number
}
