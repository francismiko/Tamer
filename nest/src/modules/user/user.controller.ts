import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUser({ id });
  }

  @Post()
  create(@Body() body: User): Promise<User> {
    return this.userService.createUser(body);
  }
}
