import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent } from './schemas/agent.schema';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentsService {
  constructor(@InjectModel(Agent.name) private agentModel: Model<Agent>) {}

  // Create new agent
  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const newAgent = new this.agentModel({
      ...createAgentDto,
      status: 'Open',
      total: 0,
    });
    return newAgent.save();
  }

  // Get all agents
  async findAll(): Promise<Agent[]> {
    return this.agentModel.find().exec();
  }

  // Get single agent by ID
  async findOne(id: string): Promise<Agent | null> {
    return this.agentModel.findById(id).exec();
  }

  // Update agent
  async update(
    id: string,
    updateAgentDto: UpdateAgentDto,
  ): Promise<Agent | null> {
    return this.agentModel
      .findByIdAndUpdate(
        id,
        { $set: updateAgentDto },
        { new: true }, // Return updated document
      )
      .exec();
  }

  // Delete agent
  async delete(id: string): Promise<Agent | null> {
    return this.agentModel.findByIdAndDelete(id).exec();
  }

  async incrementTotal(agentId: string): Promise<void> {
    await this.agentModel
      .findByIdAndUpdate(agentId, {
        $inc: { total: 1 },
      })
      .exec();
  }

  async decrementTotal(agentId: string): Promise<void> {
    await this.agentModel
      .findByIdAndUpdate(agentId, {
        $inc: { total: -1 },
      })
      .exec();
  }
}
