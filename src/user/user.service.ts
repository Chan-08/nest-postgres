import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
  

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { name, email, password } = createUserDto;
    await this.userRepository.query(
      `SELECT create_user_proc($1, $2, $3)`,
      [name, email, password]
    );
    return { message: 'User created successfully' };
  }

  

  async createBulkUsers(users: CreateUserDto[]): Promise<void> {
    const userJson = JSON.stringify(users);
    await this.userRepository.query(`SELECT create_users_bulk($1::jsonb)`, [userJson]);
}

  
  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { name, email, password } = updateUserDto;
    await this.userRepository.query(
      `SELECT update_user_proc($1, $2, $3, $4)`,
      [id, name, email, password]
    );
  }
  

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
