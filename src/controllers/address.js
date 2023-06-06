const knex = require("knex");

const db = knex({
    client: "pg",
    connection: {
        host: process.env.POSTGRE_HOST,
        user: process.env.POSTGRE_USER,
        password: process.env.POSTGRE_PASSWORD,
        database: process.env.POSTGRE_DB,
    },
});

exports.getAddress = async (req, res) => {
    try {
        const Address = await db
          .select('Address.*', 'City.*')
          .from('Address')
          .join('City', 'Address.CityID', 'City.CityID');
          
        res.status(200).json(Address);
      } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
      }
  };  

exports.editAddress = async (req, res) => {
    const { id } = req.params;
    const { AddressID, CityID, Street, PostalCode, State, PhoneNumber } = req.body;

    try {
        const updatedCount = await db("Address")
            .where({
                AddressID: id,
            })
            .update({
                AddressID: AddressID,
                CityID: CityID,
                Street: Street,
                PostalCode: PostalCode,
                State: State,
                PhoneNumber: PhoneNumber,
            });

        if (updatedCount > 0) {
            res.json({ message: "Address updated successfully" });
        } else {
            res.status(404).json({ error: "Address not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addAddress = async (req, res) => {
    const { AddressID, CityID, Street, PostalCode, State, PhoneNumber } = req.body;

    try {
        const result = await db("Address")
        .returning('*')
        .insert({
            AddressID: AddressID,
            CityID: CityID,
            Street: Street,
            PostalCode: PostalCode,
            State: State,
            PhoneNumber: PhoneNumber,
        });
        res.status(201).json(result);
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteAddress = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Address")
            .where({
                AddressID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Address deleted successfully" });
        } else {
            res.status(404).json({ error: "Address not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}   