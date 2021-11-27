class Player:
    """
    This will setup a player
    Init setup will require name
    add_score will add to the current players score
    """
    def __init__(self, name):
        self.name = name
        self.score = 0
        self.rounds = {}
    def add_score(self, update):
        self.score += update
    def add_round_score(self, round, score):
        self.rounds[round] = score
    def get_score(self):
        return self.score
    def get_round_score(self, round):
        return self.rounds[round]
    