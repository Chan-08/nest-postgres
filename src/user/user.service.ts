import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource // ✅ Inject DataSource here
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
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
    await this.userRepository.query(
      `SELECT create_users_bulk($1::jsonb)`,
      [userJson]
    );
  }

  async getUserDetailsById(userId: number) {
    return await this.dataSource.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        a.degree,
        a.university,
        a.year_of_passing,
        j.company,
        j.designation,
        j.experience_years
      FROM "user" u
      LEFT JOIN academics a ON u.id = a.user_id
      LEFT JOIN jobs j ON u.id = j.user_id
      WHERE u.id = $1
    `, [userId]);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { name, email, password } = updateUserDto;
    await this.userRepository.query(
      `SELECT update_user_proc($1, $2, $3, $4)`,
      [id, name, email, password]
    );
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
