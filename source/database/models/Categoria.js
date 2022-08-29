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

    return Categoria

}