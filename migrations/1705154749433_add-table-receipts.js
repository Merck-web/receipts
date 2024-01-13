/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('recipes', {
        id: {
            type: 'bigserial',
            primaryKey: true
        },
        name: {
            type: 'varchar(100)',
            notNull: true
        },
        categoryId: {
            type: 'integer',
            notNull: true
        },
        shortDescription: {
            type: 'text',
            notNull: true
        },
        fullDescription: {
            type: 'text',
            notNull: true
        },
        dateCreate: {
            type: 'date',
            default: pgm.func('now()'),
        }
    }, {
        ifNotExists: true
    });
};

exports.down = pgm => {};
