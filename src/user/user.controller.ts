import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';




@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const user = await this.userService.findAll();
    return user;
  }
  
  @Get(':id')
  async getUserWithDetails(@Param('id') id: number) {
    return this.userService.getUserDetailsById(Number(id));
  }
  
  

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto); // 🟢 This must exist
  }

  @Post('bulk')
  async createUsers(@Body() users: CreateUserDto[]) {
    return this.userService.createBulkUsers(users);
  } 


  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    await this.userService.update(id, updateUserDto);
    return { message: 'User updated successfully using stored procedure' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
