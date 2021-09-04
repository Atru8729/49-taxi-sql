const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'taxi',
    });

    let sql = '';
    let rows = [];

    //**1.** _Isspausdinti, kiek buvo kelioniu_
    sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);
    const tripsCount = rows.length;
    console.log(`Visi taksistai bendrai ivykde ${tripsCount} keliones.`);

    //**2.** _Isspausdinti, visu taksistu vardus_
    sql = 'SELECT `driver` FROM `trips`';
    [rows] = await connection.execute(sql);
    let driverNames = [];
    for (let i = 0; i < rows.length; i++) {
        const vairuotojas = rows[i].driver;
        if (!driverNames.includes(vairuotojas)) {
            driverNames.push(vairuotojas);
        }
    }
    console.log(`Taksistais dirba: ${driverNames.join(', ')}.`);


    //** 3. ** _Isspausdinti, koki atstuma nuvaziavo visu kelioniu metu_
    sql = 'SELECT `distance` FROM `trips`';
    [rows] = await connection.execute(sql);
    let driveDistance = 0;
    for (let i = 0; i < rows.length; i++) {
        driveDistance += +rows[i].distance;
    }
    console.log(`Visu kelioniu metu nuvaziuota ${driveDistance} km.`);


    // ** 4. ** _Isspausdinti, koks yra vidutinis Jono ivertinimas_
    sql = 'SELECT `rating` FROM `trips` WHERE `driver` LIKE "Jonas"';
    [rows] = await connection.execute(sql);
    let ratingSum = 0;
    for (let i = 0; i < rows.length; i++) {
        ratingSum += rows[i].rating;
    }
    const ratingAverage = ratingSum / rows.length;
    console.log(`Jono ivertinimas yra ${ratingAverage} zvaigzdutes.`);


    // ** 5. ** _Isspausdinti, kokia yra vidutine kelioniu kaina_
    //     pvz.: Vidutine kelioniu kaina yra 2.50 EUR / km.
    sql = 'SELECT `price`, `distance` FROM `trips`';
    [rows] = await connection.execute(sql);
    let travelPrices = 0;
    travelDistances = 0;
    for (let i = 0; i < rows.length; i++) {
        travelPrices += +rows[i].price;
        travelDistances += +rows[i].distance;
    }

    const travelPriceAverage = travelPrices / travelDistances;
    console.log(`Vidutine kelioniu kaina yra ${travelPriceAverage.toFixed(2)} EUR / km.`);

}

app.init();

module.exports = app;