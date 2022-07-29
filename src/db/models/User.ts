import { PrimaryKey, Table, Column, Model, Scopes, BelongsTo, ForeignKey, AutoIncrement, AllowNull, HasMany, BelongsToMany, Unique } from "sequelize-typescript";
import Post from './Post'

@Table({ tableName: "users", schema: "public" })
export default class User extends Model<User> {

	@PrimaryKey
	@AutoIncrement
	@Column
	id?: bigint;

	@AllowNull(false)
	@Column
	name!: string;

	@AllowNull(false)
	@Column
	username!: string;

	@AllowNull(false)
	@Column
	password!: string;

	@AllowNull(false)
	@Unique
	@Column
	email!: string;

	@Column
	photo!: string;
	
	@Column
	createdAt!: Date;

	@Column
	updatedAt!: Date;

	@HasMany(() => Post)
	posts?: Post[]

}
