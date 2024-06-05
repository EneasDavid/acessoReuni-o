'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
        identificador: '00000000000',
        nome: 'David',
        sobrenome: 'Enéas',
        email: 'david@eneas.com',
        numTelefone: '81900000000',
        dataNascimento: '1990-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        identificador: '11111111111',
        nome: 'Gustavo',
        sobrenome: 'Henrique',
        email: 'gustavo@gmail.com',
        numTelefone: '81911111111',
        dataNascimento: '1991-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
     },
    {
        identificador: '22222222222',
        nome: 'Mariah',
        sobrenome: 'Lins',
        email: 'mariah@gmail.com',
        numTelefone: '81922222222',
        dataNascimento: '1992-01-01',
        createdAt: new Date(),
        updatedAt: new Date()        
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
