import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity.js';

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
}