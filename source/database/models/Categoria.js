module.exports=(sequelize,DataTypes)=>{
    let alias = "categoria";
    let config={
        timestamps: false,
        deletedAt:false
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

    Categoria.associate= function(models){
        Categoria.hasMany(models.producto,{
            as: "products",
            foreignKey:"category_id"
        })
    }
    Categoria.associate=function(models){
        Categoria.hasOne(models.imagen,{
            as:"image",
            foreignKey:"image_id"
        })
    }

    return Categoria

}