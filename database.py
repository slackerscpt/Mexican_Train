import sqlite3
con = sqlite3.connect("tutorial.db")
cur = con.cursor()

def setupInitalPlayers(cur):
    cur.execute("CREATE TABLE IF NOT EXISTS player(name, number)")

def setupPlayers(cur, players):
    cur.executemany("INSERT INTO player VALUES(?,?)", players)
    con.commit()

def updatePlayer(cur, name, number):
    cur.execute("UPDATE player SET name=? WHERE number=?", (name, number))
    con.commit()

def setupScoreTable(cur):
    cur.execute("CREATE TABLE IF NOT EXISTS scores(name,round,score)")

def scoreRound(cur, scores):
    cur.executemany("INSERT INTO scores VALUES(?,?,?)", scores)
    con.commit()

setupInitalPlayers(cur)
data = [
    ("Josh", 1),
    ("Brooke", 2),
    ("David", 3)
]
setupPlayers(cur, data)


for row in cur.execute("SELECT name, number FROM player"):
    print(row)
#We would want player db, name, number
#We would want score  player, round, value

updatePlayer(cur, "God", 1)
for row in cur.execute("SELECT name, number FROM player"):
    print(row)

setupScoreTable(cur)
scores = [
    ("Josh", 1, 50),
    ("Brooke", 1, 100),
    ("Dave", 1, 0)
]
scoreRound(cur, scores)

for row in cur.execute("SELECT name, round, score FROM scores"):
    print(row)

cur.execute("SELECT score FROM scores")
fullData = cur.fetchall()
print (fullData)

name = "Josh"
total = 0
for score in cur.execute("SELECT score FROM scores WHERE name=?", (name,)):
    print (score)
    print(type(score))
    total += int(score[0])

print (total)

