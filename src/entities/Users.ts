import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  isAdm!: boolean;

  @CreateDateColumn()
  createdOn!: Date;

  @UpdateDateColumn()
  updatedOn!: Date;

  serialize(){
    return {
      "id": this.uuid,
      "name": this.name,
      "email": this.email,
      "isAdm": this.isAdm,
      "createdOn": this.createdOn,
      "updatedOn": this.updatedOn
    }
  }
}
