class Table {
    constructor({ name, phone, email, uniqueId }) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.uniqueId = uniqueId;
        this.id = Table.id;
        Table.id++;
    }
}
Table.count = 0;
Table.id = 1;

module.exports = Table;