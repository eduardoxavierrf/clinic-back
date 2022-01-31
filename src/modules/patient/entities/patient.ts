import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    telephone: string

    @Column()
    birthday: Date
}
