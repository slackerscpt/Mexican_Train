import sqlite3
from sqlite3 import Error

def create_connection(path):
    connection = None
    try:
        connection = sqlite3.connect(path)
        print("Connection to SQLite DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

def execute_query(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print("Query executed successfully")
    except Error as e:
        print(f"The error '{e}' occurred")

create_users_table = """
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  round INTEGER,
  scores INTEGER
);
"""

create_users = """
INSERT INTO
  users (name, round, scores)
VALUES
  ('James', 2, 0),
  ('Leila', 2, 100),
  ('Brigitte', 2, 25),
  ('Mike', 2, 50),
  ('Elizabeth', 2, 20);
"""

def execute_read_query(connection, query):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Error as e:
        print(f"The error '{e}' occurred")


database = create_connection('players.db')

execute_query(database, create_users_table)  

execute_query(database, create_users)  

select_users = "SELECT * from users"
users = execute_read_query(database, select_users)

for user in users:
    print(user)

select_names = "SELECT name from users"
names = execute_read_query(database, select_names)

for name in names:
    print(name)