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

    return Imagen
}