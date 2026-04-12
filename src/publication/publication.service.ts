import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PublicationDto } from './dto/publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PublicationService {

  constructor(private prisma: PrismaService) { }

  create(publicationData: PublicationDto) {
    return this.prisma.publication.create({
      data: {
        content: publicationData.content,
        imageurl: publicationData.imageurl ?? '',
        likes: publicationData.likes ?? 0,
        userid: publicationData.userid,
      },
    });
  }

  async findAll() {
    const publications = await this.prisma.publication.findMany({
      include: {
        _count: {
          select: {
            Like: true,
          },
        },
      },
      orderBy: {
        createdat: 'desc',
      },
    });

    return publications.map(({ _count, ...publication }) => ({
      ...publication,
      likes: _count.Like,
    }));
  }

  async findOne(id: number) {
    try {
      const publication = await this.prisma.publication.findFirst({
        where: {
          publicationid: id
        },
        include: {
          _count: {
            select: {
              Like: true,
            },
          },
        },
      })

      if (!publication) {
        throw new NotFoundException(`Publicacion con ID ${id} no encontrada.`);
      }

      const { _count, ...publicationData } = publication;

      return {
        ...publicationData,
        likes: _count.Like,
      };
    } catch (error: any) {
      throw `Error en el servidor ${error}`;
    }

  }

  async update(id: number, newPublicationData: UpdatePublicationDto, userId: number) {
    const publication = await this.prisma.publication.findFirst({
      where: {
        publicationid: id,
      },
      select: {
        userid: true,
      },
    });

    if (!publication) {
      throw new NotFoundException(`Publicacion con ID ${id} no encontrada.`);
    }

    if (publication.userid !== userId) {
      throw new ForbiddenException('No tienes permiso para editar esta publicacion.');
    }

    try {
      return await this.prisma.publication.update({
        where: {
          publicationid: id
        },
        data: {
          content: newPublicationData.content,
          imageurl: newPublicationData.imageurl,
          likes: newPublicationData.likes
        }
      })
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`Publicacion con ID ${id} no encontrada.`);
      }

      throw error;
    }
  }

  async remove(id: number, userId: number) {
    // Se trae la publicacion para verificar si los ids de usuario coinciden //
    const publication = await this.prisma.publication.findFirst({
      where: {
        publicationid: id,
      },
      select: {
        // Solo se extrae el userId para usarlo despues //
        userid: true,
      },
    });

    if (!publication) {
      throw new NotFoundException(`Publicacion con ID ${id} no encontrada.`);
    }

    // Si los ids de usuario de ambas tablas no coinciden, lanza una excepcion //
    if (publication.userid !== userId) {
      throw new ForbiddenException('No tienes permiso para eliminar esta publicacion.');
    }

    try {
      return await this.prisma.publication.delete({
        where: {
          publicationid: id
        }
      })
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`Publicacion con ID ${id} no encontrada.`);
      }

      throw error;
    }
  }

  // LOGICA DE LIKES //

  async getLikes() {
    return this.prisma.like.findMany();
  }

  async like(publicationid: number, userid: number) {
    try {
      return await this.prisma.like.create({
        data: {
          publicationid: publicationid,
          userid: userid
        }
      })
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new ConflictException('Ya diste like a esta publicacion.');
      }

      throw error;
    }
  }

  async dislike(publicationid: number, userid: number) {
    try {
      return await this.prisma.like.delete({
        where: {
          // Restriccion dada en la BD //
          unique_user_publication_like: {
            userid,
            publicationid
          }
        }
      })
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new NotFoundException('No existe un like de este usuario para esta publicacion.');
      }

      throw error;
    }
  }
}
