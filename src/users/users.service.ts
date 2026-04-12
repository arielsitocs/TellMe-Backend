import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(userData: UserDto) {
    // se hashea la contrasena del usuario con 10 rondas de encriptacion //
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Crea el usuario con la contrasena hasheada //
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      }
    });

    // Se retorna el usuario sin la contrasena //
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        userid: true,
        email: true,
        firstname: true,
        lastname: true,
        username: true,
        description: true,
        color: true,
        imageurl: true,
        followers: true,
        following: true,
        posts: true
      }
    });
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          userid: id
        },
        select: {
          userid: true,
          email: true,
          firstname: true,
          lastname: true,
          username: true,
          description: true,
          color: true,
          imageurl: true,
          followers: true,
          following: true,
          posts: true,
        },
      })

      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, userData: UpdateUserDto, userId: number) {
    try {
      const foundUser = await this.prisma.user.findFirst({
        where: {
          userid: id
        },
        select: {
          userid: true
        }
      })

      if (!foundUser) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`)
      }

      if (foundUser?.userid !== userId) {
        throw new ForbiddenException(`No tienes permiso para editar este usuario.`);
      }

      // Si pasa todas las validaciones, realiza el update sin password //
      const userUpdate = await this.prisma.user.update({
        where: {
          userid: id
        },
        data: {
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username,
          description: userData.description,
          imageurl: userData.imageurl,
          color: userData.color,
        },
      });


      const { password, ...userWithoutPassword } = userUpdate;
      return userWithoutPassword;
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
      }

      throw error;
    }
  }

  async remove(id: number, userId: number) {
    try {
      const foundUser = await this.prisma.user.findFirst({
        where: {
          userid: id
        },
        select: {
          userid: true
        }
      })

      if (!foundUser) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`)
      }

      if (foundUser?.userid !== userId) {
        throw new ForbiddenException(`No tienes permiso para eliminar este usuario.`);
      }

      // Si pasa todas las validaciones, se elimina el usuario //
      return this.prisma.user.delete({
        where: {
          userid: id
        }
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`)
      }
      throw error;
    }
  }
}
