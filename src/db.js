import Sequelize from 'sequelize';
const sequelize = new Sequelize('crud','root','dmk?sti72tS^C6',{
    host:"207.180.236.209",
    dialect:'mysql',
})

sequelize.authenticate().then(function(){
    console.log("conectado");
}).catch(function(erro){
    console.log(erro + " erro na autenticação");
})
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
export default sequelize;