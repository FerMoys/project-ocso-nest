import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Location } from '../../locations/entities/location.entity.js';
import { User } from '../../auth/entities/user.entity.js';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  employeeName: string;

  @Column('text')
  employeeLastName: string;

  @Column('text')
  employeePhoneNumber: string;
  @Column({
    type: 'text',
    nullable:true,
    unique:true
  })
  employeeEmail: string;
  @Column({
    type: 'text',
    nullable:true,
    unique:true
  })
  employeePhoto: string;

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