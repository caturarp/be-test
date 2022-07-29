import { PrimaryKey, Table, Column, Model, Scopes, BelongsTo, ForeignKey, HasMany, AutoIncrement, AllowNull } from "sequelize-typescript";
import User from "./User";
import UserLiked from "./UserLiked";
@Table({ tableName: "posts", schema: "public" })
export default class Post extends Model<Post> {

	@PrimaryKey
	@AutoIncrement
	@Column
	id!: bigint;

	@Column
	@ForeignKey(() => User)
	userId!: bigint;

	@BelongsTo(() => User)
	user?: User;

	@AllowNull(false)
	@Column
	name!: string;

	@Column
	caption!: string;
	
	@Column
	tags!: string;

	@Column
	likes!: number;

	@Column
	image!: string;

	@Column
	createdAt!: Date;

	@Column
	updatedAt!: Date;

	@HasMany(() => UserLiked)
	UserLikeds?: UserLiked[]

}
