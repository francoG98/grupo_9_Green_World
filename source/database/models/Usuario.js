
module.exports=(sequelize,DataTypes)=>{
    let alias = "usuario";
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
        lastname:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
        cultivo:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        image_id:{
            type: DataTypes.INTEGER
        },
        admin:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }

    const Usuario= sequelize.define(alias, cols, config)

    Usuario.associate= function(models){
        Usuario.belongsTo(models.imagen,{
            as: "image",
            foreignKey:"image_id"
        })
    }


    return Usuario

}