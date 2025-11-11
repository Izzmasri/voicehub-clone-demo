import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  // POST /agents - Create new agent
  @Post()
  async create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  // GET /agents - Get all agents
  @Get()
  async findAll() {
    return this.agentsService.findAll();
  }

  // GET /agents/:id - Get single agent
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.agentsService.findOne(id);
  }

  // PATCH /agents/:id - Partial update agent
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAgentDto: UpdateAgentDto,
  ) {
    return this.agentsService.update(id, updateAgentDto);
  }

  // DELETE /agents/:id - Delete agent
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.agentsService.delete(id);
  }
}
