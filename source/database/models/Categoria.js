module.exports=(sequelize,DataTypes)=>{
    let alias = "categoria";
    let config={
        timestamps: false,
        deletedAt:false,
        tableName:"categorias"
    }
    let cols = {
        id:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER
        },
        name:{
            type:DataTypes.STRING
        },
        description:{
            type:DataTypes.TEXT
        },
        image_id:{
            type: DataTypes.INTEGER
        }
    }

    const Categoria = sequelize.define(alias, cols, config)

    Categoria.associate = function(model){
        Categoria.belongsTo(model.imagene,{
            as:"image",
            foreignKey:"image_id"
        })
        /*Categoria.hasMany(model.producto,{
            as:"product",
            foreignKey:"category_id"
        })*/
      }


    return Categoria

}