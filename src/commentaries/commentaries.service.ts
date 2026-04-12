import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentaryDto } from './dto/commentary.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentaryService {

  constructor(private prisma: PrismaService) { }

  async create(commentaryData: CommentaryDto, userId: number) {
    return await this.prisma.commentary.create({
      data: {
        content: commentaryData.content,
        publicationid: commentaryData.publicationid,
        userid: userId
      }
    })
  }

  findAll() {
    return this.prisma.commentary.findMany();
  }

  async findOne(id: number) {
    try {
      const commentary = await this.prisma.user.findFirst({
        where: {
          userid: id
        },

      })

      if (!commentary) {
        throw new NotFoundException(`Comentario con ID ${id} no encontrado.`);
      }
      return commentary;
    } catch (error) {
      throw error;
    }
  }

  // async update(id: number, commentaryData: CommentaryDto, userId: number) {
  //   try {
  //     const foundUser = await this.prisma.user.findFirst({
  //       where: {
  //         userid: id
  //       },
  //       select: {
  //         userid: true
  //       }
  //     })

  //     if (!foundUser) {
  //       throw new NotFoundException(`Usuario con ID ${id} no encontrado.`)
  //     }

  //     if (foundUser?.userid !== userId) {
  //       throw new ForbiddenException(`No tienes permiso para editar este usuario.`);
  //     }

  //     // Si pasa todas las validaciones, realiza el update sin password //
  //     const commentaryUpdate = await this.prisma.commentary.update({
  //       where: {
  //         userid: id
  //       },
  //       data: {
          
  //       },
  //     });


  //     const { password, ...userWithoutPassword } = userUpdate;
  //     return userWithoutPassword;
  //   } catch (error: any) {
  //     if (error?.code === 'P2025') {
  //       throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
  //     }

  //     throw error;
  //   }
  // }

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

      // Si pasa todas las validaciones, se elimina el comentario //
      return this.prisma.commentary.delete({
        where: {
          commentaryid: id
        }
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Comentario con ID ${id} no encontrado.`)
      }
      throw error;
    }
  }
}
