module.exports=(sequelize,DataTypes)=>{
    let alias = "producto";
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
        },
        category_id:{
            type: DataTypes.INTEGER,
        },
        user_id:{
            type: DataTypes.INTEGER,
            defaultValue:null
        },
        color:{
            type:DataTypes.STRING
        },
        price:{
            type:DataTypes.BIGINT
        }
    }

    const Producto = sequelize.define(alias, cols, config)

    Producto.associate= function(models){
        Producto.belongsTo(models.categoria,{
            as: "category",
            foreignKey:"category_id"
        })
    }
    Producto.associate= function(models){
        Producto.hasMany(models.categoria,{
            as: "image",
            foreignKey:"image_id"
        })
    }

    return Producto

}