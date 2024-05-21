const dataSource = require('../models');

class Services {
    constructor(nomeDoModel, validador) {
        this.model = nomeDoModel;
        this.validador = validador;
    }

    async salvarErro(exception, mensagem) {
        const erro = {
            exception: exception,
            message: mensagem,
        };
        try {
            await dataSource.Fracaso.create(erro);
            console.log('Erro salvo com sucesso');
        } catch (error) {
            console.error('Falha ao salvar o erro no banco de dados:', error);
        }
    }

    async validarDados(dados) {
        try {
            this.validador.parse(dados);
        } catch (error) {
            const invalidFields = error.errors.map(err => `${err.path}: ${err.message}`).join(', ');
            const errorMessage = `Dados inválidos: ${invalidFields}`;
            await this.salvarErro(error.name, errorMessage);
            throw new Error(errorMessage);
        }
    }

    async pegaTodosOsRegistros() {
        try {
            return await dataSource[this.model].findAll();
        } catch (error) {
            await this.salvarErro(error.name, error.message);
            throw error;
        }
    }

    async pegaUmRegistro(id) {
        try {
            return await dataSource[this.model].findOne({ where: { id } });
        } catch (error) {
            await this.salvarErro(error.name, error.message);
            throw error;
        }
    }

    async criaRegistro(dados) {
        try {
            await this.validarDados(dados);
            return await dataSource[this.model].create(dados);
        } catch (error) {
            await this.salvarErro(error.name, error.message);
            throw error;
        }
    }

    async atualizaRegistro(dadosAtualizados, id) {
        try {
            const dadosExistentes = await this.pegaUmRegistro(id);
            if (!dadosExistentes) {
                const errorMessage = 'Registro não encontrado';
                await this.salvarErro('NotFound', errorMessage);
                throw new Error(errorMessage);
            }

            const dadosParaAtualizar = {
                ...dadosExistentes.toJSON(),
                ...dadosAtualizados,
                updatedAt: new Date(),
            };

            await this.validarDados(dadosParaAtualizar);

            return await dataSource[this.model].update(dadosParaAtualizar, { where: { id } });
        } catch (error) {
            await this.salvarErro(error.name, error.message);
            throw error;
        }
    }

    async deletaRegistro(id) {
        try {
            return await dataSource[this.model].destroy({ where: { id } });
        } catch (error) {
            await this.salvarErro(error.name, error.message);
            throw error;
        }
    }
}

module.exports = Services;
