/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('categories', {
        id: {
            type: 'bigserial',
            primaryKey: true
        },
        value: {
            type: 'varchar(100)',
            notNull: true
        },
    }, {
        ifNotExists: true
    });

    pgm.sql('INSERT INTO public.categories ("value") VALUES (\'Суши\');');
    pgm.sql('INSERT INTO public.categories ("value") VALUES (\'Пиццы\');');
    pgm.sql('INSERT INTO public.categories ("value") VALUES (\'Салаты\');');
    pgm.sql('INSERT INTO public.categories ("value") VALUES (\'Супы\');');
};

exports.down = pgm => {};
