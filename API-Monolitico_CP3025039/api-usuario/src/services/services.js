const db = require('../database/db');

exports.createUser = (nome, email) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO usuarios (nome, email) VALUES (?, ?)`;

        db.run(sql, [nome, email], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, nome, email, status: 'ativo' });
            }
        });
    });
};

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM usuarios WHERE id = ?`, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

exports.updateUser = (id, nome, status) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE usuarios SET nome = ?, status = ? WHERE id = ?`;

        db.run(sql, [nome, status, id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

exports.deactivateUser = (id) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE usuarios SET status = 'inativo' WHERE id = ?`,
            [id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};