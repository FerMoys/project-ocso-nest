import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Location } from '../../locations/entities/location.entity.js';
import { User } from '../../auth/entities/user.entity.js';

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

  @ManyToOne(()=> Location,(location) => location.employees)
  @JoinColumn({
    name:"locationId"
  })
  location:Location
  @OneToOne(() => User)
  @JoinColumn({
      name: "userId"
  })
  user: User;
}