import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Dummy {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: true })
  dummy: string;
}
