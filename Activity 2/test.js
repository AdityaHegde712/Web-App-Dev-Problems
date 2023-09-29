const mysql = require('mysql');

const dbConfig = {
  host: 'localhost', // Change this to your MySQL host
  user: 'root', // Change this to your MySQL username
  password: 'toor', // Change this to your MySQL password
  database: 'registration_db', // Change this to your database name
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database');

  // Fetch all entries from the database
  const sql = 'SELECT * FROM registrations';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching entries:', err);
      return;
    }

    console.log('Entries in the database:');
    results.forEach((entry, index) => {
      console.log(`Entry ${index + 1}:`);
      console.log('Name:', entry.name);
      console.log('Date of Birth:', entry.dob);
      console.log('Address:', entry.address);
      console.log('Job:', entry.job);
      console.log('Country:', entry.country);
      console.log('Phone Number:', entry.phoneNumber);
      console.log('------------------');
    });

    // Close the database connection
    connection.end((err) => {
      if (err) {
        console.error('Error closing the database connection:', err);
      } else {
        console.log('Database connection closed');
      }
    });
  });
});
