const pool = require('../db')

async function showRecipes(object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };
    let params = [ ];
    let categoryId = object.category;
    let where = '';

    if (categoryId) {
        where += 'WHERE r."categoryId" = $1'
        params.push(categoryId);
    }

    const client = await pool.connect();
    try {
        const query = `SELECT r."id", r."name", r."categoryId", r."shortDescription", to_char(r."dateCreate", 'dd.mm.yyyy') AS "dateCreate"
                       FROM recipes r
                       ${where}
                       ORDER BY r."dateCreate" DESC`;

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
        const addRecipe = await client.query(`INSERT INTO recipes ("name", "categoryId", "shortDescription", "fullDescription")
                                              VALUES ($1, $2, $3, $4)`, [ object.name, object.categoryId, object.shortDescription, object.fullDescription ]);

        if (addRecipe.rowCount > 0) {
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
            console.log(`showRecipe: Рецепт не найден (id:${object.recipeId})`);
            data.message = `Рецепт не найден (id:${object.recipeId})`;
        }
    } catch(err) {
        console.error(err.message, err.stack);
    } finally {
        client.release();
        console.log('Release client');
    }
    return data;
}

async function updateRecipe(object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };

    const client = await pool.connect();

    try {
        const updateRecipe = await client.query(`UPDATE recipes SET "name" = $2, 
                                                                    "categoryId" = $3, 
                                                                    "shortDescription" = $4, 
                                                                    "fullDescription" = $5
                                                 WHERE id = $1`, [ object.recipeId, object.name, object.categoryId, object.shortDescription, object.fullDescription ]);

        if (updateRecipe.rowCount > 0) {
            data.message = 'success';
            data.statusCode = 200;
        }
        else {
            console.log(`updateRecipe: Рецепт не найден (id:${object.recipeId})`);
            data.message = `Рецепт не найден (id:${object.recipeId})`;
        }
    } catch (err) {
        console.error(err.message, err.stack);
    } finally {
        client.release();
        console.log('Release client');
    }

    return data;
}

async function deleteRecipe(object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };

    const client = await pool.connect();
    try {
        const result = await client.query(`DELETE FROM recipes WHERE id = $1`, [ object.recipeId ]);
        if (result.rowCount > 0) {
            data.message = 'success';
            data.statusCode = 200;
        }
        else {
            console.log(`deleteRecipe: Рецепт не найден (id:${ object.recipeId })`);
            data.message = `Рецепт не найден (id:${ object.recipeId })`;
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
    showRecipes:  showRecipes,
    addRecipe:    addRecipe,
    showRecipe:   showRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe,
}
