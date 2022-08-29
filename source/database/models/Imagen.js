module.exports=(sequelize,DataTypes)=>{
    let alias = "imagen";
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
        path:{
            type:DataTypes.STRING
        }
    }

    const Imagen = sequelize.define(alias, cols, config)
    Imagen.associate = function(models){
        Images.hasMany(models.usuario, {
            foreignKey: 'image_id'
        })
    }
    Imagen.associate=function(models){
        Imagen.belongsTo(models.categoria,{
        foreignKey:"image_id"
        })
    }
    Imagen.associate= function(models){
        Imagen.belongsTo(models.producto,{
        foreignKey:"image_id"
        })
    }
    

    return Imagen
}