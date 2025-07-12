import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { RecommendationResponseDto } from './dto/recommendation.dto';

@Controller('recommendation')
@UsePipes(ZodValidationPipe)
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: RecommendationResponseDto,
  })
  async create(@Body() createRecommendationDto: CreateProfileDto) {
    const profile = await this.recommendationService.create(
      createRecommendationDto,
    );
    return this.recommendationService.getRecommendation(profile);
  }

  @Get()
  findAll() {
    return this.recommendationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommendationService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommendationService.remove(+id);
  }
}
