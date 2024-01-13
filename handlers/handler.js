const pool = require('../db')

async function showRecipes(object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };
    const limit = 16;
    let page = object.page || 1;
    let offset = page * limit - limit;
    let params = [ limit, offset ];
    let categoryId = object.category;
    let where = '';

    if (categoryId) {
        where += 'WHERE r."categoryId" = $3'
        params.push(categoryId);
    }

    const client = await pool.connect();
    try {
        const query = `SELECT r."id", r."name", r."categoryId", r."shortDescription", to_char(r."dateCreate", 'dd.mm.yyyy') AS "dateCreate"
                       FROM recipes r
                       ${where}
                       ORDER BY r."dateCreate" DESC
                       LIMIT $1 OFFSET $2`;

        const result = await client.query(query, params);

        data.message = result.rows;
        data.statusCode = 200;
    } catch(err) {
        console.error(err.message, err.stack);
    } finally {
        client.release();
        console.log('Release client');
    }
    return data;
}

async function addRecipe(object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };

    const client = await pool.connect();

    try {
        const addGame = await client.query(`INSERT INTO recipes ("name", "categoryId", "shortDescription", "fullDescription")
                                            VALUES ($1, $2, $3, $4)`, [ object.name, object.categoryId, object.shortDescription, object.fullDescription ]);

        if (addGame.rowCount > 0) {
            data.message = 'success';
            data.statusCode = 200;
        }
        else {
            console.log(`addRecipe: Не удалось добавить рецепт в базу`);
        }
    } catch (err) {
        console.error(err.message, err.stack);
    } finally {
        client.release();
        console.log('Release client');
    }

    return data;
}

async function showRecipe(object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };

    const client = await pool.connect();
    try {
        const query = `SELECT r."id", r."name", r."categoryId", r."shortDescription", r."fullDescription", to_char(r."dateCreate", 'dd.mm.yyyy') AS "dateCreate"
                       FROM recipes r
                       WHERE r.id = $1`;

        const result = await client.query(query, [ object.recipeId ]);
        if (result.rows.length > 0) {
            data.message = result.rows[0];
            data.statusCode = 200;
        }
        else {
            console.log(`addRecipe: Не найти информацию по рецепту (id:${ object.recipeId })`);
            data.message = `Не найти информацию по рецепту (id:${ object.recipeId })`;
        }
    } catch(err) {
        console.error(err.message, err.stack);
    } finally {
        client.release();
        console.log('Release client');
    }
    return data;
}

module.exports = {
    showRecipes: showRecipes,
    addRecipe:   addRecipe,
    showRecipe:  showRecipe,
}
