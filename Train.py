#!/usr/bin/env python
"""
Provides ability to score the Mexican Train Game

"""

from os import system, name, getcwd, mkdir, path
from pathlib import Path
import json

currentDir = getcwd()
dataFolder = "%s\data" %currentDir
if not path.exists(dataFolder):
    print ('Creating `{}` folder'.format(dataFolder))
    mkdir(dataFolder)
playerFile = "%s\player.json" %dataFolder
scoreFile = "%s\score.json" %dataFolder


__author__ = "Josh Thayer"
__copyright__ = "Copyright 2021, slackerscpt inc"
__credits__ = ["Josh Thayer"]
__license__ = "GPL"
__version__ = "0.1.0"
__maintainer__ = "Josh Thayer"
__email__ = "slackerscpt@gmail.com"
__status__ = "Build"


#system('mode con: cols=150 lines=40')

players = {}




class Player:
    """
    This will setup a player
    Init setup will require name
    add_score will add to the current players score
    """
    def __init__(self, name):
        self.name = name
        self.score = 0
    def add_score(self, update):
        self.score += update

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

def write_players():
    #with open (playerFile) as f:
    x = {}
    for player in players:
        x[player] = []
        x[player].append({
            'name' : players[player].name,
            'score' : players[player].score
        })
    with open (playerFile, 'w') as f:
        json.dump(x, f)

def update_scores():
    current_scores = ''
    with open(playerFile, 'r') as players:
        current_scores = json.load(players)

    print (current_scores)

    #We need to update the score


    
def clear(): 

  
    # for windows 
    if name == 'nt': 
        _ = system('cls') 
  
    # for mac and linux(here, os.name is 'posix') 
    else: 
        _ = system('clear') 

def players_count():
    player_count = input('Please enter the number of players[3-8]: ')
    try:
        player_count = int(player_count)
        if 3 <= player_count <= 8:
            return player_count
        else:
            print ('Player count needs to be between 3 and 8')
    except:
        print ('Please enter a number between 3 and 8')

    return

def setup_players(number_of_players):
    for i in range(1, number_of_players+1, 1):
        name = input('Please enter player {} name: '.format(i))
        players[i] = Player(name)

def domino_set():
    high_double = input('Please enter the highest double in your set: ')
    try: 
        high_double = int(high_double)
        return high_double
    except:
        print ('Please enter the number as int value')
    return

def pick_double(Deck):
    print ('Doubles left: {}'.format(Deck.doubles_set))
    try:
        double_to_play = int(input('Please enter which double played this round:'))
        if double_to_play in Deck.doubles_set:
            Deck.played(double_to_play)
        else: 
            print ('Please select a Double that has not been played')
            pick_double(Deck)
    except:
        print ('Please enter a number')
        pick_double(Deck)

def score_round(Deck):
    scores_to_enter = []
    clear()
    print("Doubles Played: {}".format(Deck.played_set[-1]))
    for keys in players.keys():
        scores_to_enter.append(keys)
    while len(scores_to_enter) > 0:
        print ('Please enter the scores of the players')
        for num in scores_to_enter:
            print ('{}){}'.format(num, players[num].name))
        try:
            player_to_score = int(input('Please select player to enter score: '))
            if player_to_score in scores_to_enter:
                score = int(input("{}'s Score: ".format(players[player_to_score].name)))
                players[player_to_score].add_score(score)
                scores_to_enter.remove(player_to_score)
            else:
                print('Please select a player left to score')
        except:
            print ('Please enter a number of a player left to score')

def display_scores(Deck):
    rankings = []
    for key in players:
        if len(rankings) == 0:
            rankings.append(key)
        else:
            for position, other_player in enumerate(rankings):
                if players[key].score < players[other_player].score:
                    rankings.insert(position, key)
                    break
                elif (position + 1) >= len(rankings):
                    rankings.append(key)
                    break

    if len(Deck.doubles_set) != 0:
        print ('Score Board after round {}:\n'.format(len(Deck.played_set)))  

    else:
        print ('Final Standings:\n')
        print ("\tWinner is {}\n\n".format(players[rankings[0]].name))
    for player in rankings:
        print("\t{}'s score: {}".format(players[player].name, players[player].score))
    
def setup_game():

    player_count = None
    high_double = None

    while player_count == None:
        player_count = players_count()
    setup_players(player_count)

    
    while high_double == None:
        high_double = domino_set()

    Deck = Dominos(high_double)

    return Deck

def play_game(Deck):
    while len(Deck.doubles_set) > 0:
        input('Press any key to start next round')
        clear()
        pick_double(Deck)
        score_round(Deck)
        clear()  
        display_scores(Deck) 
        
    input('Press any key to end the game')

def show_train():
    print("""
                 _-====-__-======-__-========-_____-============-__
               _(                                                 _)
            OO(           _/_ _  _  _/_   _/_ _  _  _/_           )_
           0  (_          (__(_)(_) (__   (__(_)(_) (__            _)
         o0     (_                                                _)
        o         '=-___-===-_____-========-___________-===-dwb-='
      .o                                _________
     . ______          ______________  |         |      _____
   _()_||__|| ________ |            |  |_________|   __||___||__
  (BNSF 1995| |      | |            | __Y______00_| |_         _|
 /-OO----OO""="OO--OO"="OO--------OO"="OO-------OO"="OO-------OO"=P
#####################################################################
    """)
    
def main():
    show_train()
    Deck = setup_game()
    write_players()
    update_scores()

    #play_game(Deck)

if __name__ == '__main__':  
    main()
    

#X is \u274c
#check is \u2705
#print on same line: print("The Simpsons", end='\r')