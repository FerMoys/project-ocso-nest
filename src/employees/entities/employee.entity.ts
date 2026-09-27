import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  lastName: string;

  @Column('text')
  phoneNumber: string;
  @Column({
    type: 'text',
    nullable:true
  })
  photoUrl: string;
}