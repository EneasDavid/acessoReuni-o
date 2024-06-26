const request = require('supertest');
const app = 'http://localhost:3000';
const gerarToken=require('../src/middleware/criarTolke.js');

describe('Teste dos metodos atrelados a recepcionista', ()=>{
    const atributos = ['login', 'senha', 'ativo', 'tipo', 'nivelAcesso'];
    const recepcionista={
        id:3,
        login: "Enéas é foda",
        senha: "eneasEfoda",
        nome: "Enéas",
        sobrenome: "Ferreira",
        ativo: true,
        nivelAcesso: 2
    };

    it('Deve listar todos os recepcionistas', async()=>{
        const token = gerarToken(1); 
        const response = await request(app)
            .get('/recepcionista')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('Deve retornar um recepcionista por ID', async()=>{
        const token = gerarToken(1); 
        const response = await request(app)
            .get('/recepcionista/3')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('Deve criar um novo recepcionista', async()=>{
        const token = gerarToken(1); 
        const response = await request(app)
            .post('/recepcionista')
            .send(recepcionista)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200); 
    });

    it('Deve realizar login de recepcionista', async()=>{
        const response = await request(app)
            .post('/recepcionista/login')
            .send({ login: 'garota de ipanema', senha: 'quase me chamou de amor' })
        expect(response.status).toBe(200);
    });

    it('Deve retornar erro ao tentar criar um novo recepcionista com identificador inválido', async()=>{
        const token = gerarToken(1); 
        const invalidUser = { ...recepcionista, id:3, identificador: "111222333" };
        const response = await request(app)
            .post('/recepcionista')
            .send(invalidUser)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(500);
    });

    it('Deve retornar erro por não passar em validação de formatação de Senha', async()=>{
        const token = gerarToken(1); 
        const response = await request(app)
            .put('/recepcionista/3')
            .send({senha: 'eneas'})
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(500);
    });

    it('Deve atualizar um recepcionista existente', async()=>{
        const token = gerarToken(1); 
        const response = await request(app)
            .put('/recepcionista/3')
            .send({login: "Enéas é um deus"})
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    
    atributos.forEach(atributo => {
        it(`Deve retornar erro 500 ao tentar criar um recepcionista sem o atributo '${atributo}'`, async()=>{
            const token = gerarToken(1); 
            const novoUser = { ...recepcionista, [atributo]:null};
            const response = await request(app)
                .put('/recepcionista/2')
                .send(novoUser)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(500);
        });
    });
    
    it('Deve deletar um recepcionista existente', async()=>{
        const token = gerarToken(1); 
        const response = await request(app)
            .delete('/recepcionista/3')
            .set('Authorization', `Bearer ${token}`); 
        expect(response.status).toBe(200); 
    });
});