class Dominos:
    """
    The Dominos class, it will take in a number as the high double
    It will intial set the doubles_set by taking every number under high until 0 to create an array on doubles
    played_set will contain an array of all the doubles played
    played function will take in a number of doubles played, remove it from doubles set and add it to played_set
    """
    def __init__(self, high):
        self.high = high
        self.doubles_set = []
        self.played_set = []
        self.__setup_doubles()
    
    def __setup_doubles(self):
        for i in range(self.high, -1 , -1):
            self.doubles_set.append(i)
    
    def played(self, double_played):
        self.played_set.append(double_played)
        self.doubles_set.remove(double_played)