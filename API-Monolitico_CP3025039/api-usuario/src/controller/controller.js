const userService = require('../services/services');

exports.createUser = async (req, res) => {
    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
        }

        const user = await userService.createUser(nome, email);
        res.status(201).json(user);

    } catch (error) {
        if (error.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }

        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch {
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json(user);
    } catch {
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { nome, status } = req.body;

        if (!nome || !status) {
            return res.status(400).json({ error: 'Nome e status são obrigatórios.' });
        }

        const changes = await userService.updateUser(req.params.id, nome, status);

        if (changes === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });

    } catch {
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const changes = await userService.deactivateUser(req.params.id);

        if (changes === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json({ message: 'Usuário desativado com sucesso.' });

    } catch {
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};