import { Column, DataType, Table } from "sequelize-typescript";

@Table({
    tableName:"carts",
    modelName:"cart",
    timestamps:true
})

@Column({
    primaryKey:true,
    type:DataType.UUID,
    defaultValue:DataType.UUIDV4
})
declare id:string;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare quantity: number;


  export default Cart


