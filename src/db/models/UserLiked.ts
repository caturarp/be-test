import { PrimaryKey, Table, Column, Model, Scopes, BelongsTo, ForeignKey, HasMany, AutoIncrement, AllowNull } from "sequelize-typescript";
import User from "./User";
import Post from "./Post";
@Table({ tableName: "UserLiked", schema: "public" })
export default class UserLiked extends Model<UserLiked> {

	@Column
	@ForeignKey(() => User)
	userId!: bigint;

	@BelongsTo(() => User)
	user?: User;

	@Column
	@ForeignKey(() => Post)
	postId!: bigint;

	@BelongsTo(() => Post)
	post?: Post;

}
