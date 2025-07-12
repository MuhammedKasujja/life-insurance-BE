import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateRecommendationDto } from './dto/update-profile.dto';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('recommendation')
@UsePipes(ZodValidationPipe)
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateProfileDto,
  })
  create(@Body() createRecommendationDto: CreateProfileDto) {
    return this.recommendationService.create(createRecommendationDto);
  }

  @Get()
  findAll() {
    return this.recommendationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommendationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecommendationDto: UpdateRecommendationDto,
  ) {
    return this.recommendationService.update(+id, updateRecommendationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommendationService.remove(+id);
  }
}
