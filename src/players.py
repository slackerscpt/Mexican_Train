import sqlite3
import os
#con = sqlite3.connect("data\players.db")
#cur = con.cursor()

class Player:
    """
    This will setup a player
    Init setup will require name
    add_score will add to the current players score
    """
    def __init__(self, name, number):
        self.name = name
        self.number = number
        self.score = 0
        self.rounds = {}
        self.connection = sqlite3.connect("data\players.db")
        self.cur = self.connection.cursor()
        self.setupInitalPlayers()
        self.setupScoreTable()
        self.setupPlayer()
    
    def add_score(self, update):
        self.score += update
    
    def add_round_score(self, round, score):
        self.rounds[round] = score
    
    def get_score(self):
        total = 0
        for score in self.cur.execute("SELECT score FROM scores WHERE name=?", (self.name,)):
            total += int(score[0])
        return total
    def get_zero_round_count(self):
        self.cur.execute("SELECT score FROM scores WHERE name=? AND score = 0", (self.name,))
        results = self.cur.fetchall()
        return len(results)

    def get_round_score(self, round):
        return self.rounds[round]
    
    def setupInitalPlayers(self):
        self.cur.execute("CREATE TABLE IF NOT EXISTS player(name, number)")
    
    def setupScoreTable(self):
        self.cur.execute("CREATE TABLE IF NOT EXISTS scores(name,round,score)")
    
    def setupPlayer(self):
        self.cur.executemany("INSERT INTO player VALUES(?,?)", {(self.name, self.number)})
        self.connection.commit()

    def scoreRound(self, round, score):
        self.cur.executemany("INSERT INTO scores VALUES(?,?,?)", {(self.name, round, score)})
        self.connection.commit()


def start_up():
    os.remove("data\players.db")