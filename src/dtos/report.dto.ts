import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ReportType } from '../data';
import { Exclude, Expose } from 'class-transformer';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  @Exclude()
  created_at: Date;
  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }
  @Exclude()
  updated_at: Date;
  type: ReportType;

  @Expose({ name: 'amountPlus1' })
  transformAmount() {
    return this.amount + 1;
  }

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
