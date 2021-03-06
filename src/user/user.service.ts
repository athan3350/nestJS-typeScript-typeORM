import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@app/user/dto/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken'
import secretConstants from '@app/constants/secretConstants'
import { UserResponseInterface } from '@app/user/types/userResponse.interface'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }
    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({ where: { email: createUserDTO.email } });
        const userByUsername = await this.userRepository.findOne({ where: { username: createUserDTO.username } });

        if (userByEmail || userByUsername) throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY);

        const newUser = new UserEntity()
        Object.assign(newUser, createUserDTO);
        return await this.userRepository.save(newUser);
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email,
        }, secretConstants.JWT_SECRET_KEY)
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
}
