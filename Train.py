#!/usr/bin/env python
"""
Provides ability to score the Mexican Train Game

"""

from os import system, name, getcwd, mkdir, path
from pathlib import Path
import json
from src.players import Player, start_up
from src.dominos import Dominos
from src.graphics import show_train, clear;


currentDir = getcwd()
dataFolder = "%s\data" %currentDir
if not path.exists(dataFolder):
    print ('Creating `{}` folder'.format(dataFolder))
    mkdir(dataFolder)
#playerFile = "%s\player.json" %dataFolder
#scoreFile = "%s\score.json" %dataFolder


__author__ = "Josh Thayer"
__copyright__ = "Copyright 2021, slackerscpt inc"
__credits__ = ["Josh Thayer"]
__license__ = "GPL"
__version__ = "0.2.0"
__maintainer__ = "Josh Thayer"
__email__ = "slackerscpt@gmail.com"
__status__ = "Build"

players = {}

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
        players[i] = Player(name, i)

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
    '''
    This section will take in the Deck, so we can determine what card was played. 
    In this function we will prompt the user for scores. 
    New update we will allow the score to be updated. 
    We will need to pass a variable to confirm scores. 
    '''
    

    #We plan to show a screen like this
    # <number> <name> <score given>
    # If no score given will read N/A
    recording_score = True
    round_scores = {}
    for keys in players.keys():
        round_scores[keys] = 0
    while (recording_score) :
    
        clear()
        print("Doubles Played: {}".format(Deck.played_set[-1]))

        print ('Please enter the scores of the players')
        for num in round_scores:
            print ('{}){} Score Recorded: {}'.format(num, players[num].name, round_scores[num]))
        print ('Please Enter 99 to record all scores')
        try:
            player_to_score = int(input('Please select player to enter score: '))
            if player_to_score in round_scores:
                score = int(input("{}'s Score: ".format(players[player_to_score].name)))
                round_scores[player_to_score] = score
            elif player_to_score == 99:
                recording_score = False
                #We will exit out
            else:
                print('Please select a player score')
        except:
            print ('Please enter a number of a player left to score')
    for player in players:
        players[player].scoreRound(len(Deck.played_set), round_scores[player])

def display_scores(Deck):
    rankings = []
    for key in players:
        if len(rankings) == 0:
            rankings.append(key)
        else:
            for position, other_player in enumerate(rankings):
                if players[key].get_score() < players[other_player].get_score():
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
        print("\t{}'s score: {}".format(players[player].name, players[player].get_score()))
        
    # If there is a tie, the player who scored the most zero-point rounds wins. 
    # If there is still a tie at this point, the player with the lowest total in a round, other than zero, wins.
    # We will have to see if there are ties for first, use get_zero_round_count to get

def setup_game():

    player_count = None
    high_double = None

    start_up()

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
        #display_round_scores()
        
    input('Press any key to end the game')

def main():
    clear()
    show_train()
    Deck = setup_game()
    play_game(Deck)
    #display_round_scores()


if __name__ == '__main__':  
    main()