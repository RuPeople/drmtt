const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Add delay to simulate real api
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// Get cities endpoint
server.get('/cities/get', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { cities = [] } = db;

        if (cities) {
            return res.json(cities);
        }

        return res.status(403).json({ message: 'Cities not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Get bookings endpoint
server.get('/bookingDates/get/:cityId', (req, res) => {
    try {
        const { cityId } = req.params;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const bookings = db.bookings[cityId];

        if (!bookings) {
            return res.status(404).json({ message: 'Booking dates not found for the given cityId' });
        }

        return res.json({ data: bookings });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Create booking endpoint
server.post('/bookings/create', (req, res) => {
    try {
        const { cityId, date, time, phoneNumber, name } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

        if (!db.bookings[cityId] || !db.bookings[cityId][date] || !db.bookings[cityId][date][time]) {
            return res.status(400).json({ message: 'Booking not available' });
        }

        const city = db.cities.find(city => city.id === cityId);

        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        const newOrder = {
            id: new Date().valueOf(),
            cityId,
            date,
            time,
            phoneNumber,
            name
        };
        db.orders.push(newOrder);

        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 2));
        return res.status(201).json({ message: "Success" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Get orders endpoint
server.get('/bookings/get', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const ordersWithDetails = db.orders.map(order => {
            const city = db.cities.find(city => city.id === order.cityId);
            const bookingSlot = db.bookings[order.cityId]?.[order.date]?.[order.time];

            return {
                id: order.id,
                phoneNumber: order.phoneNumber,
                name: order.name,
                city,
                bookingSlot
            };
        });
        return res.json({ data: ordersWithDetails });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Delete order endpoint
server.delete('/bookings/delete/:id', (req, res) => {
    try {
        const { id } = req.params;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const orderIndex = db.orders.findIndex(order => order.id === Number(id));

        if (orderIndex !== -1) {
            const [deletedOrder] = db.orders.splice(orderIndex, 1);

            fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 2));
            return res.status(200).json(deletedOrder);
        } else {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.use(router);

// Start server
server.listen(8000, () => {
    console.log('server is running on 8000 port');
});